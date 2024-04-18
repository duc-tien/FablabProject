import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import Layout from '~/Layout';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
function App() {
  const navigate = useNavigate();
  const [roleOfPerson, setRoleOfPerson] = useState('');
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo.role) {
      setRoleOfPerson(userInfo.role);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
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
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="*" element={'Page Not Found'} /> */}
    </Routes>
  );
}

export default App;
