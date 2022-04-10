import { lazy, Suspense } from 'react';
import LoadingScreen from '../Components/loading-screen';
import DashboardLayout from '../Components/views/dashboard-layout';

// const AppRoutes = () => (
//     <Routes>
//         <DashboardLayout />
//     </Routes>
// )

// export default AppRoutes

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );

const Dashboard = Loadable(lazy(() => import('../Components/views/dashboard')));

const routes = [
    {
        path: 'dashboard',
        element: (
            // <AuthGuard>
            <DashboardLayout />
            // </AuthGuard>
        ),
    },
];
export default routes;
