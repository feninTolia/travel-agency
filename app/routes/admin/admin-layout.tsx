import { Outlet, redirect } from 'react-router';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { MobileSidebar, NavItems } from 'components';
import { account } from '~/appwrite/client';
import { getExistingUser, storeUserData } from '~/appwrite/auth';

export async function clientLoader() {
  try {
    console.log('in');

    const user = await account.get();
    // console.log('layout user', user);

    if (!user.$id) {
      return redirect('/sign-in');
    }

    const existingUser = await getExistingUser(user.$id);

    console.log('existingUser', existingUser);

    if (existingUser?.status === 'user') {
      return redirect('/');
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log('Error in Client loader', error);
    return redirect('/sign-in');
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
