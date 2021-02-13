import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import google from 'assets/icons/google.png';
import { login } from 'g_actions/user';
// import linkedin from 'assets/icons/linkedin.png';git 
import { auth, googleProvider, facebookProvider } from 'helpers/firebase';
import { axiosInstance } from 'helpers';
import './style.scss';

const socials = {
  google: googleProvider,
  facebook: facebookProvider,
};

const Social = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  //remember to add the redirect on login for v2

  const signIn = (type) => {
    (async () => {
      try {
        const social_resp = await auth.signInWithPopup(socials[type]);

        const {
          displayName,
          email,
          phoneNumber,
          photoURL,
          providerId,
          uid,
        } = social_resp.user.providerData[0];

        const response = await axiosInstance.post('/user/login?type=social', {
          firstName: displayName?.split(' ')[0],
          lastName: displayName?.split(' ')[1],
          email,
          phoneNumber: phoneNumber || 'N/A',
          profilePic: photoURL,
          providerId,
          socialUid: uid,
        });

        if (response) {
          dispatch(login(response.user));
          history.push('/');
        }
      } catch (error) {
        addToast(error.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    })();
  };

  return (
    <div className="social">
      <div className="head flex-row">
        <p>Or</p>
      </div>
      <div className="btn_sec flex-row j-space">
        <button className="flex-row w-full" onClick={() => signIn('google')}>
          <img src={google} alt="google" />
          <p>Google</p>
        </button>
        {/* <button className="flex-row j-start" onClick={() => signIn('facebook')}>
          <img src={linkedin} alt="linkedin" />
          <p>LinkedIN</p>
        </button> */}
      </div>
    </div>
  );
};

export default Social;
