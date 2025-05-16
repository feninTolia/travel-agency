import { Link } from 'react-router';
import NavItems from './NavItems';
import { useEffect, useState } from 'react';

const MobileSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />

          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      {isSidebarOpen && (
        <>
          <dialog
            open={isSidebarOpen}
            className=" z-20 h-screen overflow-hidden"
          >
            <NavItems handleClick={toggleSidebar} />
          </dialog>
          <button
            onClick={toggleSidebar}
            className={`${
              isSidebarOpen ? 'bg-gray-100/50' : 'bg-none'
            } absolute z-10 inset-0`}
          />
        </>
      )}
    </div>
  );
};
export default MobileSidebar;
