import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";
function HomeSuperUser() {
  const { decodedToken } = useAuth();
  // let decode;
  // if (token) {
  //   decode = jwtDecode(token);
  // }
  return (
    <>
      <Nav />
      Home {decodedToken && decodedToken.role}
    </>
  );
}

export default HomeSuperUser;
