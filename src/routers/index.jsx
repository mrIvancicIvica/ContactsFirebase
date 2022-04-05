import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Contacts from '../components/Contacts';
import AddContact from '../components/AddContact';
import DetailsPage from '../components/DetailsPage';
import ProtectedRoutes from './ProtectedRoutes';

const Routers = () => {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='signin' element={<Login />} />
      <Route path='addcontact' element={<AddContact />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='contacts' element={<Contacts />} />
        <Route path='contacts/:id' element={<DetailsPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
