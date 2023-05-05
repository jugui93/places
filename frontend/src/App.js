import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useState } from 'react';

// import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (<Routes>
      <Route path='/' element={<Users />} exact />
      <Route path='/:userId/places' element={<UserPlaces />} exact />
      <Route path='/places/new' element={<NewPlace />} exact />
      <Route path='/places/:placeId' element={<UpdatePlace />} exact />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>);
  } else {
    routes = (<Routes>
      <Route path='/' element={<Users />} exact />
      <Route path='/:userId/places' element={<UserPlaces />} exact />
      <Route path='/auth' element={<Auth />} exact />
      <Route path='*' element={<Navigate to="/auth" />} />
    </Routes>);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
