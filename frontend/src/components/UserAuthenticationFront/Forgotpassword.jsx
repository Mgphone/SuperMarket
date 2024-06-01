import { Link } from "react-router-dom";
function forgotpassword() {
  return (
    <div className="notfound">
      <h1>Forgot Passsword??</h1>
      <p>
        No problem! We can help you reset your password. Depending on your role,
        please follow these instructions:
      </p>
      Branch Manager: Contact Area Manager. Seller Staff: Contact Branch
      Manager.
      <p>They will be able to guide you through the password reset process.</p>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

export default forgotpassword;
