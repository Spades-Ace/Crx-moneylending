// ForbiddenPage.js

import React from 'react';
import "./styles/forbidden.css";

const ForbiddenPage = () => {
  return (
    <div className="forbidden-container">
      <h1>403 Forbidden Access</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default ForbiddenPage;