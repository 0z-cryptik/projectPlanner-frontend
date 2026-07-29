import { useNavigate } from "react-router-dom";
import { useList } from "@/src/hooks/stateProvider";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser, setProjects } = useList();

  const clickHandler = () => {
    // 1. Clear JWT token from local storage
    localStorage.removeItem("userToken");

    // 2. Reset local user and project state
    setUser(null);
    if (setProjects) {
      setProjects([]);
    }

    // 3. Redirect to login page
    navigate("/login");
  };

  return (
    <center>
      <button
        onClick={clickHandler}
        className="mt-2 text-sm text-red-500">
        Logout
      </button>
    </center>
  );
};