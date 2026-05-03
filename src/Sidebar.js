import { Link, useLocation } from "react-router-dom";

const Sidebar = ({onSearch,input,onCategory,counts,total,activeCategory}) => {

  const location=useLocation();
  function handleCategory(category){
    onCategory(category);
  }

  return ( <div className="sidebar">
    <div className="top">
      <div className="logo">LOGO</div>
      <input type="text" placeholder="search notes..." onChange={onSearch} value={input} />
      <div className="sidebar-categories">
        <p>Categories</p>
        <button className={activeCategory==="all"?"selected":""} onClick={()=>handleCategory('all')}>All <span>{total||0}</span></button>
        <button className={activeCategory==="work"?"selected":""} onClick={()=>handleCategory('work')}>Work <span>{counts.work||0}</span></button>
        <button className={activeCategory==="study"?"selected":""} onClick={()=>handleCategory('study')}>Study <span>{counts.study||0}</span></button>
        <button className={activeCategory==="personal"?"selected":""} onClick={()=>handleCategory('personal')}>Personal<span>{counts.personal||0}</span></button>
        <button className={activeCategory==="idea"?"selected":""} onClick={()=>handleCategory('idea')}>Idea <span>{counts.idea||0}</span></button>
        <button className={activeCategory==="other"?"selected":""} onClick={()=>handleCategory('other')}>Other <span>{counts.other||0}</span></button>
      </div>
      <Link className={`nav-link ${location.pathname==="/"?'selected':""}`} to="/">Notes</Link>
      <p className="nav-link">To-do</p>
      
      <Link className={`nav-link ${location.pathname==="/archive"?'selected':""}`} to="/archive" >Archive</Link>
    </div>
    <div className="bottom">
      <p>setting</p>
      <p>Toggle theme</p>
    </div>
  </div> );
}
 
export default Sidebar;