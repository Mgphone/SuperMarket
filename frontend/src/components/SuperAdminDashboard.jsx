import { useAuth } from "../contexts/AuthContext";

function SuperAdminDashboard() {
  const { token } = useAuth();

  return (
    <div>
      SuperAdminDashboard
      {token.replace("Bearer", "")}
    </div>
  );
}

export default SuperAdminDashboard;
