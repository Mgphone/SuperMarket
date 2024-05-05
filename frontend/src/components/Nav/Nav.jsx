import { useEffect } from "react";
import "../../styles/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

function Nav() {
  const navigate = useNavigate();
  const { token, logOut, setDecodedToken, decodedToken } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const tokenValue = token ? jwtDecode(token) : null;
      setDecodedToken(tokenValue);
    }
  }, [token, navigate, setDecodedToken]);
  return (
    <header>
      <div className="logo">
        {decodedToken && (
          <Link
            to={`/${
              decodedToken.role === "super_user"
                ? "homesuper"
                : decodedToken.role === "branch_manager"
                ? "homebranch"
                : "homenormal"
            }`}
          >
            <h1>Money Exchange</h1>
          </Link>
        )}
      </div>
      <nav>
        <ul>
          {decodedToken && decodedToken.role == "super_user" && (
            <>
              <li>{decodedToken.username}</li>
              <li>Aera Manager</li>
            </>
          )}
          {decodedToken && decodedToken.role == "branch_manager" && (
            <>
              <li>{decodedToken.username}</li>
              <li>Branch Manager</li>
            </>
          )}
          {decodedToken && decodedToken.role == "branch_seller" && (
            <>
              <li>{decodedToken.username}</li>
              <li>{decodedToken.role == "branch_seller" ? "Sales" : ""}</li>
            </>
          )}

          <li>
            <Link to="/" onClick={logOut}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
