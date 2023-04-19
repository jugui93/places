import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import './App.css';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />} exact />
          <Route path='/:userId/places' element={ <UserPlaces />} exact />
          <Route path='/places/new' element={<NewPlace />} exact />
          <Route path='/places/:placeId' element={<UpdatePlace />} exact />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
