import React, { useState, useEffect } from "react";
import { getTasks, createTask } from "../services/Service";
import OfflineNotice from "../components/OfflineNotice";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import DatePicker from "react-datepicker";



interface Task {
  id: number;
  name: string;
  priority: string;
  status: string;
  created_at: string;
  due_date: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    priority: "",
    status: "",
    due_date: "",
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({
        name: form.name,
        priority: form.priority,
        status: form.status,
        due_date: form.due_date 
      });
      alert("Task added successfully!");
      setForm({ name: "", priority: "", status: "", due_date: "" });
      setModalOpen(false);
      fetchTasks();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">All Tasks</h1>

      {/* Add Task Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-transform duration-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={form.name}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />

              {/* Priority Dropdown */}
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {/* Status Dropdown */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              {/* Due Date */}
              {/* <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              /> */}

            {/* <DatePicker
              selected={form.due_date ? new Date(form.due_date) : null}
              onChange={(date: Date | null) =>
                setForm({ ...form, 
                due_date: date ? date.toISOString().split("T")[0] : "" 
                })
              }
                                showTimeSelect      
                timeFormat="HH:mm"
                timeIntervals={30}
              className="border px-2 py-1 rounded w-full"
              placeholderText="Select due date"
              dateFormat="yyyy-MM-dd"
              />     */}
              <DatePicker
                selected={form.due_date ? new Date(form.due_date) : null}
                onChange={(date: Date | null) =>
                  setForm({
                    ...form,
                    due_date: date ? date.toISOString().slice(0, 19).replace("T", " ") : ""
                  })
                }
                showTimeSelect      
                timeFormat="HH:mm"
                timeIntervals={30} //this code allows the user to select time 
                className="border px-2 py-1 rounded w-full"
                placeholderText="Select due date and time"
                dateFormat="yyyy-MM-dd HH:mm"
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

      {/* Tasks Table */}
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Task ID</th>
            <th className="border px-4 py-2">Task Name</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Created Date</th>
            <th className="border px-4 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.name}</td>
              {/* <td className="border px-4 py-2">{task.priority}</td> */}
              {/* <td className="border px-4 py-2">{task.status}</td> */}
              <td
                className={`border px-4 py-2 font-semibold
                  ${task.priority === "High" ? "text-red-500" : ""}
                  ${task.priority === "Medium" ? "text-orange-500" : ""}
                  ${task.priority === "Low" ? "text-blue-500" : ""}
                `}
              >
                {task.priority}
              </td>
              <td
                className={`border px-4 py-2 font-semibold
                  ${task.status === "Pending" ? "text-yellow-500" : ""}
                  ${task.status === "In Progress" ? "text-blue-500" : ""}
                  ${task.status === "Completed" ? "text-green-600" : ""}
                `}
              >
                {task.status}
              </td>
              <td className="border px-4 py-2">
                  {/* {task.due_date ? new Date(task.due_date + "T00:00:00").toLocaleDateString() : ""} format mm/dd/yyyy */}
                  {task.created_at ? new Date(task.created_at).toISOString().split("T")[0] : ""}
              </td>
              <td className="border px-4 py-2">{task.due_date ? new Date(task.due_date).toISOString().slice(0, 16).replace("T", " "): ""}</td>
              {/* <td className="border px-4 py-2">{new Date(task.due_date).toLocaleDateString()}</td> */}
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-gray-500 text-center">
                No Tasks found.
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
