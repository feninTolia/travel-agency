import { Header, StatsCard, TripCard } from 'components';
import { allTrips, dashboardsStats, user } from '~/constants';

const Dashboard = () => {
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
            total={dashboardsStats.totalUsers}
            currentMonthCount={dashboardsStats.usersJoined.currentMonth}
            lastMonthCount={dashboardsStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardsStats.totalTrips}
            currentMonthCount={dashboardsStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardsStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users Today"
            total={dashboardsStats.userRole.total}
            currentMonthCount={dashboardsStats.userRole.currentMonth}
            lastMonthCount={dashboardsStats.userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
              <TripCard
                key={id}
                name={name}
                id={id.toString()}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location ?? ''}
                tags={tags}
                price={estimatedPrice}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
