export const sendKeys = (keys) => {
  fetch('/sendkeys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keys })
  });
}

export default { sendKeys };
