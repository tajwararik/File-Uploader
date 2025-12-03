export function getIndexPage(req, res) {
  res.render("index");
}

export function getSignUpForm(req, res) {
  res.render("signup");
}

export function getLogInForm(req, res) {
  res.render("login");
}
