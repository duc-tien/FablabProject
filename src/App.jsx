import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.page;
        console.log(route.page);
        console.log(route.path);
        return <Route key={index} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
