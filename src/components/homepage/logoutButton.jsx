import { useNavigate } from "react-router";
import { useList } from "@/src/hooks/stateProvider";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { server } = useList();

  const clickHandler = async () => {
    try {
      const res = await fetch(`${server}/api/user/logout`);
      const response = await res.json();
      console.log(response);

      if (response.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
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
