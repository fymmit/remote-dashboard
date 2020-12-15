const Input = ({
  label = '',
  name,
  func,
  value,
  setValue,
  type = 'text',
}) => {
  const labelElement = label.length > 0
    ? <label htmlFor={`${name}-input`}>{label}</label>
    : <></>

  return (
    <>
      {labelElement}
      <input
        className="input"
        type={type}
        name={name}
        id={`${name}-input`}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <button
        className="input"
        onClick={func}
      >
        Submit
      </button>
    </>
  )
};

export default Input;
