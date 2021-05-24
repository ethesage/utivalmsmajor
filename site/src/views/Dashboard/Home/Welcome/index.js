import React, { useState } from 'react';

const Welcome = ({ user }) => {
  // check if user has course
  const [open, setOpen] = useState(true);

  return (
    <>
      {open ? (
        <section className="welcome max-w-5xl mt-8 mb-16">
          <h1 className="text-theme text-2xl mb-3">
            Welcome to the Utiva Learning Platform
          </h1>

          <p
            className="text-sm lg:text-base text-justify"
            style={{
              fontSize: '14.5px',
            }}
          >
            Utiva develops the best talents for global businesses! We help you
            become top 5% most sought-after talent by global brands.{'\n'}Utiva
            runs 6 digital skill training schools and invests in developing an
            ecosystem of skilled talents across the entire technology lifecycle.
            We also help companies both in Africa and abroad access technology
            savvy talents through our remote model or for product dev.
          </p>
        </section>
      ) : null}
    </>
  );
};

export default Welcome;
