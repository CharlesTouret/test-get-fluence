import {
  Routes, Route, BrowserRouter, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// Auth
import SignUp from '../components/pages/Auth/SignUp';
import Login from '../components/pages/Auth/Login';
// Pages
import UserProfile from '../components/pages/UserProfile';
import CalendarPage from '../components/pages/Calendar';
// General
import Error from '../components/pages/Error';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ConnectedRoute(<UserProfile />)} />
        <Route path="/calendar" element={ConnectedRoute(<CalendarPage />)} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

function ConnectedRoute(Element: any) {
  const authState = useSelector((state: any) => state.auth);
  return (authState.loggedIn && authState.accessToken) ? Element : <Navigate to="/login" state={{ autoLogout: true }} />;
}
export default Router;
