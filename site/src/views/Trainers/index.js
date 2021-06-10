import React from 'react';
import { UserTableRow, UserRow } from 'components/UserTableRow';
import Layout from 'Layouts/TableLayout';
import Nav from 'components/InnerHeader';
import './style.scss';

const Students = () => {
  return (
    <section className="dash-con trainers">
      <Nav>
        <h3>Trainers</h3>
      </Nav>
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
