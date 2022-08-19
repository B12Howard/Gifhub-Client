import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import GifCreator from '../Components/GifCreator/gif-creator';
import MyUploads from '../Components/GifCreator/my-uploads';
import LoadingScreen from '../Components/loading-screen';
import Login from '../Components/Login/login';
import PlayerPresentation from '../Components/Player/player-presentation';
import LoginLayout from '../Components/views/login-layout';

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
        <Route path="auth" element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Route>
        <Route path="home" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="player" element={<PlayerPresentation />} />
            <Route path="playlist" element={<PlaylistPresentation />} />
            <Route path="*" element={<DashboardLayout />} />
        </Route>
        <Route path="members" element={<DashboardLayout />}>
            <Route path="gif-creator" element={<GifCreator />} />
            <Route path="my-uploads" element={<MyUploads />} />
            <Route path="*" element={<GifCreator />} />
        </Route>
        <Route path="*" element={<DashboardLayout />} />
    </Routes>
);

export default AppRoutes;