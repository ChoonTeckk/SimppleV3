import React, { useState, useEffect } from "react";
// import { getUsers, createUser } from "../services/usersService";
import { getClients, createClient } from "../services/usersService";
import OfflineNotice from "../components/OfflineNotice";
import '../index.css';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: number;
  role_name: string;
  role_id: number;
  city: string;
  state: string;
  postal_code: number;
  country: string;
  image: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role_name: "", role_id: "", city: "", state: "", postal_code: "", country: "", image: "" });

  // Fetch users
  const fetchClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient({
        name: form.name,
        email: form.email,
        phone: Number(form.phone),
        role_name: form.role_name,
        role_id: Number(form.role_id),
        city: form.city,
        state: form.state,
        postal_code: Number(form.postal_code),
        country: form.country,
        image: form.image
      });
      alert("Client added successfully!");
      setForm({ name: "", email: "",  phone: "", role_name: "", role_id: "", city: "", state: "", postal_code: "", country: "", image: ""});
      setModalOpen(false);
      fetchClients();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add client");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">All Clients</h1>



      {/* Add User Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Clients
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-transform duration-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Add Clients</h2>
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
                name="phone"
                placeholder="phone"
                value={form.phone}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="text"
                name="role_name"
                placeholder="role name"
                value={form.role_name}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                value={form.city}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="state"
                value={form.state}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="number"
                name="postal_code"
                placeholder="postal code"
                value={form.postal_code}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="country"
                value={form.country}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="image"
                value={form.image}
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
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role name</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Postal code</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border px-4 py-2">{client.id}</td>
              <td className="border px-4 py-2">{client.name}</td>
              <td className="border px-4 py-2">{client.email}</td>
              <td className="border px-4 py-2">{client.phone}</td>
              <td className="border px-4 py-2">{client.role_name}</td>
              <td className="border px-4 py-2">{client.city}</td>
              <td className="border px-4 py-2">{client.state}</td>
              <td className="border px-4 py-2">{client.postal_code}</td>
              <td className="border px-4 py-2">{client.country}</td>
              <td className="border px-4 py-2">{client.image}</td>
              
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No Clients found.
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
