import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const BASE_URL = "http://localhost:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("ログイン成功:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        console.error(data.message);
        setError("エラーが発生しました");
      }
    } catch (error) {
      console.error("エラー", error);
      setError("エラーが発生しました");
    }
  }

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <IoMail className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/signup")}>サインアップ画面へ</button>
      </div>
    </div>
  );
}

export default Login;