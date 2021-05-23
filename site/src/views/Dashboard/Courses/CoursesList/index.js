import { useSelector } from 'react-redux';
import Title from 'components/Title';
import CourseCard from 'components/MainCourse';

const CourseList = () => {
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);

  return (
    <div className="w-full">
      <Title text="Your Courses" bold crumbs={false} />
      <section className="-m-3.5 flex flex-wrap ">
        {enrolledcourses.map((course, i) => (
          <CourseCard data={course} key={`enrolled_c_${i}`} />
        ))}
      </section>
    </div>
  );
};

export default CourseList;
