import axios from 'axios';
import Cookies from 'js-cookie';

const patterns = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:]|])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  cpassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  oldPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  firstName: /^[a-zA-Z]{3,}$/,
  lastName: /^[a-zA-Z]{3,}$/,
  phoneNumber: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  occupation: /^[\w\s]{2,}$/,
  company: /^[\w\s]{2,}$/,
  country: /^(?!none)([\w. -])+$/,
  region: /^(?!none)([\w. -])+$/,
  gender: /^(?!none)([\w. -])+$/,
  comment: /^[\w\s]{2,}$/,
  linkedin: /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
  bio: /\b((?!=|,|\.).)+(.){2,300}\b/,
};

export const validate = (field, Regex) => {
  if (patterns[Regex].test(field)) return true;
  return false;
};

export const validateInput = (event) =>
  validate(event.target.value, event.target.attributes.name.value);

export const randomInt = (length) => Math.floor(Math.random() * (length - 1));

export const get_rand = (array) => {
  array.sort(() => 0.5 - Math.random());
  return array;
};

export const baseurl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://utiva-staging.herokuapp.com';

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type',
    'Access-Control-Allow-Origin': '*',
  },
});

export const format_comma = (x) => {
  console.log(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const tokens = {};

export function parseJwt(token) {
  if (tokens[token]) return tokens[token];

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  const result = JSON.parse(jsonPayload);
  tokens[token] = result;

  return result;
}

export function get_user() {
  let user;

  const ctoken = Cookies.get('uti_va');
  if (ctoken) {
    const _user = parseJwt(ctoken);
    user = { ..._user.user, iat: _user.iat };
  }

  const isAdmin = user && user.role === 'admin';
  const isTrainer = user && user.role === 'trainer';
  const isStudent = user && user.role === 'student';

  return { user, isAdmin, isTrainer, isStudent };
}

export const logout = async () => {
  Cookies.remove('uti_va');
  return axiosInstance.get('/logout');
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const weeks = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourtheen',
  15: 'fifteen',
};
