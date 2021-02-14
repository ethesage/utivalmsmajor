export default [
  {
    name: 'email',
    label: 'Email Address',
    errorMsg: 'email should be of the format johndoe@domain.com',
    required: true,
    attr: { autoComplete: 'email' },
    placeHolder: '',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    errorMsg:
      'password should be at least 8 characters, with one Capital a symbol and a number',
    attr: { autoComplete: 'current-password' },
    placeHolder: '',
  },
];
