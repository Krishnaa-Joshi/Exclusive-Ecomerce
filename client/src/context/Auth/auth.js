export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ? true : false; // Returns true if token exists, false otherwise
  };