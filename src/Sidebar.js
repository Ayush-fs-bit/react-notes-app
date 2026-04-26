import { Link } from "react-router-dom";

const Sidebar = () => {
  return ( <div className="sidebar">
    <div className="top">
      <div className="logo">LOGO</div>
      <Link className="nav-link" to="/">Notes</Link>
      <p>To-do</p>
      <p>Categories</p>
      <Link className="nav-link" to="/archive">Archive</Link>
    </div>
    <div className="bottom">
      <p>setting</p>
      <p>Toggle theme</p>
    </div>
  </div> );
}
 
export default Sidebar;