import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import routes from './Views/Routes';

const App = () => {
    const content = useRoutes(routes);
    return <>{content}</>;
};

export default App;
