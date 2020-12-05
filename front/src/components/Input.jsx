import { useState } from 'react';

const Input = ({ label = '', name, func }) => {
  const [value, setValue] = useState('');

  const labelElement = label.length > 0
    ? <label htmlFor={`${name}-input`}>{label}</label>
    : <></>

  return (
    <>
      {labelElement}
      <input
        className="input"
        type="text"
        name={name}
        id={`${name}-input`}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <button
        className="input"
        onClick={() => func(value)}
      >
        Submit
      </button>
    </>
  )
};

export default Input;
