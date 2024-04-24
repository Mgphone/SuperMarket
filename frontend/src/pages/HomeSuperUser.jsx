import { useAuth } from "../contexts/AuthContext";
function HomeSuperUser() {
  const { token } = useAuth();
  return (
    <div>
      HomeSuperUser
      <p>This is your token:</p>
      {token}
    </div>
  );
}

export default HomeSuperUser;
