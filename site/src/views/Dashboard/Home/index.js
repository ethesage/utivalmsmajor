import { useSelector } from 'react-redux';
import ProfileCheck from 'components/ProfileCheck';
import Welcome from './Welcome';
import Title from 'components/Title';
import EduInfo from 'components/EduInfo';
import img from 'assets/homepage/girl.png';
import Performance from './Performance';
import oando from 'assets/oando.png';

const Home = () => {
  const { user, isStudent } = useSelector((state) => state.auth);

  return (
    <main className="dash-con dash-home">
      <section className="mb-5">
        <Title
          crumbs={false}
          bold={false}
          spx={false}
          text={
            <>
              Hello{' '}
              <strong>
                {user.firstName}{' '}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </strong>{' '}
            </>
          }
        />
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

            <footer className="text-sm mt-9 md:mt-0 w-full flex flex-wrap justify-between">
              <div>
                <p className="font-bold text-theme">Omotola Adekanbi</p>
                <p>Academy Director, Utiva</p>
              </div>

              <img src={oando} alt="Oando" />
            </footer>
          </div>
        </div>
      </section>

      <Performance />
    </main>
  );
};

export default Home;
