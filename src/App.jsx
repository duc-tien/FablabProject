import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import Layout from '~/Layout';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
function App() {
  const navigate = useNavigate();
  const [roleOfPerson, setRoleOfPerson] = useState('');
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setRoleOfPerson(role);
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <Routes>
      {roleOfPerson == 'user' &&
        publicRoutes.map((route, index) => {
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout header={route.header}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      {roleOfPerson == 'admin' &&
        privateRoutes.map((route, index) => {
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout header={route.header}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      <Route path="*" element={'Page Not Found'} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
