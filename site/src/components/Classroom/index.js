import React from 'react';
import { useParams } from 'react-router-dom';
// import Loader from "../../../components/Loader";
import Classes from './Classes';
import NavBar from '../../components/CourseNav';
import './style.scss';

const _data = [
  {
    id: 1,
    title: 'Jude',
    name: 'Week one - SQL For Data',
  },
  {
    id: 2,
    title: 'Jude violet',
    name: 'Week Two - SQL For Data',
  },
  {
    id: 3,
    title: 'Jude chinoso',
    name: 'Week Three - SQL For Data',
  },
  {
    id: 4,
    title: 'Jude okuwanyi',
    name: 'Week Four - SQL For Data',
  },
];

const Classroom = ({ data, full = false }) => {
  const { courseId, section } = useParams();

  return (
    <>
      <NavBar />
      <section className="cx_listnx">
        {_data.length === 0 ? (
          // <Loader tempLoad={true} height="100%" load={true} />
          <div>...loading</div>
        ) : (
          <div>
            {_data.map((class_room, i) => (
              <Classes
                key={`cx_listnx_${i}`}
                data={class_room}
                courseId={courseId}
                section={section}
                full={full}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
