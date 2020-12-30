const { REACT_APP_APIURL: apiUrl } = process.env;

export const sendKeys = (keys) => {
  fetch(`${apiUrl}/sendkeys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keys })
  });
}

export const click = (x, y) => {
  fetch(`${apiUrl}/click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y })
  });
}
