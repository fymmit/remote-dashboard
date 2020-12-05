import { sendKeys } from '../utils/fetch';

const SendKeysButton = ({ text, keys }) => {
  return (
    <button
      className="input"
      onClick={() => sendKeys(keys)}
    >
      {text}
    </button>
  )
};

export default SendKeysButton;
