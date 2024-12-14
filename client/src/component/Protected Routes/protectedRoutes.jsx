// Hooks
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@/context';

// PropTypes
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(Context);

  return isAuth ? children :  <Navigate to="/signUp" />;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;