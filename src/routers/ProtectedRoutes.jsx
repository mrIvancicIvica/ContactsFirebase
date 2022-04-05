import { useContext } from 'react';
import { UserContext } from '../context/FirebaseContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default ProtectedRoutes;
