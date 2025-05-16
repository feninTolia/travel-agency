import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route('/sign-in', 'routes/root/sign-in.tsx'),
  layout('routes/admin/admin-layout.tsx', [
    route('/dashboard', 'routes/admin/dashboard.tsx'),
    route('/all-users', 'routes/admin/all-users.tsx'),
    route('/trips', 'routes/admin/trips.tsx'),
    route('/trips/create', 'routes/admin/create-trip.tsx'),
  ]),
] satisfies RouteConfig;
