import React from 'react';
import { UserTableRow, UserRow } from 'components/UserTableRow';
import Layout from 'Layouts/TableLayout';
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

      <Layout>
        <UserTableRow
          r1={<strong>Name</strong>}
          r2={<strong>Course</strong>}
          r3={<strong>Active Since</strong>}
          r4={<strong>Location</strong>}
          r5={<strong>Courses</strong>}
          r6={<strong>Action</strong>}
        />
        <UserRow />
      </Layout>
    </section>
  );
};

export default Students;
