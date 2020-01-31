import React from 'react';
import { Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import TripPage from './pages/TripPage';
import SavePage from './pages/SavePage';

const App = () => {
    return (
        <>
          <Route component={PostListPage} path={['/@:username', '/']} exact />
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/signup" />
          <Route component={ProfilePage} path="/users/@:username/profile" />
          <Route component={WritePage} path="/post" />
          <Route component={DetailsPage} path="/post/:id" />
          <Route component={TripPage} path="/users/@:username/trip" />
          <Route component={SavePage} path="/users/@:username/save" />
        </>
    );
};

export default App;