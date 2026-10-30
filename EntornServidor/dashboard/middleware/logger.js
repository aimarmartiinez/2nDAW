function logger(req, res, next) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  console.log(`[${date} ${time}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
