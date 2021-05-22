import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react';
import EditorJs from 'react-editor-js';
import ReadOnly from '../ReadOnly';
import './style.scss';
import { EDITOR_JS_TOOLS } from './constants';

const Editor = forwardRef(({ data, readOnly, mode }, ref) => {
  const editorInstance = useRef();

  const getData = (data) => {
    try {
      return JSON.parse(data);
    } catch (err) {
      return {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: data,
            },
          },
        ],
      };
    }
  };

  const [editordata] = useState(
    mode === 'edit-desc'
      ? getData(data)
      : {
          blocks: [
            {
              type: 'paragraph',
              data: {},
            },
          ],
        }
  );

  useImperativeHandle(ref, () => ({
    getDesc: () => handleSave(),
  }));

  const handleSave = async () => {
    return await editorInstance.current.save();
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
              alt="logo"
            />
          </div>
        </div>
      );
  }

  return (
    <div className={mode}>
      {/* {!readOnly && <div>Btn</div>} */}

      <EditorJs
        key={!mode ? '' : data.slug}
        tools={EDITOR_JS_TOOLS}
        placeholder="Enter the description here."
        instanceRef={(instance) => (editorInstance.current = instance)}
        data={editordata}
      />

      {!readOnly ? null : (
        <ReadOnly key={`read_${data.slug}`} data={getData(data)} />
      )}
    </div>
  );
});

export default memo(Editor);
