export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}

export function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) return next();

  res.redirect("/home");
}
