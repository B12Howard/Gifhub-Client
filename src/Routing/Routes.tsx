import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import GifCreator from '../Components/GifCreator/gif-creator';
import MyUploads from '../Components/MyUploads/my-uploads-presentation';
import LoadingScreen from '../Components/Shared/loading-screen';
import Login from '../Components/Login/login';
import PlayerPresentation from '../Components/Player/player-presentation';
import DashboardPresentation from '../Components/Dashboard/dashboard-presentation';
import LoginLayout from '../Components/Layouts/login-layout';
import PrivateRoute from '../Guards/AuthGuard';

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );

const MainLayout = Loadable(lazy(() => import('../Components/Layouts/main-layout')));
const PlaylistLayout = Loadable(lazy(() => import('../Components/Playlist/playlist-presentation')));

const AppRoutes = () => (
    // TODo Private route on gif-cretor
    <Routes>
        <Route path="auth" element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Route>
        <Route path="home" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPresentation />} />
            <Route path="player" element={<PlayerPresentation />} />
            <Route path="playlist/:playlistId/edit" element={<PlaylistLayout mode={'edit'} />} />
            <Route path="playlists" element={<PlaylistLayout mode={'list'} />} />
            <Route path="*" element={<MainLayout />} />
        </Route>
        <Route
            path="members"
            element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }
        >
            <Route path="gif-creator" element={<GifCreator />} />
            <Route path="my-uploads" element={<MyUploads />} />
            <Route path="*" element={<GifCreator />} />
        </Route>
        <Route path="*" element={<MainLayout />} />
    </Routes>
);

export default AppRoutes;
