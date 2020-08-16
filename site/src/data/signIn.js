export default [
  {
    name: "email",
    placeHolder: "Email Address",
    errorMsg: "email should be of the format johndoe@domain.com",
    required: true,
  },
  {
    placeHolder: "Create Password",
    name: "password",
    type: "password",
    required: true,
    errorMsg:
      "password should be at least 8 characters, with one Capital a symbol and a number",
  },
];
