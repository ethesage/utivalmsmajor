import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../../components/InputType';
import useInput from '../../../Hooks/useInput';
import data from '../../../data/signup';
import { axiosInstance } from '../../../helpers';
import Social from '../SocialSec';
import { gender } from '../../../data/filters';
import Button from '../../../components/Button';
import { login } from '../../../g_actions/user';
import axois from 'axios';
import '../style.scss';
import './style.scss';

function Signup() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      if (inputs.password !== inputs.cpassword) {
        addToast(`Please make sure that the passwords are the same`, {
          appearance: 'error',
          autoDismiss: true,
        });

        submitButton.current.classList.remove('spinner1');
        return;
      }

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input !== 'cpassword') {
          return { ...acc, [input]: inputs[input] };
        }
        return { ...acc };
      }, {});

      const response = await axiosInstance.post('/user/signup', data);

      addToast(
        `Hey ${response.data.user.firstName} Welcome to The Utiva Learning Platform`,
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      dispatch(login());
      history.push('/dashboard');
    },
    btnText: {
      loading: 'Creating...',
      reg: 'Create Account',
    },
  });

  const [apiToken, setApiToken] = useState('');

  const [selects, setSelects] = useState({
    gender,
    country: [],
    region: [],
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  useEffect(() => {
    const get_countries = async () => {
      let apiToken = await axois.get(
        'https://www.universal-tutorial.com/api/getaccesstoken',
        {
          headers: {
            'api-token':
              'OiMssnB9spvedi7rVY4e8_4FMaC-2COodQKIDgyOPyIdiQXwiP7oUnOZALFK4ntQ2LE',
            'content-type': 'application/json',
            'user-email': 'jude.chinoso@theagromall.com',
          },
        }
      );

      setApiToken(apiToken.data.auth_token);

      let countries = await axois.get(
        'https://www.universal-tutorial.com/api/countries/',
        {
          headers: {
            Authorization: `Bearer ${apiToken.data.auth_token}`,
            'content-type': 'application/json',
          },
        }
      );

      countries = countries.data.map((country) => ({
        name: country.country_name,
        value: country.country_name,
      }));

      setSelects({
        ...selects,
        country: countries,
      });
    };

    get_countries();

    return () => {};
  }, []);

  useEffect(() => {
    const get_states = async () => {
      if (!inputTypes.country) return;

      let states = await axois.get(
        `https://www.universal-tutorial.com/api/states/${inputTypes.country}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'content-type': 'application/json',
          },
        }
      );

      states = states.data.map((country) => ({
        name: country.state_name,
        value: country.state_name,
      }));

      setSelects({
        ...selects,
        region: states,
      });
    };

    get_states();

    return () => {};
  }, [inputTypes.country]);

  return (
    <div className="auth_section sign_up">
      <div className="reg_text">
        <h2>Create your Account</h2>
        <p>Welcome to the Utiva Learning Platform</p>
      </div>
      <form className="form">
        {data.map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            itype={form.itype}
            placeHolder={form.itype ? '' : form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === 'password' ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
            inputs={selects[form.name]}
            currentText={form.placeHolder}
            handleSelect={handleChange}
          />
        ))}

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row"
          text="Create Account"
        />
      </form>
      <div className="externs flex-row j-space">
        <small>
          Already have an account?{' '}
          <Link to="/auth/signin">
            <strong className="theme-color">Login</strong>
          </Link>
        </small>
      </div>
      <Social />
    </div>
  );
}

export default Signup;
