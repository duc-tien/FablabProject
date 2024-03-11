import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import Layout from '~/Layout';
function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
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
    </Routes>
  );
}

export default App;
