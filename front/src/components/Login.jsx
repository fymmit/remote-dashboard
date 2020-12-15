import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import userManager from '../utils/userManager';

const Login = ({ user }) => {
  useEffect(() => {
    userManager.getUser().then(res => {
      if (!res || res.expired) {
        userManager.signinRedirect();
      } else {
        console.log(res);
      }
    });
  }, [user]);
  
  return (
    <div>Login</div>
  )
};

const mapState = state => ({
  user: state.oidc.user,
});

export default connect(mapState)(Login);
