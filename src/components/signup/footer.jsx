import { useNavigate } from "react-router-dom";

export const Footer = ({ error, errorMsg }) => {
  const navigate = useNavigate();

  return (
    <>
      <p className="text-sm mt-5">
        Already have an account?{" "}
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-[#483ec3] lg:text-[#7a82e0]">
          Login
        </button>
      </p>
      {error && errorMsg && <p>{errorMsg}</p>}
      {error && (
        <p>unexpected error, please refresh the page and try again</p>
      )}
    </>
  );
};
