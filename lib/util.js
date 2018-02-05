// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    console.log("session checker", req.session.user)
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/events');
    } else {
        next();
    }
};

module.exports = {
  sessionChecker: sessionChecker
}
