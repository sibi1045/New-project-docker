import { useEffect, useState } from "react";

const API_URL = "/api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  async function getUsers() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data);
    } catch (error) {
      setMessage(error.message);
      setErrorMessage(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function createUser(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to create user");

      setName("");
      setEmail("");
      setMessage("User created successfully.");
      setErrorMessage(false);
      await getUsers();
    } catch (error) {
      setMessage(error.message);
      setErrorMessage(true);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete user");

      setMessage("User deleted successfully.");
      setErrorMessage(false);
      await getUsers();
    } catch (error) {
      setMessage(error.message);
      setErrorMessage(true);
    }
  }

  return (
    <main className="container">
      <h1>User Management</h1>
      <p className="subtitle">Create and manage users with MongoDB.</p>

      <form onSubmit={createUser} className="user-form">
        <label>
          Name
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <button type="submit">Create User</button>
      </form>

      {message && (
        <p className={errorMessage ? "message error" : "message"} role="status">
          {message}
        </p>
      )}

      <section>
        <h2>Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p className="empty">No users found. Create your first user above.</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <div className="user-details">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteUser(user._id)}
                  aria-label={`Delete ${user.name}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
