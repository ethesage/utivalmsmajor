import React, { useState } from 'react';
import upload from '../../assets/icons/upload.png';
import './style.scss';

const Files = ({ className }) => {
  let dragCounter;
  const [drag, setDrag] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      setDrag(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  return (
    <button
      className={`${className} drag_container`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex-row mx-auto">
        <img src={upload} alt="upload" /> Drag file Here
      </div>
    </button>
  );
};

export default Files;
