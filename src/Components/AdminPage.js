import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); 
  const [updatedUser, setUpdatedUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
   
    // Fetch user data from backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.0.108:8080/users'); 
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  const handleEdit = (user) => {
    setEditUser(user);
    setUpdatedUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://192.168.0.108:8080/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? response.data : user)));
      setEditUser(null); // Close the update form
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://192.168.0.108:8080/users/${userId}`); 
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button onClick={() => handleEdit(user)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Update form */}
      {editUser && (
        <div className="update-form">
          <h2>Update User</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                required
              />
            </label>
            
           
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserTable;
