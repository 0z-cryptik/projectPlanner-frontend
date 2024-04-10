import { useNavigate } from "react-router";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    try {
      const res = await fetch("/api/user/logout");
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
        className="mt-2 text-sm text-orange-500">
        logout
      </button>
    </center>
  );
};
