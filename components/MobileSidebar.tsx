// @ts-nocheck //TODO: SidebarComponent props types
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { Link } from 'react-router';
import NavItems from './NavItems';
import { useRef } from 'react';

const MobileSidebar = () => {
  const sidebar = useRef<SidebarComponent>(null);

  const toggleSidebar = () => sidebar?.current?.toggle();

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img src="/assets/icons/logo.svg" alt="logo" className="size-7.5" />
          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img
            src="/assets/icons/menu.svg"
            alt="menu"
            className="size-7 cursor-pointer"
          />
        </button>
      </header>
      <SidebarComponent
        ref={sidebar}
        width="270px"
        created={() => sidebar?.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
