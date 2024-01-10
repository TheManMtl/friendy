import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import useAxiosToken from '../../../hooks/useAxiosToken';
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
  imageUrl?: string;
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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // last and first user on the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const axiosToken = useAxiosToken();
  useEffect(() => {
    // Fetch users 
    axiosToken.get("users/admin")
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);


  //users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const viewUser = (userId: number) => {
    //TODO: User detail page
    console.log("View user with ID:", userId);

  };
  return (
    <>
      <div className="row bg-pink">
        <h1 className='mt-3'>Admin Panel</h1>
      </div>
      <AdminNavbarTop />

      <div className="container mt-3">
        <h2>Users List Updated</h2>
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
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>DOB</th>
              <th>role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className={getColorByRole(user.role)}>
                <td >{user.id}</td>
                <td>
                  {user.imageUrl ? <img src={user.imageUrl} alt={user.name} style={{ width: '50px', height: '50px' }} /> : 'No image'}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>{new Date(user.birthday).toLocaleDateString()}</td>
                <td>
                  {user.role}
                </td>
                <td>
                  <button className='btn btn-warning' onClick={() => viewUser(user.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(users.length / itemsPerPage)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminUsersPage;
