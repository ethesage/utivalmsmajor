import { axiosInstance, toBase64, baseurl } from '../../helpers';

import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import HTML from './Html';

export const EDITOR_JS_TOOLS = {
  html: HTML,
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        coub: true,
        twitter: {
          regex: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/,
          embedUrl:
            'url=https://twitter.com/<%= remote_id %>',
          html: '<iframe class="embed-tool__content--twitter"></iframe>',
          id: (ids) => ids.join('/status/'),
        },
        vimeo: {
          regex: /https?:\/\/vimeo.com/,
          embedUrl: '',
          html: "<iframe title='vimeo-player' frameborder='0'><iframe>",
          height: 300,
          width: 600,
        },
      },
    },
  },
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    inlineToolbar: true,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByFile(file) {
          // var form = new FormData();
          // form.append('image', file);
          // for (var key of form.entries()) {
          //   console.log(key[0] + ', ' + key[1]);
          // }

          const data = await toBase64(file);

          axiosInstance.defaults.baseURL =
            'https://api.cloudinary.com/v1_1/agromall/upload';
          axiosInstance.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
          axiosInstance.defaults.withCredentials = false;

          return axiosInstance
            .post(`/`, { file: data, upload_preset: 'ml_default' })
            .then((data) => {
              const uri = data.data.secure_url;

              axiosInstance.defaults.baseURL = `${baseurl}/api/v1`;
              return {
                success: 1,
                file: {
                  url: uri,
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
              };
            })
            .catch((error) => console.log(error));
        },
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: 'Tell your story...',
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
