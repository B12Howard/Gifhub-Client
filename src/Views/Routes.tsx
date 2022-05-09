import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from '../Components/loading-screen';
// import { PlaylistPresentation } from '../Components/Playlist/playlist-presentation';
// import DashboardLayout from '../Components/views/dashboard-layout';
// import Dashboard from '../Components/views/dashboard';

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );

const DashboardLayout = Loadable(lazy(() => import('../Components/views/dashboard-layout')));
const Dashboard = Loadable(lazy(() => import('../Components/views/dashboard')));
const PlaylistPresentation = Loadable(lazy(() => import('../Components/Playlist/playlist-presentation')));

const AppRoutes = () => (
    <Routes>
        <Route path="home" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="playlist" element={<PlaylistPresentation />} />
            <Route path="*" element={<DashboardLayout />} />
        </Route>
        <Route path="*" element={<DashboardLayout />} />
    </Routes>
);

export default AppRoutes;

// const routes = [
//     {
//         path: 'dashboard',
//         element: (
//             // <AuthGuard>
//             <DashboardLayout />
//             // </AuthGuard>
//         ),
//     },
// ];
// export default routes;
