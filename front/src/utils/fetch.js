const { REACT_APP_SITEURL: siteUrl } = process.env;

export const sendKeys = (keys) => {
  fetch(`${siteUrl}/sendkeys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keys })
  });
}
