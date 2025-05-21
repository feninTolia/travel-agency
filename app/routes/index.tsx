import { Header } from 'components';
import { Link, useNavigate } from 'react-router';
import { getUser, logoutUser } from '~/appwrite/auth';
import type { Route } from './+types';
import { account } from '~/appwrite/client';

export const clientLoader = async () => {
  return await getUser();
  // return await account.get();
};

const Home = ({ loaderData: user }: Route.ComponentProps) => {
  const navigate = useNavigate();
  console.log('user', user);

  const handleLogout = async () => {
    await logoutUser();
    await navigate('/');
  };

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
            {user?.accountId ? (
              <div className="flex flex-row bg-none gap-4">
                <Link
                  className="rounded-lg py-3 px-3.5  bg-primary-100 text-white w-fit hover:bg-primary-500 transition-all"
                  to={'/dashboard'}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="cursor-pointer">
                  <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    className="size-6 hover:brightness-8 0"
                  />
                </button>
              </div>
            ) : (
              <Link
                className="rounded-lg py-3 px-3.5  bg-primary-100 text-white w-fit hover:bg-primary-500 transition-all"
                to={'/sign-in'}
              >
                Sign In
              </Link>
            )}
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
