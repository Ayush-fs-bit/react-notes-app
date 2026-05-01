import { Link } from "react-router-dom";

const Sidebar = ({onSearch,input,onCategory,counts,total}) => {

  function handleCategory(category){
    onCategory(category);
  }

  return ( <div className="sidebar">
    <div className="top">
      <div className="logo">LOGO</div>
      <input type="text" placeholder="search notes..." onChange={onSearch} value={input} />
      <div className="sidebar-categories">
        <p>Categories</p>
        <button onClick={()=>handleCategory('all')}>All {total||0}</button>
        <button onClick={()=>handleCategory('work')}>Work {counts.work||0}</button>
        <button onClick={()=>handleCategory('study')}>Study {counts.study||0}</button>
        <button onClick={()=>handleCategory('personal')}>Personal {counts.personal||0}</button>
        <button onClick={()=>handleCategory('idea')}>Idea {counts.idea||0}</button>
        <button onClick={()=>handleCategory('other')}>Other {counts.other||0}</button>
      </div>
      
      <Link className="nav-link" to="/">Notes</Link>
      <p>To-do</p>
      
      <Link className="nav-link" to="/archive">Archive</Link>
    </div>
    <div className="bottom">
      <p>setting</p>
      <p>Toggle theme</p>
    </div>
  </div> );
}
 
export default Sidebar;