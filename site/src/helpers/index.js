import axios from "axios";

const patterns = {
  email: /^(\s*[\w.-]+)@([a-zA-Z\d]{3,})\.([a-z]{3,8}\s*)$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
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
});

export const format_comma = (x) => {
  console.log(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
