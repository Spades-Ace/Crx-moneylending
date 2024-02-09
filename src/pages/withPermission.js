import React from 'react';
import { useLocation } from 'react-router-dom'; // Add this line
import jwt_decode from 'jwt-decode';

import Forbidden from './forbidden';

const withPermission = (WrappedComponent, role) => {
  const DecodedComponent = (props) => {
    const location = useLocation();
    const token = location.state && location.state.token;

    const decodeToken = () => {
      try {
        if (token) {
          return jwt_decode(token); // Make sure jwt_decode is properly imported
        }
        return null;
      } catch (error) {
        return null;
      }
    };

    const decodedToken = decodeToken();
    const userRole = decodedToken && decodedToken.isValidator ? "validator" : "user";

    const ForbiddenPage = () => {
      return (
        <Forbidden />
      );
    };

    if (userRole === role) {
      return <WrappedComponent {...props} />;
    } else {
      return <ForbiddenPage />;
    }
  };

  return DecodedComponent;
};

export default withPermission;