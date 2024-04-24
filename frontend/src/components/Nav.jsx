import React, { useEffect } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";

function Nav() {
  const navigate = useNavigate();
  const { token, logOut } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  const tokenValue = token ? jwtDecode(token) : null;
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <h1>Money Exchange</h1>
        </Link>
      </div>
      <nav>
        <ul>
          {tokenValue && tokenValue.role == "super_user" && (
            <>
              <li>{tokenValue.username}</li>
              <li>Aera Manager</li>
              <li>
                <Link>Admin Dashboard</Link>
              </li>
            </>
          )}
          {tokenValue && tokenValue.role == "branch_manager" && (
            <>
              <li>{tokenValue.username}</li>
              <li>Branch Manager</li>
              <li>Register Branch Seller</li>
            </>
          )}
          {tokenValue && tokenValue.role == "branch_seller" && (
            <>
              <li>{tokenValue.username}</li>
              <li>{tokenValue.role}</li>
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
