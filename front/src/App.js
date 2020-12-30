import { useState, useEffect } from 'react';
import './App.css';
import SendKeysButton from './components/SendKeysButton';
import { sendKeys } from './utils/fetch';
import Input from './components/Input';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userManager from './utils/userManager';
import { bindActionCreators } from 'redux';
import { actionCreators as twitchActions } from './store/twitch';
const { REACT_APP_SITEURL: siteUrl } = process.env;

function App({ user, follows, fetchFollows, fetchOnlineStreams }) {
  const [volume, setVolume] = useState(0);
  const [website, setWebsite] = useState('');
  const [customKeys, setCustomKeys] = useState('');
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${siteUrl}/volume`);
      const vol = await response.text();
      setVolume(vol);
    })();
  }, []);

  return (
    <div>
      <div className="row">
        <Input
          name="volume"
          label="Volume"
          value={volume}
          setValue={setVolume}
          type="number"
          func={() => fetch(`${siteUrl}/volume/${volume}`, { method: 'POST' })}
        />
      </div>
      <hr />
      <div className="row">
        <Input
          name="website"
          label="Website"
          value={website}
          setValue={setWebsite}
          func={() => fetch(`${siteUrl}/website?url=${website}`, { method: 'POST' })}
        />
      </div>
      <div className="row">
        <button
          className="input"
          onClick={() => setWebsite('https://twitch.tv/')}
        >Twitch</button>
      </div>
      <hr />
      <div className="row">
        <SendKeysButton text="Close tab" keys="^w" />
        <SendKeysButton text="Prev tab" keys="^+{tab}" />
        <SendKeysButton text="Next tab" keys="^{tab}" />
        <SendKeysButton text="Alt tab" keys="%{tab}" />
      </div>
      <div className="row">
        <SendKeysButton text="F" keys="f" />
        <SendKeysButton text="J" keys="j" />
        <SendKeysButton text="K" keys="k" />
        <SendKeysButton text="L" keys="l" />
      </div>
      <hr />
      <div className="row">
        <Input
          name="customkeys"
          label="Custom keys"
          value={customKeys}
          setValue={setCustomKeys}
          func={() => sendKeys(customKeys)}
        />
      </div>
      <div className="row">
        {user === null ? (
          <button onClick={() => history.push('/login')}>Log in</button>
        ) : (
          <>
            <span>Logged in as {user.profile.preferred_username}</span>
            <button onClick={() => history.push('/twitch')}>Twitch dashboard</button>
            <button onClick={() => userManager.signoutRedirect()}>Log out</button>
          </>
        )}
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.oidc.user,
  follows: state.twitch.follows,
});

const mapActions = dispatch => bindActionCreators({
  ...twitchActions
}, dispatch);

export default connect(mapState, mapActions)(App);
