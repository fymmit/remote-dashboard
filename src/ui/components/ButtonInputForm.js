const { createElement: e, useState } = React;
import Input from './Input.js';

const ButtonInputForm = (submit, id, label) => {
  const [input, setInput] = useState('');
  return (
    e('div', null, [
      e(Input, { id, label, value: input, setValue: setInput }),
      e('button', {
        onClick: submit
      }, 'Set')
    ])
  );
}

export default ButtonInputForm;
