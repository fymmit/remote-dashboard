import { useHistory, useParams } from 'react-router-dom';
import { click } from '../utils/fetch';
const { REACT_APP_SITEURL: siteUrl } = process.env;

const Screenshot = () => {
  const history = useHistory();
  const { fileName } = useParams();

  const handleClick = async ({ clientX, clientY }) => {
    const { scrollX, scrollY } = window;
    const x = scrollX + clientX;
    const y = scrollY + clientY;
    history.push('/');
    click(x, y);
  };

  return (
    <div>
      <img onClick={handleClick} src={`${siteUrl}/${fileName}`} />
    </div>
  );
};

export default Screenshot;
