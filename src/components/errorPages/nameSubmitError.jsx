export const NameSubmitError = () => {
  return (
    <p className="w-1/2">
      An error occured while trying submit your name. Please go to the
      <a
        href="/login"
        className="text-blue-500 underline">
        login page
      </a>
      and login with the credentials you submitted earlier, you can edit
      your profile and submit your name after.
    </p>
  );
};
