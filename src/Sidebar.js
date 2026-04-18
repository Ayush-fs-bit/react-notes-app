import { Link } from "react-router-dom";

const Sidebar = () => {
  return ( <div className="views">
    <Link to="/">Home</Link>
    <Link to="/archive">Archive</Link>
  </div> );
}
 
export default Sidebar;