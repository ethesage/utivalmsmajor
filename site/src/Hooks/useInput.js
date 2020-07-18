import { useState } from "react";
import { validate } from "../helpers";
import { useToasts } from "react-toast-notifications";

export default function Input({
  inputs,
  submitButton,
  cb,
  validateForm = true,
  error,
}) {
  const [validateSelf, setValidateSelf] = useState(false);
  const [inputTypes, setInputTypes] = useState(inputs);
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let keys = Object.keys(inputTypes);
    const values = Object.values(inputTypes);

    const shouldSubmit = keys.some((key, i) => {
      return !validate(values[i], keys[i]);
    });

    if (shouldSubmit && validateForm) {
      addToast("Please ensure the form is completely and correctly filled", {
        appearance: "warning",
        autoDismiss: true,
      });
      setValidateSelf(true);
      return;
    }

    submitButton.current.classList.add("spinner1");

    let response;

    try {
      response = await cb(inputTypes);
    } catch (error) {
      // error.message = "Incorrect login details";
      console.log(error.response, error);
      if (error.response) {
        if (error.response.status === 500)
          error.message = "Network error please try again";
        else error.message = error.response.data.error;
      } else error.message = "Error occured";
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      submitButton.current.classList.remove("spinner1");
      return;
    }

    return { msg: "success", response };
  };

  const handleChange = (event, error) => {
    const { name, value, type, checked } = event.target;
    setInputTypes({
      ...inputTypes,
      [name]: type === "checkbox" ? (checked ? checked : false) : value,
    });
  };

  return [handleSubmit, handleChange, inputTypes, validateSelf];
}
