import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from 'components/InnerHeader';

const BreadCrumbs = () => {
  const breadcrumbs = useSelector((state) => state.breadcrumb);

  return (
    <Nav>
      {breadcrumbs.map((crumb, i) => (
        <div key={`crumb_th_${i}`} className="flex-row">
          {i !== 0 && <span>{' > '}</span>}
          <Link to={crumb?.link} className="reg_text">
            <h3>{crumb?.name}</h3>
          </Link>
        </div>
      ))}
    </Nav>
  );
};

export default BreadCrumbs;
