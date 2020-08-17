import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import axois from 'axios';
import { axiosInstance } from '../../helpers';
import useInput from '../../Hooks/useInput';
import Button from '../../components/Button';
import Input from '../../components/InputType';
import { login } from '../../g_actions/user';
import data from '../../data/profile';
import { gender } from '../../data/filters';
import user_icon from '../../assets/user_icon.png';
import linkedin from '../../assets/icons/linkedin.png';
import p_sum from '../../assets/p_sum.png'
import './style.scss';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const submitButton = useRef();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [apiToken, setApiToken] = useState(null);
  const [imgSrc, setImgSrc] = useState((user && user.profilePic) || user_icon);
  const image = useRef();

  const [selects, setSelects] = useState({
    gender,
    country: [],
    region: [],
  });

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    initials: user,
    btnText: {
      loading: 'Updating...',
      reg: 'Update',
    },
    cb: async (inputs) => {
      // const data = Object.keys(inputs).reduce((acc, input) => {
      //   if (input !== "cpassword") {
      //     return { ...acc, [input]: inputs[input] };
      //   }
      //   return { ...acc };
      // }, {});

      await axiosInstance.patch('/user/update', inputs);

      addToast(`Successfully Updated`, {
        appearance: 'success',
        autoDismiss: true,
      });

      dispatch(login());
    },
  });

  useEffect(() => {
    const getApiToken = async () => {
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
    };

    getApiToken();

    return () => {};
  }, []);

  useEffect(() => {
    if (!apiToken) return;
    const get_countries = async () => {
      let countries = await axois.get(
        'https://www.universal-tutorial.com/api/countries/',
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'content-type': 'application/json',
          },
        }
      );

      countries = countries.data.map((country) => ({
        name: country.country_name,
        value: country.country_name,
      }));

      setSelects((e) => ({
        ...e,
        country: countries,
      }));
    };

    get_countries();

    return () => {};
  }, [apiToken]);

  useEffect(() => {
    if (!apiToken) return;

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

      setSelects((e) => ({
        ...e,
        region: states,
      }));
    };

    get_states();

    return () => {};
  }, [inputTypes.country, apiToken]);

  return (
    <section className="profile dash-con flex-row al-start j-space">
      <div className="form_sec">
        <h2>Profile</h2>
        <form className="form box-shade">
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
            className="s_btn flex-row mx-auto"
            text="Update"
          />
        </form>
      </div>
      <div className="pic_sec ">
        <label className="edit flex-col" htmlFor="image_profile">
          <div className="img-sec">
            <img src={imgSrc} alt="" ref={image} className="img cover" />
          </div>
          <p>Change Picture</p>
        </label>
        <input
          type="file"
          id="image_profile"
          name="profilePic"
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
          //   onChange={image_handler}
        />
        <div className="text-sec box-shade flex-col j-start">
          <div className="e_sec flex-row j-space">
            <p>Profile Summary</p>

            {user.bio ? <small className="theme-color">Edit</small> : ''}
          </div>
          {user.bio ? (
            <>
              <p className="clipped-text" style={{ '--number': 7 }}>
                Poverty anywhere is a threat to prosperity everywhere. This
                explains the dire need to make poverty a bygone everywhere in
                the world. According to World Bank, everyone that survives on
                about 1.9 dollars, approximately seven hundred and thirty seven
                naira or less everyday lives in poverty. Today, about ten
                percent of the world lives in extreme poverty. It's however,
                unfortunate that some countries like Nigeria, have about forty
                percent of their entire population living in abject poverty
              </p>
              <img src={linkedin} alt="linkedin" />
            </>
          ) : (
            <>
              <img src={linkedin} alt="linkedin" />
              <p className="clipped-text" style={{ '--number': 7 }}></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
