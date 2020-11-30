const stringify = (obj) => Object.keys(obj).map(p => `${p}: ${obj[p]}`).join(', ');

const logger = (req, res, next) => {
  const timestamp = new Date(Date.now()).toISOString();
  const { method, path, params, query, body } = req;
  const qString = stringify(query);
  const bString = stringify(body);
  console.log(`${timestamp} ${method} ${path} ${qString} ${bString}`);
  next();
};

module.exports = { logger };
