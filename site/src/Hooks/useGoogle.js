import { useEffect, useState } from 'react';
import cred from './credentials.json';
import axios from 'axios';

const Google = ({ updateSignInStatus = () => {} }) => {
  const [g_api, setG_api] = useState();

  useEffect(() => {
    (async () => {
      const gapi_str = await axios.get('https://apis.google.com/js/api.js');
      const gapi = new Function(`${gapi_str.data} return gapi`)();

      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            // apiKey: API_KEY,
            clientId: cred.installed.client_id,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/drive',
          })
          .then(function () {
            setG_api(gapi);
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
      });
    })();
  }, [updateSignInStatus]);

  const signIn = async () => {
    const response = await g_api.auth2.getAuthInstance().signIn();
    return !!response.rt;
  };

  return {
    g_api,
    signIn,
  };
};

export default Google;
