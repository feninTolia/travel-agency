import { Header } from 'components';
import { Link } from 'react-router';

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <div className="travel-hero">
        <div>
          <section className="wrapper flex justify-between items-center w-full flex-row py-0">
            <Link to="/" className="link-logo border-none">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
              <h1>Tourvisto</h1>
            </Link>

            <Link
              className="rounded-lg py-3 px-3.5  bg-primary-100 text-white w-fit hover:bg-primary-500 transition-all"
              to={'/dashboard'}
            >
              Dashboard
            </Link>
          </section>

          <section className="wrapper py-36 flex-col gap-8">
            <h1 className="text-6xl font-bold w-2/5 text-dark-100 text-dark-400">
              Plan Your Trip with Ease
            </h1>
            <p className="w-2/5">
              Customize your travel itinerary in minutes - pick your
              destination, set your preferences and explore with confidence
            </p>
            <Link
              to="/dashboard"
              className="rounded-lg py-3 px-3.5  bg-primary-100 text-white w-fit hover:bg-primary-500 transition-all"
            >
              Get Started
            </Link>
          </section>
        </div>
      </div>

      <div className="wrapper pt-12">
        <Header
          title="Featured Travel Destinations"
          description="Customize your travel itinerary in minutes - pick your destination, set your preferences and explore with confidence"
        />
      </div>
    </main>
  );
};

export default Home;
