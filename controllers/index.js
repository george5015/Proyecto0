const routes = [
  require('./events'),
  require('./users')
];

module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
