import React, { useState, useEffect } from 'react';
import { validateInput, validate } from '../../helpers';
import Eye from '../../assets/icons/eye';
import Hide from '../../assets/icons/hide';
import './style.scss';

const Input = ({
  type = 'text',
  name,
  placeHolder = 'place Holder',
  value,
  errorMsg = '',
  required,
  validateSelf,
  handleChange,
  reviel,
  revielPassword,
  method,
}) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = React.createRef();

  useEffect(() => {
    if (validateSelf && required) {
      const isValid = validate(value, name);

      if (!isValid) {
        inputRef.current.classList.add('typing', 'invalid');
        setError(true);
      }
    }

    return () => {};
  }, [inputRef, name, validateSelf, value, required]);

  const validateOne = (event) => {
    handleChange(event, error);
    if (!validateInput(event)) {
      inputRef.current.classList.add('invalid');
      setError(true);
    } else {
      inputRef.current.classList.remove('invalid');
      setError(false);
    }
  };

  return (
    <div className="input-div">
      {type === 'textarea' ? (
        <textarea
          className="input-type"
          ref={inputRef}
          required={required}
          name={name}
          onChange={validateOne}
          value={value}
          placeholder={`${placeHolder} ${required ? '*' : ''}`}
          rows={10}
        />
      ) : (
        <input
          className="input-type"
          ref={inputRef}
          type={reviel ? 'text' : type}
          required={required}
          name={name}
          onChange={validateOne}
          value={value}
          placeholder={`${placeHolder} ${required ? '*' : ''}`}
          autoComplete={
            type === 'password' && method === 'sign-in'
              ? 'current-password'
              : 'new-password'
          }
        />
      )}
      {value && type === 'password' ? (
        <span
          onClick={() => {
            setShowPassword(!showPassword);
            revielPassword();
          }}
          className="reviel-password"
        >
          {!showPassword ? <Eye /> : <Hide />}
        </span>
      ) : null}
      <p className="error" style={{ display: error ? 'block' : 'none' }}>
        {errorMsg}
      </p>
    </div>
  );
};

export default Input;
