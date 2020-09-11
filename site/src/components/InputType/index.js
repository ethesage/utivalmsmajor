import React from 'react';
import Input from '../Input';
import Select from '../Select';
import Radio from '../Radio';

const InputType = (props) => {
  return (
    <>
      {props.itype === 'select' && <Select {...props} />}
      {props.itype === 'radio' && <Radio {...props} />}
      {!props.itype && <Input {...props} />}
    </>
  );
};

export default InputType;
