import axios from "axios";
import Cookies from "js-cookie";

const patterns = {
  email: /^(\s*[\w.-]+)@([a-zA-Z\d]{3,})\.([a-z]{3,8}\s*)$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  cpassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  firstName: /^[a-zA-Z]{3,}$/,
  lastName: /^[a-zA-Z]{3,}$/,
  phoneNumber: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  occupation: /^[\w\s]{2,}$/,
  company: /^[\w\s]{2,}$/,
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

const baseurl =
  process.env.NODE_ENV !== "development"
    ? "http://localhost:4000"
    : "https://utiva.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type",
    "Access-Control-Allow-Origin": "*",
  },
});

export const format_comma = (x) => {
  console.log(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const tokens = {};

export function parseJwt(token) {
  if (tokens[token]) return tokens[token];

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const result = JSON.parse(jsonPayload);
  tokens[token] = result;

  return result;
}

export function get_user() {
  let user;

  const ctoken = Cookies.get("ec_ll");
  if (ctoken) {
    const _user = parseJwt(ctoken);
    user = { ..._user.user, iat: _user.iat };
  }

  const isAdmin = user && user.role === "admin";

  return { user, isAdmin };
}

export const logout = async () => {
  return await axiosInstance.get("/logout");
};
