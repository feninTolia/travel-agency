import { Header, StatsCard, TripCard } from 'components';
import { getUser, getUsers } from '~/appwrite/auth';
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from '~/appwrite/dashboard';
import type { Route } from './+types/dashboard';
import { getAllTrips } from '~/appwrite/trips';
import { parseTripData } from 'lib/utils';
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from '@syncfusion/ej2-react-charts';
import { useEffect, useState } from 'react';
import { tripXAxis, tripYAxis, userXAxis, userYAxis } from '~/constants';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-grids';

export const clientLoader = async () => {
  const [
    user,
    dashboardStats,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips({ limit: 4 }),
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getUsers({ limit: 4, offset: 0 }),
  ]);

  const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 5),
  }));

  return {
    dashboardStats,
    user,
    allTrips,
    userGrowth,
    allUsers: mappedUsers,
    tripsByTravelStyle,
  };
};

const nameTemplate = (props: UserData) => (
  <div className="flex items-center gap-1.5 px-4">
    <img
      src={props?.imageUrl}
      alt="avatar"
      referrerPolicy="no-referrer"
      className="rounded-full size-8 aspect-square"
    />
    <span>{props.name}</span>
  </div>
);

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const user = loaderData.user as User | null;
  const { dashboardStats, allTrips, allUsers, tripsByTravelStyle, userGrowth } =
    loaderData;

  const trips = allTrips.map((trip) => ({
    name: trip.name,
    imageUrl: trip.imageUrls[0],
    interests: trip.interests,
  }));

  const usersAndTrips = [
    {
      title: 'Latests users signups',
      dataSource: allUsers,
      field: 'count',
      headerText: 'Trips created',
    },
    {
      title: 'Trips based on interests',
      dataSource: trips,
      field: 'interests',
      headerText: 'Interests ',
    },
  ];

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? 'Guest'}`}
        description="Track activity, trends and popular destinations in real life"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full ">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats?.totalUsers}
            currentMonthCount={dashboardStats?.usersJoined.currentMonth}
            lastMonthCount={dashboardStats?.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats?.totalTrips}
            currentMonthCount={dashboardStats?.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats?.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users Today"
            total={dashboardStats?.userRole.total}
            currentMonthCount={dashboardStats?.userRole.currentMonth}
            lastMonthCount={dashboardStats?.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(
              ({
                id,
                name,
                imageUrls,
                itinerary,
                interests,
                travelStyle,
                estimatedPrice,
              }) => (
                <TripCard
                  key={id}
                  name={name ?? ''}
                  id={id.toString()}
                  imageUrl={imageUrls?.[0]}
                  location={itinerary?.[0]?.location ?? ''}
                  tags={[interests!, travelStyle!]}
                  price={estimatedPrice!}
                />
              )
            )}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isReady && (
          <>
            <ChartComponent
              id="chart-1"
              primaryXAxis={userXAxis}
              primaryYAxis={userYAxis}
              title="User Growth"
              tooltip={{ enable: true }}
            >
              <Inject
                services={[
                  ColumnSeries,
                  SplineAreaSeries,
                  Category,
                  DataLabel,
                  Tooltip,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={userGrowth}
                  xName="day"
                  yName="count"
                  type="Column"
                  name="Column"
                  fill="#4481eb"
                  columnWidth={0.3}
                  cornerRadius={{ topLeft: 10, topRight: 10 }}
                />
                <SeriesDirective
                  dataSource={userGrowth}
                  xName="day"
                  yName="count"
                  type="SplineArea"
                  name="Wave"
                  fill="rgba(71, 132, 238, 0.3)"
                  border={{ width: 2, color: '#4784ee' }}
                  marker={{ visible: true, width: 5, height: 5 }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>

            <ChartComponent
              id="chart-2"
              primaryXAxis={tripXAxis}
              primaryYAxis={tripYAxis}
              title="Trip Trends"
              tooltip={{ enable: true }}
            >
              <Inject
                services={[
                  ColumnSeries,
                  SplineAreaSeries,
                  Category,
                  DataLabel,
                  Tooltip,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={tripsByTravelStyle}
                  xName="travelStyle"
                  yName="count"
                  type="Column"
                  name="day"
                  fill="#6e2beb"
                  columnWidth={0.3}
                  cornerRadius={{ topLeft: 10, topRight: 10 }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          </>
        )}
      </section>

      <section className="user-trip wrapper">
        {usersAndTrips.map(({ title, dataSource, field, headerText }, idx) => (
          <div key={`${idx}${title}`} className="flex flex-col gap-5">
            <h3 className="p-20-semibold text-dark-100">{title}</h3>
            {isReady && (
              <GridComponent dataSource={dataSource ?? []} gridLines="None">
                <ColumnsDirective>
                  <ColumnDirective
                    field="name"
                    headerText="Name"
                    width={200}
                    textAlign="Left"
                    template={nameTemplate}
                  />
                  <ColumnDirective
                    field={field}
                    headerText={headerText}
                    width={150}
                    textAlign="Left"
                  />
                </ColumnsDirective>
              </GridComponent>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
