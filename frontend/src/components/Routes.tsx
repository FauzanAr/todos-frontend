import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {ProtectedRoute} from './ProtectedRoute';

import Login from './Login';
import Register from './Register';
import Dashboard from '../layout/Dashboard';
import Todo from './Todo';

const RoutesApp = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token ? (
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={
                <Dashboard>
                  <Todo />
                </Dashboard>
              } />
          </Route>
        ) : (
          <Route path="/dashboard" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default RoutesApp;
