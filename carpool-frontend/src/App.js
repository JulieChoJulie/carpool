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
import ErrorPage from './pages/ErrorPage';
import ManagePage from './pages/ManagePage';
import EditPage from './pages/EditPage';
import FindRides from "./pages/FindRides";

const App = () => {
    return (
        <>
          <Route component={PostListPage} path={['/@:username', '/']} exact />
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/signup" />
          <Route component={ProfilePage} path="/users/@:username/profile" />
          <Route component={WritePage} path="/post" exact />
          <Route component={ManagePage} path="/manage" exact/>
          <Route component={DetailsPage} path="/posts/:id" exact />
          <Route component={TripPage} path="/users/@:username/trip" />
          <Route component={SavePage} path="/users/@:username/save" />
          <Route component={ErrorPage} path="/error/:status" />
          <Route component={EditPage} path="/posts/:id/edit" exact/>
          <Route component={FindRides} path="/find-rides" />
        </>
    );
};

export default App;