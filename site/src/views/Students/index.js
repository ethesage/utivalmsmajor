import React from 'react';
// import T from 'components/Table';
import Nav from 'components/InnerHeader';
import Select from 'components/Select';
import Input from 'components/Input';
import './style.scss';

const Students = () => {
  return (
    <section className="dash-con students">
      <Nav>
        <h3>Students</h3>
      </Nav>

      <div className="user_filter flex-row j-space">
        <div className="in_sec flex-row">
          <p>Course</p>
          <Select inputs={[]} />
        </div>

        <div className="in_sec flex-row">
          <p>Status</p>
          <Select inputs={[]} />
        </div>

        <div className="in_sec flex-row">
          <Input />
        </div>
      </div>
    </section>
  );
};

export default Students;
