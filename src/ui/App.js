const { createElement: e } = React;
import Input from './components/Input.js';
import ButtonInputForm from './components/ButtonInputForm.js';

const App = () => {
  const handleVolume = (volume) => {
    fetch(`/volume/${volume}`);
  }

  return (
    e('div', null, [
      e(ButtonInputForm, {
        id: 'volume',
        label: 'Volume',
        submit: handleVolume
      }),
      // e(Input, { id: 'website', label: 'Website' }),
    ])
  );
}

export default App;
