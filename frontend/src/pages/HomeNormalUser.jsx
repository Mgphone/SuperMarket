import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";

function HomeNormalUser() {
  const { decodedToken } = useAuth();
  return (
    <div>
      <Nav />
      Home {decodedToken && decodedToken.role}
    </div>
  );
}

export default HomeNormalUser;
