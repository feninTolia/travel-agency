import { cn } from 'lib/utils';
import { Link, NavLink } from 'react-router';
import { sidebarItems } from '~/constants';

type Props = {
  handleClick?: () => void;
};

const NavItems = ({ handleClick }: Props) => {
  const user = {
    name: 'Anatolii',
    email: 'fenintolja@gmail.com',
    imgUrl: '/assets/images/avatar.png',
  };

  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Tourvisto</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map(({ label, icon, id, href }) => (
            <NavLink to={href} key={id}>
              {({ isActive }) => (
                <div
                  onClick={handleClick}
                  className={cn('group nav-item', {
                    'bg-primary-100 !text-white ': isActive,
                  })}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`${isActive && 'brightness-0 invert'}`}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <footer className="nav-footer">
          <img
            src={user?.imgUrl ?? '/assets/images/avatar.png'}
            alt={user?.name || 'User'}
          />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button
            onClick={() => console.log('logout')}
            className="cursor-pointer"
          >
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6 hover:brightness-8 0"
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
