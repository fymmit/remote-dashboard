import { useEffect } from 'react';
import './App.css';
import SendKeysButton from './components/SendKeysButton';
import Input from './components/Input';
const { REACT_APP_SITEURL: siteUrl } = process.env;

function App() {
  return (
    <div>
      <div className="row">
        <Input
          name="volume"
          label="Volume"
          func={(volume) => fetch(`${siteUrl}/volume/${volume}`, { method: 'POST' })}
        />
      </div>
      <hr />
      <div className="row">
        <Input
          name="website"
          label="Website"
          func={(url) => fetch(`${siteUrl}/website?url=${url}`, { method: 'POST' })}
        />
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
    </div>
  );
}

export default App;
