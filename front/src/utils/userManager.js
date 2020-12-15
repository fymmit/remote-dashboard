import { createBrowserHistory } from 'history';
import { createUserManager } from 'redux-oidc';

const siteUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;

const config = {
  authority: 'https://id.twitch.tv/oauth2',
  client_id: 'y1x4l64vfavehsj8k6lg4j9rqdfl6q',
  redirect_uri: `${siteUrl}/callback`,
  response_type: 'token id_token',
  scope: 'openid',
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(config);

export default userManager;
