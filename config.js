const facebook = {
  clientID: "673461369526110",
  clientSecret: "1f48645759675754121ad677e7c49a43",
  callbackURL: "http://127.0.0.1:3000/auth/facebook/callback",
  profileFields: ["id", "name", "displayName", "picture.type(large)", "emails"]
};

const google = {
  clientID:
    "950919118661-9sjumt2chiuf888t2rm5637qo01ijpm3.apps.googleusercontent.com",
  clientSecret: "_QHPuUmZrR0iqrUr8ZfQRLJE",
  callbackURL: "http://127.0.0.1.xip.io:3000/auth/google/callback"
};

module.exports = { facebook, google };
