'use client';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/singleStore';
import { User } from '@/schema/userSchema';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {  GrLinkPrevious ,GrLinkNext } from "react-icons/gr";

const UserTable: React.FC = () => {
  const { users, currentPage, totalPages, fetchUsers, createUser, updateUser, deleteUser } = useUserStore();
  const [newUser, setNewUser] = useState<User>({ name: '', email: '', address: { street: '', city: '', zipcode: '' } });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  const handlePagination = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) fetchUsers(newPage);
  };

  const handleAddUser = async () => {
    await createUser(newUser);
    setNewUser({ name: '', email: '', address: { street: '', city: '', zipcode: '' } });
  };

  const handleEditUser = (user: User) => {
    setNewUser(user);
    setEditUserId(user.id);
  };

  const handleUpdateUser = async () => {
    if (editUserId !== null) {
      await updateUser({ ...newUser, id: editUserId });
      setNewUser({ name: '', email: '', address: { street: '', city: '', zipcode: '' } });
      setEditUserId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Working with Tables</h1>

      <div className="mb-4 items-center flex justify-center">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Street"
          value={newUser.address.street}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, street: e.target.value } })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, city: e.target.value } })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={newUser.address.zipcode}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, zipcode: e.target.value } })}
          className="border rounded p-2 mr-2"
        />
        <button onClick={editUserId ? handleUpdateUser : handleAddUser} className="bg-blue-500 text-white rounded p-2">
          {editUserId ? 'Update User' : 'Add User'}
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Street</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">Zipcode</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.address.street}</td>
              <td className="border border-gray-300 p-2">{user.address.city}</td>
              <td className="border border-gray-300 p-2">{user.address.zipcode}</td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <button onClick={() => handleEditUser(user)}>
                  <FaEdit />
                </button>
                <button onClick={() => deleteUser(user.id!)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Improved Pagination Controls */}
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            className={`bg-gray-300 rounded p-2 mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
           <GrLinkPrevious />
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            className={`bg-gray-300 rounded p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            <GrLinkNext />
          </button>
        </div>
        <span className="font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
      </div>
    </div>
  );
};

export default UserTable;
