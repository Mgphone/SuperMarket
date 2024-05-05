import { Link } from "react-router-dom";
import "../../styles/Notfound.css";
function Notfound() {
  return (
    <div className="notfound">
      <h1>404 Page Not Found</h1>
      <p>The path you are in is Not Valid </p>
      <button>
        <Link to="/">Go Back Home</Link>
      </button>
    </div>
  );
}

export default Notfound;
