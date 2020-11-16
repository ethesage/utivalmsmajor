import React, { useState, useEffect } from 'react';
import useInput from 'Hooks/useInput';
import Input from 'components/Input';
import data from 'data/classDiscrip';
import Button from 'components/Button';
import './style.scss';

const AddDes = ({ editedDisp, reset }) => {
  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setInputTypes,
  ] = useInput({
    inputs: data,
    submitButton: null,
    initials: editedDisp,
    btnText: {
      loading: 'Creating...',
      reg: 'Create',
    },
    cb: async (inputs) => {},
  });

  useEffect(() => {
    setInputTypes(editedDisp);

    return () => {};
  }, [editedDisp, setInputTypes]);

  return (
    <form className="">
      {editedDisp && <p onClick={() => reset({})}>New</p>}

      {data.map((form, i) => (
        <Input
          key={`login_form_${i}`}
          name={form.name}
          type={form.type}
          itype={form.itype}
          placeHolder={form.placeHolder}
          value={inputTypes[form.name]}
          errorMsg={form.errorMsg}
          required={form.required}
          handleChange={handleChange}
          validateSelf={validateSelf}
          inputs={form.select}
          label={form.label}
          showAsterix={false}
        />
      ))}

      <button className="flex-row img" onClick={handleSubmit}>
        Add New
      </button>
    </form>
  );
};

const Edit = ({ descrip }) => {
  const [singleDisp, setSingleDisp] = useState({});

  console.log(descrip);

  return (
    <div className="lnx">
      <div className="over_view">
        {/* <nav className="flex-row j-end">
          <Button text="Update" className="flex-row" />
        </nav> */}

        <div className="list_info">
          {descrip.map((classr, i) => (
            <div className="list" key={`descriptors_${i}`}>
              <nav className="flex-row j-space">
                <h3>{classr.title}</h3>
                <p onClick={() => setSingleDisp(classr)}>Edit</p>
              </nav>
              <p>{classr.description}</p>
            </div>
          ))}
        </div>
      </div>

      <AddDes editedDisp={singleDisp} reset={setSingleDisp} />
    </div>
  );
};

export default Edit;
