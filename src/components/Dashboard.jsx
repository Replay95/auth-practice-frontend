import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:3000";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    created_at: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("トークンが見つかりませんでした。");
        return;
      } else {
        try {
          const response = await fetch(`${BASE_URL}/api/users`, {
            metohod: "GET",
            headers: {
              authorization: token,
            },
          });
          const json = await response.json();
          setUserInfo(json);
        } catch (err) {
          setError("ユーザー情報の取得に失敗しました.");
          console.error(err);
        }
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <form>
      <p>ID:{userInfo.id}</p>
      <p>email:{userInfo.email}</p>
      <p>password:{userInfo.password}</p>
      <p>created_at:{userInfo.created_at}</p>
      <div className="button-container">
        <button onClick={() => navigate("/")}>ログイン画面へ</button>
      </div>
    </form>
  );
};

export default Dashboard;
