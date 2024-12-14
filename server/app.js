const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/user/index.js");
require("dotenv").config(); // Load environment variables

const app = express(); //express App
const jwt_Secret = process.env.JWT_SECRET;

// MiddleWare 
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
 
// Google OAuth Logic 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("OAuth Profile:", profile);

        // Check if user exists in the database using their email
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user without a password field for OAuth
          user = new User({
            googleID: profile.id, // Use googleID for OAuth users
            name: profile.displayName,
            email: profile.emails[0].value,
            // Do not set the password here
          });

          // Save the new user
          await user.save();
        }

        console.log("Existing User:", user);
        done(null, user); // Pass the user to Passport for further processing
      } catch (err) {
        console.error("OAuth Error:", err);
        done(err, false);
      }
    }
  )
);

// verify Jwt Token when user make any req
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token Provided" });
  }

  jwt.verify(token.split(" ")[1], jwt_Secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;
    next();
  });
};

// Google authentication EndPoint
app.get(
  "/auth/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate JWT upon successful login
    console.log("Authenticated User:", req.user);
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      jwt_Secret,
      { expiresIn: "1h" }
    );
    console.log("Generated JWT Token:", token);
    // Redirect to home page with the token
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

// Get Profile data EndPoint
app.get("/account", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwt_Secret);

    const query = {};

    // check if Email or phone which is provided 
    if (decoded.email) {
      query.email = decoded.email;
    }
    if (decoded.phone) {
      query.phone = decoded.phone;
    }

    // find User in db
    const user = await User.findOne({
      $or: Object.keys(query).map((key) => ({ [key]: query[key] })),
    });

    // user not found 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // send user Details to frontend
    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      address: user.address,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid or missing token" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// update-profile
app.put("/update-profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    // Extract Token
    const decoded = jwt.verify(token, jwt_Secret);
    const userId = decoded.id;

    // find user with user id from token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // destructive initialize
    const {
      firstName,
      lastName,
      password,
      newPassword,
      confirmPassword,
      ...otherUpdate
    } = req.body;

    // merge first and last name to full name
    const name = `${firstName} ${lastName}`;
    otherUpdate.name = name;

    // New Password is provided
    if (newPassword) {
      // current password not provided 
      if (!password) {
        return res.status(400).json({ error: "Current password is required" });
      }

      // check current password is correct or not 
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      // password not match
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Wrong password" });
      }

      // new and confirm password not match
      if (newPassword !== confirmPassword) {
        return res
          .status(401)
          .json({ error: "New password and confirm password do not match" });
      }

      // hash new Password and update to db
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      otherUpdate.password = hashedNewPassword;
    }

    // store all data in update object
    const updates = {};
    Object.entries(otherUpdate).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        updates[key] = value;
      }
    });

    // find user and update the data
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    // send updated detail back to frontend
    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile: ", error); // Log the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// update address endPoint
app.put("/update-address", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    // Extract Token
    const decoded = jwt.verify(token, jwt_Secret);
    const userId = decoded.id;

    console.log("Decoded user ID: ", userId);

    // put data in Updates object
    const updates = {};
    Object.entries(req.body).forEach(([key, value]) => {
      if (value) {
        updates[`address.${key}`] = value; // Proper nesting under 'address'
      }
    });

    console.log("Updating fields:", updates); // Debugging output

    // not field to update
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
 
    // find and update user address details
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate against the schema
    });

    // send updated address back to frontend
    res.status(200).json({ 
      message: "Address updated successfully!",
      user: updatedUser,
    }); 
  } catch (error) { 
    console.error("Error updating address:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } 
});

// SignUp EndPoint
app.post("/signUp", async (req, res) => {
  const { name, emailOrPhone, password } = req.body;
  try {
    const isEmail = emailOrPhone.includes("@");
    const hashedPassword = await bcrypt.hash(password, 10); // Hash Password
    const newUser = new User({ name, password: hashedPassword }); // Initialize user

    if (isEmail) {
      newUser.email = emailOrPhone;
    } else {
      newUser.phone = emailOrPhone;
    }

    const query = {};
    if (newUser.email) query.email = newUser.email;
    if (newUser.phone) query.phone = newUser.phone;

    const existingUser = await User.findOne({
      $or: Object.entries(query).map(([key, value]) => ({ [key]: value })),
    });

    if (existingUser) {
      return res.status(401).json({ error: "User Already Exists" });
    }

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      jwt_Secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registration complete", token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login Endpint
app.post("/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res
      .status(400)
      .json({ error: "Both email/phone and password are required" });
  }

  try {
    const isEmail = emailOrPhone.includes("@");
    const query = isEmail ? { email: emailOrPhone } : { phone: emailOrPhone };

    // Check if a user already exists
    const existingUser = await User.findOne(query);
    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      jwt_Secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Error logging in user" });
  }
});

// MongoDb uri
const uri =
  `mongodb+srv://${process.env.DB_USERNAME}:BUGIzaBnivtCLNeb@cluster0.1geo8uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  
// Server Start
async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB"); 

    app.listen(5000, () => {
      console.log("App started at port 5000");
    }); 
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

run();
