import React from 'react';
import Button from 'components/Button';
import Nav from 'components/InnerHeader';
import './style.scss';

const index = ({
  title,
  currentCohort,
  currentCourse,
  link,
  text,
  onClick,
}) => {
  return (
    <Nav>
      <div className="al_nav_sec flex-row j-space al-start">
        <h3>
          {title ||
            (!!(currentCourse && currentCohort)
              ? `${currentCourse?.name} ${currentCohort?.Cohort?.cohort} Cohort`
              : '')}
        </h3>

        {text && (
          <Button
            text={text}
            link={link}
            onClick={onClick}
            className="flex-row"
          />
        )}
      </div>
    </Nav>
  );
};

export default index;
