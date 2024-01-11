import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import useAxiosToken from '../../../hooks/useAxiosToken';
import AdminNavbarTop from './AdminComponents/AdminNavbarTop';
import "./AdminStyle.css";
import { useNavigate } from 'react-router-dom'

interface User {
  id: number;
  name: string;
  email: string;
  location: string;
  birthday: Date;
  isDeleted: boolean;
  role: string;
  profileImgThumbnail?: string;
}

//define colors for role
function getColorByRole(role: string): string {

  //console.log("Role:", role);
  switch (role) {
    case 'Admin':
      return 'bgadmin';
    case 'User':
      return 'bguser';
    default:
      return 'white';
  }
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
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
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);  // Set initial filtered users
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    // Update filtered users when selectedStatus changes
    if (selectedStatus === 'All') {
      setFilteredUsers(users);
    } else {
      const isDeletedStatus = selectedStatus === 'Deleted';
      setFilteredUsers(users.filter(user => user.isDeleted === isDeletedStatus));
    }
  }, [selectedStatus, users]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };
  //users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const viewUser = (userId: number) => {
  //   
  //   console.log("View user with ID:", userId);    
  // };

  const navigate = useNavigate();

  const viewUser = (userId: number) => {
    navigate(`/user-details/${userId}`);
  };
  return (
    <>
      <div className="row bg-pink">
        <h1 className='mt-3'>Admin Panel</h1>
      </div>
      <AdminNavbarTop />

      <div className="container mt-3 ">
        <h2 className='mb-5'>Users List</h2>

        <div className="row">
          <div className="col-md-2">
            <div>
              <button className='btn btn-secondary mb-3' onClick={() => handleStatusChange('All')}>All Users</button>
            </div>
          </div>
          <div className="col-md-2">
            <div>
              <button className='btn btn-info' onClick={() => handleStatusChange('Active')}>Active Users</button>
            </div>
          </div>
          <div className="col-md-2">
            <div>
              <button className='btn btn-primary' onClick={() => handleStatusChange('Deleted')}>Deleted Users</button>
            </div>
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
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(indexOfFirstUser, indexOfLastUser).map(user => (
              <tr key={user.id} className={getColorByRole(user.role)}>
                <td >{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>{new Date(user.birthday).toLocaleDateString()}</td>
                <td>
                  {user.role}
                </td>
                <td>
                  {user.isDeleted ? 'Deleted' : 'Active'}
                </td>
                <td>
                  <button className='btn btn-warning' onClick={() => viewUser(user.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button className='' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button className='' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(users.length / itemsPerPage)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminUsersPage;
