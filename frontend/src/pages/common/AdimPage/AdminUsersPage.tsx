import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import AdminNavbarTop from './AdminComponents/AdminNavbarTop';
import "./AdminStyle.css";

interface User {
  id: number;
  name: string;
  email: string;
  // Add more properties as needed
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from your backend API using axios
    axios.get("http://localhost:8080/api/users/admin")
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
      <div className="row bg-pink">
        <h1 className='mt-3'>Admin Panel</h1>
      </div>
      <AdminNavbarTop />

      <div className="container mt-3">
        <h2>Users List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsersPage;
