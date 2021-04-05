import axios from 'axios';
import Cookies from 'js-cookie';

let text = /[^\n]{2,}/;
let shortText = /[^\n]{2,}/;
let number = /^[0-9]{1,}$/;

const patterns = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:]|])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/,
  password: /[^\n]+/,
  fullName: /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
  cpassword: /[^\n]{6,}/,
  si_password: /[^\n]{6,}/,
  oldPassword: /[^\n]{6,}/,
  firstName: /^[a-zA-Z ,.'-]+$/,
  lastName: /^[a-zA-Z ,.'-]+$/,
  phoneNumber: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  occupation: /[^\n]{2,}/,
  company: /[^\n]{2,}/,
  country: /^(?!none)([\w. -])+$/,
  region: /^(?!none)([\w. -])+$/,
  gender: /^(?!none)([\w. -])+$/,
  comment: /[^\n]{2,}/,
  grade: /^[0-9]{1,}$/,
  linkedin: /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
  bio: text,
  cohort: text,
  folderId: text,
  startDate: text,
  endDate: text,
  date: text,
  time: text,
  description: text,
  duration: number,
  level: shortText,
  degree: shortText,
  cost: number,
  cprice: number,
  course_type: shortText,
  thumbnail: text,
  category: shortText,
  type: shortText,
  learnMore: shortText,
  title: shortText,
  name: shortText,
  link: shortText,
  search: shortText,
  vimeo: /vimeo\.com\/(\d+)/,
  list_desc: shortText,
  finalSplitAmount: number,
  initialSplitAmount: number,
  paymentType: shortText,
  currency_type: shortText,
  whatsAppLink: /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/,
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

export const axiosInstance = axios.create({
  baseURL: `${
    window.location.origin.includes('localhost')
      ? 'http://localhost:4000'
      : window.location.origin
  }/api/v1`,
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type',
    'Access-Control-Allow-Origin': '*',
  },
});

export const format_comma = (x) => {
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
    user = {
      ..._user.user,
      profilePic:
        _user?.user.profilePic && `${_user.user.profilePic}?${Date.now()}`,
      iat: _user.iat,
    };
  }

  const isAdmin = user && user.role === 'admin';
  const isTrainer = user && user.role === 'trainer';
  const isStudent = user && user.role === 'student';

  return { user, isAdmin, isTrainer, isStudent };
}

export const logout = async () => {
  Cookies.remove('uti_va');
  axiosInstance.get('/logout');
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const weeks = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fourtheen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen',
  20: 'Twenty',
  21: 'Twenty One',
  22: 'Twenty Two',
  23: 'Twenty Three',
  24: 'Twenty Four',
  25: 'Twenty Five',
  26: 'Twenty Six',
  27: 'Twenty Seven',
  28: 'Twenty Eight',
  29: 'Twenty Nine',
  30: 'Thirty',
};

export const stringSearch = (val, string) => {
  return string && string.toLowerCase().search(val.toLowerCase()) !== -1;
};

export const uploadProgress = (setPercentage) => {
  return function (progressEvent) {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentage(percentCompleted);
  };
};

export const s3url = 'https://utiva-app.s3.amazonaws.com';
