import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosToken from '../../../hooks/useAxiosToken';
import { Button } from '../../../components/common';
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
  const [disableSuccess, setDisableSuccess] = useState(false);
  const [reactivateSuccess, setReactivateSuccess] = useState(false);

  const [isActive, setActive] = useState(false);

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
  }, [userId, axiosToken, disableSuccess, reactivateSuccess]);

  const disableUser = (userId: number) => {

    axiosToken.put(`/users/admin/disable/${userId}`)
      .then(response => {
        setDisableSuccess(true);
        setReactivateSuccess(false);
        //TODO: update the status on the page

      })
      .catch(error => {
        console.error('Error disabling user:', error);

      })
      .finally(() => {

      });
  };

  const reactivateUser = (userId: number) => {

    axiosToken.put(`/users/admin/reactivate/${userId}`)
      .then(response => {
        setDisableSuccess(false);
        setReactivateSuccess(true);
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
    (
      <div>
        <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
          <div className='col-8'>
            <div className='card'>
              <div className="card-body">
                <div className="row card-title mt-5">
                  <h2>User Details</h2>
                </div>
                <hr />
                <div className="row card-text text-start justify-content-center">
                  <div className='col-auto'>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Status:</strong> {user.isDeleted ? 'Deactivated' : 'Active'}</p>
                    <p><strong>Location:</strong> {user.location || 'N/A'}</p>
                    <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <hr />
                <div className="row card-text text-start justify-content-center">
                  {disableSuccess ? (
                    <>
                      <div className='col-auto'>
                        Successfully deactivated user.
                      </div>
                      <div className='col-auto'>
                        <Button
                          onClick={() => reactivateUser(user.id)}
                          label="Undo"
                          variant="blue"
                        />
                      </div>
                    </>
                  ) : reactivateSuccess ? (
                    <>
                      <div className='col-auto'>
                        Successfully reactivated user.
                      </div>
                      <div className='col-auto'>
                        <Button
                          onClick={() => disableUser(user.id)}
                          label="Undo"
                          variant="blue"
                        />
                      </div>
                      <div className='col-auto'>
                        <Button
                          onClick={() => navigate(`/profile/${user.id}`)}
                          label="View Profile"
                          variant="yellow"
                        />
                      </div>
                    </>
                  ) :
                    (<>
                  {
                    user.isDeleted ? (<></>) : (
                      <div className='col-auto'>
                        <Button
                          onClick={() => navigate(`/profile/${user.id}`)}
                          label="View Profile"
                          variant="yellow"
                        />
                      </div>
                    )
                  }
                  <div className='col-auto'>
                    {user.isDeleted ? (
                      <Button
                        onClick={() => reactivateUser(user.id)}
                        label="Reactivate"
                        variant="blue"
                      />
                    ) : (
                      <Button
                        onClick={() => disableUser(user.id)}
                        label="Deactivate"
                        variant="blue"
                      />
                    )}
                  </div>
                    </>)}
                </div>
                <hr />
                <div className="row card-text text-start justify-content-center my-5">
                  <div className='col-auto'>
                    <Button
                      onClick={goToAdminPage}
                      label="Admin Home"
                      variant="transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
};

export default UserDetails;
