const stringify = (obj) => Object.keys(obj).map(p => `${p}: ${obj[p]}`).join(', ');

const logger = (req, res, next) => {
  const timestamp = new Date(Date.now()).toISOString();
  const { method, path, params, query } = req;
  const qString = stringify(query);
  console.log(`${timestamp} ${method} ${path} ${qString}`);
  next();
};

module.exports = { logger };
