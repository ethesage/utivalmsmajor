import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileCheck from 'components/ProfileCheck';
import Welcome from './Welcome';
import EduInfo from 'components/EduInfo';
import img from 'assets/homepage/girl.png';
import Performance from './Performance';

const Home = () => {
  const { user, isStudent } = useSelector((state) => state.auth);
  const currentScroll = useRef();
  const headRef = useRef();
  const [slided, setSlided] = useState();

  useEffect(() => {
    let reqId;

    const scroll =
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const loop = () => {
      if (currentScroll.current !== window.scrollY) {
        currentScroll.current = window.scrollY;

        const navPosition = headRef.current?.getBoundingClientRect().y;

        if (currentScroll.current > 80) {
          if (navPosition < 60) {
            setSlided(true);
          }
        } else {
          setSlided(false);
        }
      }

      reqId = scroll(loop);
    };

    loop();

    return () => {
      window.cancelAnimationFrame(reqId);
    };
  }, [currentScroll]);

  return (
    <main className="dash-con dash-home">
      <section className="mb-5">
        <div className="h-10">
          <h3
            className={`text-theme text-2xl md:text-3xl mb-2 transition-all duration-300 whitespace-pre-wrap ${
              slided
                ? 'static sm:fixed container top-0 z-50 p-0 h-20 flex items-center animate-fade ml-14 lg:ml-0'
                : 'static mr-2.5'
            }`}
            ref={headRef}
          >
            Hello{' '}
            <strong>
              {user.firstName}{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
            </strong>
          </h3>
        </div>
        <p className="text-sm">
          Stay safe and wear your nosemask{' '}
          <span role="img" aria-label="nose-mask">
            😷
          </span>{' '}
        </p>
      </section>

      <ProfileCheck user={user} />
      <Welcome user={user} />

      <EduInfo isStudent={isStudent} />

      <section className="bg-white p-1 py-5 sm:p-5 rounded-md mb-16 flex-center">
        <div className="max-w-7xl flex flex-wrap -mx-3.5 h-auto md:h-96">
          <div className="w-full md:max-w-2/5 xl:max-w-3/10 px-3.5">
            <img
              src={img}
              alt="omotola"
              className="object-cover w-full max-h-80 rounded-md"
            />
          </div>
          <div className="px-3.5 md:max-w-3/5 xl:max-w-7/10 flex flex-col justify-between mt-10 md:mt-0">
            <h2 className="dancing-script text-3xl text-theme mb-7 md:mb-0">
              Meet Omotola
            </h2>

            <div>
              <p className="mb-5 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                faucibus condimentum augue ac varius. Sed at tellus quis magna
                faucibus commodo. In interdum sollicitudin purus sed dapibus.
                Aliquam erat volutpat. Morbi lectus urna, tincidunt eu tincidunt
                in.
              </p>

              <div className="p-3 rounded-md bg-sec-shade flex items-center">
                <p className="text-7xl mr-5 ">“</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  faucibus condimentum augue ac varius. Sed at tellus quis magna
                  faucibus commodo. In interdum sollicitudin purus sed dapibus.
                  Aliquam erat volutpat. Morbi lectus urna, tincidunt eu
                  tincidunt in.
                </p>
              </div>
            </div>

            <footer className="text-sm mt-9 md:mt-0">
              <p className="font-bold text-theme">Omotola Adekanbi</p>
              <p>Academy Director, Utiva</p>
            </footer>
          </div>
        </div>
      </section>

      <Performance />
    </main>
  );
};

export default Home;
