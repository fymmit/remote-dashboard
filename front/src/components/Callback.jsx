import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { useHistory, useLocation } from 'react-router';
import userManager from '../utils/userManager';

const Callback = () => {
  const history = useHistory();
  const location = useLocation();

  const cb = () => {
    history.push('/');
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={cb}
      errorCallback={cb}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
}

export default Callback;
