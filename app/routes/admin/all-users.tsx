import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import { Header } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { getUsers } from '~/appwrite/auth';
import type { Route } from './+types/all-users';
import { cn, formatDate } from 'lib/utils';

export const clientLoader = async () => {
  const { users, total } = await getUsers({ limit: 10, offset: 0 });
  return { users, total };
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const [showGrid, setShowGrid] = useState(false);
  const users = loaderData?.users;
  console.log(users);

  useEffect(() => {
    setShowGrid(true);
  }, []);

  const nameTemplate = useCallback(
    (props: UserData) => (
      <div className="flex items-center gap-1.5 px-4">
        <img
          src={props?.imageUrl}
          alt="avatar"
          referrerPolicy="no-referrer"
          className="rounded-full size-8 aspect-square"
        />
        <span>{props.name}</span>
      </div>
    ),
    []
  );

  const statusTemplate = useCallback(
    ({ status }: UserData) => (
      <article
        className={cn(
          'status-column',
          status === 'user' ? 'bg-success-50' : 'bg-light-300'
        )}
      >
        <div
          className={cn(
            'size-1.5 rounded-full',
            status === 'user' ? 'bg-success-500' : 'bg-gray-500'
          )}
        />
        <h3
          className={cn(
            'font-inter text-xs font-medium',
            status === 'user' ? 'text-success-700' : 'text-gray-500'
          )}
        >
          {status ?? 'Admin'}
        </h3>
      </article>
    ),
    []
  );
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort and access detailed user profiles"
      />
      {showGrid && (
        <GridComponent dataSource={users ?? []} gridLines="None">
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="Name"
              width={200}
              textAlign="Left"
              template={nameTemplate}
            />
            <ColumnDirective
              field="email"
              headerText="Email Address"
              width={200}
              textAlign="Left"
            />
            <ColumnDirective
              field="joinedAt"
              headerText="Date Joined"
              width={140}
              textAlign="Left"
              template={({ joinedAt }: UserData) => formatDate(joinedAt)}
            />
            <ColumnDirective
              field="status"
              headerText="Type"
              width={100}
              textAlign="Left"
              template={statusTemplate}
            />
          </ColumnsDirective>
        </GridComponent>
      )}
    </main>
  );
};

export default AllUsers;
