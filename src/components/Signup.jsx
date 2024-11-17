import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const BASE_URL = "http://localhost:3000";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log("if文前", data);

      if (!response.ok) {
        console.log("if文内", data);
        throw new Error("サインアップに失敗しました");
      }
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("エラーが発生しました: " + err.message);
    }
  }

  return (
    <div className="signup-container">
      <h2>サインアップ</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <IoMail className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">サインアップ</button>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/")}>ログイン画面へ</button>
      </div>
    </div>
  );
}

export default Signup;
