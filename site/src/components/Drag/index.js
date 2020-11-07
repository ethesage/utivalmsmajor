import React from 'react';
import upload from '../../assets/icons/upload.png';
import './style.scss';

const Drag = ({ className, children, handleImage }) => {
  // let dragCounter;
  // const [drag, setDrag] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // dragCounter++;
    // if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
    //   setDrag(true);
    // }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // dragCounter--;
    // if (dragCounter === 0) {
    //   setDrag(false);
    // }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImage(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      // dragCounter = 0;
    }
  };

  const handleChange = (e) => {
    handleImage(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor="file_upload"
        className={`${className} drag_container`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {children ? (
          children
        ) : (
          <div className="fx_up_sec flex-row mx-auto">
            <img src={upload} alt="upload" /> Drag file Here
          </div>
        )}
      </label>
      <input
        type="file"
        id="file_upload"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </>
  );
};

export default Drag;
