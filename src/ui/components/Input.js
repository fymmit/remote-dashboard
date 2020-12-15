const { createElement: e } = React;

const Input = ({ id, label = '', value, setValue }) => {
  return (
    e('div', null, [
      label.length > 0 ? (e('label', { for: id }, `${label}: `)) : null,
      e('input', {
        onChange: ({ target: { value } }) => setValue(value),
        value,
        id,
        className: 'input'
      })
    ])
  );
}

export default Input;
