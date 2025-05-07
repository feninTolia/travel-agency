import { Header } from 'components';

const Dashboard = () => {
  const user = { name: 'Anatolii' };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? 'Guest'}`}
        description="Track activity, trends and popular destinations in real life"
      />
      Dash
    </main>
  );
};

export default Dashboard;
