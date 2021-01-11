import React, { useState, useRef } from 'react';
import EditorJs from 'react-editor-js';
import ReadOnly from '../ReadOnly';
import './style.scss';
import { EDITOR_JS_TOOLS } from './constants';

const Logo = `${process.env.PUBLIC_URL}/web_media/AGNA.gif`;

const Editor = ({ data, readOnly }) => {
  const editorInstance = useRef();

  const [editordata] = useState({
    blocks: [
      {
        type: 'paragraph',
        data: {},
      },
    ],
  });

  const handleSave = async (published) => {
    const savedData = await editorInstance.current.save();
    let title = savedData.blocks.find((data) => data.type === 'header');
    let description = savedData.blocks.find(
      (data) => data.type === 'paragraph'
    );
    let image = savedData.blocks.find((data) => data.type === 'image');

    if (!(title && description && image))
      return {
        type: 'error',
        message:
          'Please include, a header, an image and at least one paragraph',
      };
    title = title.data.text;
    description = description.data.text;
    image = image.data.file.url;

    const articleBody = JSON.stringify(savedData);

    return {
      type: 'success',
      message: 'Saved successfully',
    };
  };

  if (readOnly) {
    if (!data)
      return (
        <div className="no-edit">
          <div style={{ width: '100%', height: '100%' }}>
            <img
              style={{
                width: '100px',
                height: '100px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              src={Logo}
              alt="logo"
            />
          </div>
        </div>
      );
  }

  const mode = readOnly;

  return (
    <div className={`${mode ? 'no-edit' : 'edit'}`}>
      {/* {!readOnly && <div>Btn</div>} */}

      <EditorJs
        key={!mode ? '' : data.slug}
        tools={EDITOR_JS_TOOLS}
        placeholder="Enter the description here, you can embed"
        instanceRef={(instance) => (editorInstance.current = instance)}
        data={
          readOnly
            ? typeof data === 'string'
              ? {
                  blocks: [
                    {
                      type: 'paragraph',
                      data: {
                        text: data,
                      },
                    },
                  ],
                }
              : JSON.parse(data)
            : editordata
        }
      />

      {!readOnly ? null : (
        <ReadOnly
          key={`read_${data.slug}`}
          data={
            typeof data === 'string'
              ? {
                  blocks: [
                    {
                      type: 'paragraph',
                      data: {
                        text: data,
                      },
                    },
                  ],
                }
              : JSON.parse(data)
          }
        />
      )}
    </div>
  );
};

export default Editor;
