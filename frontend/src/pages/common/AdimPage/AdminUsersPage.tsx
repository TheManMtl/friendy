import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import AdminNavbarTop from './AdminComponents/AdminNavbarTop';
import "./AdminStyle.css";

interface User {
  id: number;
  name: string;
  email: string;
  location: string;
  birthday: Date;
  isActive: boolean;
  role: string;
}

//define colors for role
function getColorByRole(role: string): string {

  console.log("Role:", role);
  switch (role) {
    case 'admin':
      return 'bgadmin';
    case 'User':
      return 'bguser';
    default:
      return 'white';
  }
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const baseUrl = "http://localhost:8080/api/";
  useEffect(() => {
    // Fetch users 
    axios.get(baseUrl + "users/admin")
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
        <div className="row">
        <div className="col-md-2">
            <div className="color-box" style={{ backgroundColor: getColorByRole('admin') }}></div>
            <p className="text-center">Admin</p>
          </div>
          <div className="col-md-2">
            <div className="color-box" style={{ backgroundColor: getColorByRole('User') }}></div>
            <p className="text-center">User</p>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>DOB</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className={ getColorByRole(user.role) }>
                <td >{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>{new Date(user.birthday).toLocaleDateString()}</td>
                <td>
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsersPage;
