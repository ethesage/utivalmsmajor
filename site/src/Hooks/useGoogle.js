import { useEffect, useState } from 'react';
import cred from './credentials.json';
import axios from 'axios';

const Google = () => {
  const [g_api, setG_api] = useState();

  useEffect(() => {
    (async () => {
      // console.log(await axios.get('https://apis.google.com/js/client.js'));
      const gapi_str = await axios.get('https://apis.google.com/js/api.js');
      const gapi = new Function(`${gapi_str.data} return gapi`)();

      gapi.load('client', () => {
        gapi.client
          .init({
            // apiKey: API_KEY,
            clientId: cred.installed.client_id,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
          })
          .then(function () {
            setG_api(gapi);
            // Listen for sign-in state changes.
            // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            //   updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            //   authorizeButton.onclick = handleAuthClick;
            //   signoutButton.onclick = handleSignoutClick;
            // }, function(error) {
            // appendPre(JSON.stringify(error, null, 2));
          });

        // const response = await axiosInstance.get('/student/dashboard');
        // console.log(response);
      });
    })();
  }, []);

  return g_api;
};

export default Google;
