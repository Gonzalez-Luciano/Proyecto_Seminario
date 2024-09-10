import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser } from "../controllers/userController";

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    email: "",
  });

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Manejar la adición de un nuevo usuario
  const handleAddUser = async (e) => {
    e.preventDefault();
    const response = await addUser(newUser);
    if (response.success) {
      loadUsers(); // Actualizar la lista
      setNewUser({ username: "", password: "", email: "" });
    }
  };

  // Manejar la actualización de un usuario existente
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const response = await updateUser(editUser);
    if (response.success) {
      setUsers(
        users.map((user) => (user.id === editUser.id ? editUser : user))
      );
      setEditUser({ id: null, username: "", email: "" });
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => setEditUser(user)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nuevo usuario */}
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Formulario para editar usuario */}
      {editUser.id && (
        <>
          <h2>Edit User</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              placeholder="Username"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <button type="submit">Update User</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserView;
