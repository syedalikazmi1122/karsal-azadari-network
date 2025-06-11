import { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <AdminLogin setToken={setToken} />
      {/* {token ? <AdminDashboard token={token} /> : <AdminLogin setToken={setToken} />} */}
    </div>
  );
}

export default Admin;