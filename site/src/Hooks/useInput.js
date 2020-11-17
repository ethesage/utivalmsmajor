import { useState } from 'react';
import { validate } from '../helpers';
import { useToasts } from 'react-toast-notifications';

export default function Input({
  inputs,
  submitButton,
  cb,
  validateForm = true,
  error,
  btnText,
  initials = {},
}) {
  const [validateSelf, setValidateSelf] = useState(false);
  const [inputTypes, setInputTypes] = useState(
    inputs &&
      inputs.reduce(
        (acc, input) => ({
          ...acc,
          [input.name]: initials[input.name] ? initials[input.name] : '',
        }),
        {}
      )
  );
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requiredKeys = inputs.reduce((acc, input) => {
      if (input.required || inputTypes[input.name])
        return { ...acc, [input.name]: inputTypes[input.name] };
      else return acc;
    }, {});

    let keys = Object.keys(requiredKeys);
    const values = Object.values(requiredKeys);

    const shouldSubmit = keys.some((key, i) => {
      return !validate(values[i], keys[i]);
    });

    if (shouldSubmit && validateForm) {
      addToast('Please ensure the form is completely and correctly filled', {
        appearance: 'warning',
        autoDismiss: true,
      });
      setValidateSelf(true);
      return;
    }

    if (submitButton.current) {
      submitButton.current.children[0].innerHTML = btnText.loading;
      submitButton.current.classList.add('loader');
    }

    let response;

    try {
      response = await cb(inputTypes, setInputTypes);
    } catch (error) {
      // error.message = "Incorrect login details";
      if (error.response) {
        if (error.response.status === 500)
          error.message = 'Network error please try again';
        else error.message = error.response.data.error;
      } else error.message = 'Error occured';

      const err = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message;

      addToast(err, {
        appearance: 'error',
        autoDismiss: true,
      });

      if (submitButton.current) {
        submitButton.current.children[0].innerHTML = btnText.reg;
        submitButton.current.classList.remove('loader');
      }
      return error;
    }

    return { msg: 'success', response };
  };

  const handleChange = (event, error) => {
    const { name, value, type, checked } = event.target;
    setInputTypes({
      ...inputTypes,
      [name]: type === 'checkbox' ? (checked ? checked : false) : value,
    });
  };

  return [handleSubmit, handleChange, inputTypes, validateSelf, setInputTypes];
}
