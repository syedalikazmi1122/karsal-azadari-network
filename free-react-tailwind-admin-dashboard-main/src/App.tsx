import { useEffect, useState } from 'react';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import WritingDetail from './components/WritingDetail.jsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
  <Loader />
) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Karsal Azadari | Home" />
            <Home />
          </>
        }
      />
      <Route
        path="/writing/:id"
        element={
          <>
            <PageTitle title="Karsal Azadari | Writing" />
            <WritingDetail />
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <PageTitle title="Karsal Azadari | Admin " />
            <Admin />
          </>
        }
      />
    </Routes>
);

}

export default App;
