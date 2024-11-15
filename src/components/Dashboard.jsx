import { useEffect, useState } from "react";

function Dashboard() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className="token-container">
      <h1>ユーザー情報</h1>
      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Created At: {user.created_at}</p>
        </div>
      )}
      {token && <p className="token-text">Token: {token}</p>}
    </div>
  );
}

export default Dashboard;
