import React from 'react';
import Input from '../Input';
import Select from '../Select';

const InputType = (props) => {
  return (
    <>
      {props.itype === 'select' ? <Select {...props} /> : <Input {...props} />}
      {props.itype === 'checkbox' ? <Input {...props} /> : ''}
    </>
  );
};

export default InputType;
