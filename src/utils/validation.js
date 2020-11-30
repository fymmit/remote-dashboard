const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }
  return true;
};

module.exports = { isValidUrl };
