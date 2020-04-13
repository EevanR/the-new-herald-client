import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: process.env.REACT_APP_BASEURL,
  // host: "http://localhost:3000/api/v1",
  debug: false
});

export default auth;
