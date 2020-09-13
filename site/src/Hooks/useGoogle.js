import { useEffect, useState } from 'react';
import cred from './credentials.json';
import axios from 'axios';

const Google = ({ updateSignInStatus = () => {} }) => {
  const [g_api, setG_api] = useState();

  useEffect(() => {
    (async () => {
      let gapi_str;
      try {
        gapi_str = await axios.get('https://apis.google.com/js/api.js');
      } catch (err) {
        return err;
      }

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
    try {
      const response = await g_api.auth2.getAuthInstance().signIn();

      return !!response.rt;
    } catch (err) {
      console.log(err);
    }
  };

  async function upload(file, setPercentage, folderId) {
    const access = await g_api.auth.getToken();

    if (access) {
      const config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentage(percentCompleted);
        },
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      };

      let data = new FormData();

      data.append(
        'metadata',
        new Blob(
          [
            JSON.stringify({
              name: file.name,
              mimeType: file.type,
              parents: [folderId],
              fields:
                'id, name, iconLink, webContentLink, size, webViewLink, parents',
            }),
          ],
          {
            type: 'application/json',
          }
        )
      );
      data.append('file', file);

      try {
        const response = await axios.post(
          `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&scope=${
            access.scope
          }&access_token=${access.access_token}&enforceSingleParent=${true}`,
          data,
          config
        );

        return response.data;
      } catch (err) {
        return 'error';
      }
    }
  }

  const deleteFile = async (id, returns) => {
    try {
      const res = await g_api.client.drive.files.delete({
        fileId: id,
        fields: returns,
      });
      return res.data;
    } catch (err) {
      return 'error';
    }
  };

  const get = async (folderId, id, returns = '*') => {
    let res;

    if (!id) {
      res = await g_api.client.drive.files.list({
        q: `parents = '${folderId}'`,
        // q: "parents = '0B5RT2eT5MWStfm85OWdXZURzTEJZMlowX2phU2gtNkdheXkyTFcxcVQwZXNLSEIxS0FVaEE'",
        pageSize: 10,
        fields:
          'nextPageToken, files(id, name, iconLink, webContentLink, size, webViewLink, parents)',
      });
    } else {
      res = await g_api.client.drive.files.get({ fileId: id, fields: returns });
    }
    return res.result;
  };

  return {
    gapi: { api: g_api, deleteFile, get, upload },
    signIn,
  };
};

export default Google;
