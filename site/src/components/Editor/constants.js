import { axiosInstance, toBase64 } from '../../helpers';

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

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        coub: true,
        twitter: true,
        vimeo: true,
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
          const data = await toBase64(file);

          return axiosInstance
            .post(`/upload`, { data, title: file.name })
            .then((data) => {
              const uri = data.data.url;

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
