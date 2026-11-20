import React from 'react';

const Alert = ({ type = 'error', children }) => (children ? <div className={`alert alert-${type}`} role="alert">{children}</div> : null);

export default Alert;
