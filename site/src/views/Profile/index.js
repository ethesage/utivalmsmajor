import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import axois from 'axios';
import { axiosInstance, toBase64 } from 'helpers';
import useInput from 'Hooks/useInput';
import Button from 'components/Button';
import ProgressBar from 'components/ProgressBar';
import Input from 'components/InputType';
import { login } from 'g_actions/user';
import data from 'data/profile';
import { gender } from 'data/filters';
import user_icon from 'assets/user_icon.png';
import linkedin from 'assets/icons/linkedin.png';
import p_sum from 'assets/p_sum.png';
import Modal from 'components/Modal';
import ProfileBio from './bio';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const submitButton = useRef();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [apiToken, setApiToken] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openModal, setModal] = useState(false);
  const [imgSrc, setImgSrc] = useState((user && user.profilePic) || user_icon);
  const image = useRef();
  const modalRef = useRef();

  const open = () => {
    modalRef.current.open();
  };

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
      await axiosInstance.patch('/user/update', inputs);

      addToast(`Successfully Updated`, {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = 'Update';
      submitButton.current.classList.remove('loader');

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

  useEffect(() => {
    if (openModal) {
      open();
    }
  }, [openModal]);

  const image_handler = async (e) => {
    const { files } = e.target;
    const _value = await toBase64(files[0]);
    setImgSrc(_value);
    setModal(true);

    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted * 0.9);
      },
    };

    let formData = new FormData();
    formData.append('profilePic', files[0]);

    try {
      const response = await axiosInstance.patch(
        '/user/update',
        formData,
        config
      );
      if (response) {
        setProgress(100);
        dispatch(login());
        modalRef.current && modalRef.current.close();
      }
    } catch (err) {}
  };

  return (
    <>
      <section className="profile flex-row al-start j-space">
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
              <img
                src={imgSrc}
                alt=""
                ref={image}
                className="img cover box-shade"
              />
            </div>
            <small>Change Picture</small>
          </label>
          <input
            type="file"
            id="image_profile"
            name="profilePic"
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
            onChange={image_handler}
          />
          <div className="text-sec box-shade flex-col j-start">
            <div className="e_sec flex-row j-space">
              <p>Profile Summary</p>

              {user.bio ? (
                <small onClick={open} className="theme-color">
                  Edit
                </small>
              ) : (
                ''
              )}
            </div>
            {user.bio ? (
              <div className="c_img flex-col j-space">
                <p className="clipped-text" style={{ '--number': 7 }}>
                  {user.bio}
                </p>
                <a target="_" href={user.linkedin || ''}>
                  <img src={linkedin} alt="linkedin" />
                </a>
              </div>
            ) : (
              <div className="flex-col" onClick={open}>
                <img src={p_sum} alt="Update" className="p_sum" />
                <p className="edit_update theme-color">Add profile summary</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Modal ref={modalRef}>
        {!openModal ? <ProfileBio /> : <ProgressBar progress={progress} />}
      </Modal>
    </>
  );
};

export default Profile;
