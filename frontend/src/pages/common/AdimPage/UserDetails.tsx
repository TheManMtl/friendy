import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosToken from '../../../hooks/useAxiosToken';

// Assuming you have a function to fetch user data by ID

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

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>(); // Ensure that you capture the userId parameter correctly
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();


  const axiosToken = useAxiosToken();

  useEffect(() => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    axiosToken.get(`/users/admin/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, [userId, axiosToken]);

  const disableUser = (userId: number) => {
     
    axiosToken.put(`/users/admin/disable/${userId}`)
      .then(response => {
  
        //TODO: update the status on the page
        
      })
      .catch(error => {
        console.error('Error disabling user:', error);
        
      })
      .finally(() => {
       
      });
  };
  

  const goToAdminPage = () => {
    navigate('/admin'); // Update this to your admin page's route
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isDeleted? 'Deleted' : 'Active'}</p>
      <p><strong>Location:</strong> {user.location || 'N/A'}</p>

      <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'N/A'}</p>


      <button onClick={() => disableUser(user.id)}>Disable</button>
      <button onClick={goToAdminPage}>Go to Admin Page</button>
    </div>
  );
};

export default UserDetails;
