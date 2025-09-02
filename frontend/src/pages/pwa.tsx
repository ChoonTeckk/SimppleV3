import React, { useState, useEffect } from "react";
import { getUsers, createUser } from "../services/usersService";
import OfflineNotice from "../components/OfflineNotice";
import '../index.css'; // <-- Tailwind is included here globally

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        name: form.name,
        email: form.email,
        age: Number(form.age),
      });
      alert("User added successfully!");
      setForm({ name: "", email: "", age: "" });
      setModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Users</h1>



      {/* Add User Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-30"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-transform duration-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.age}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
            {/* ✅ Toast Notification */}
      <OfflineNotice />
    </div>
  );
}
