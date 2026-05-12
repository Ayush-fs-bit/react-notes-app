import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AllIcon} from "./svg/all.svg";
import { ReactComponent as WorkIcon } from "./svg/work.svg";
import {ReactComponent as StudyIcon} from "./svg/study.svg";
import {ReactComponent as PersonalIcon} from "./svg/personal.svg";
import {ReactComponent as IdeaIcon} from "./svg/idea.svg";
import {ReactComponent as OtherIcon} from "./svg/other.svg"
import {ReactComponent as NoteIcon} from "./svg/note.svg"
import {ReactComponent as TodoIcon} from "./svg/todolist.svg"
import {ReactComponent as ArchiveIcon} from "./svg/archive.svg"
import {ReactComponent as SettingIcon} from "./svg/setting.svg"

const Sidebar = ({onSearch,input,onCategory,counts,total,activeCategory,onToggle}) => {

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
        <button className={activeCategory==="all"?"selected":""} onClick={()=>handleCategory('all')}><AllIcon className="icon" />All <span>{total||0}</span></button>
        <button className={activeCategory==="work"?"selected":""} onClick={()=>handleCategory('work')}><WorkIcon className="icon" />Work <span>{counts.work||0}</span></button>
        <button className={activeCategory==="study"?"selected":""} onClick={()=>handleCategory('study')}><StudyIcon className="icon" />Study <span>{counts.study||0}</span></button>
        <button className={activeCategory==="personal"?"selected":""} onClick={()=>handleCategory('personal')}><PersonalIcon className="icon" />Personal<span>{counts.personal||0}</span></button>
        <button className={activeCategory==="idea"?"selected":""} onClick={()=>handleCategory('idea')}><IdeaIcon className="icon" />Idea <span>{counts.idea||0}</span></button>
        <button className={activeCategory==="other"?"selected":""} onClick={()=>handleCategory('other')}><OtherIcon className="icon" />Other <span>{counts.other||0}</span></button>
      </div>
      <Link className={`nav-link ${location.pathname==="/"?'selected':""}`} to="/"><NoteIcon className="icon" /> Notes</Link>
      <Link className={`nav-link ${location.pathname==="/todo"?'selected':""}`} to="/todo" ><TodoIcon className="icon" /> To-do</Link>
      <Link className={`nav-link ${location.pathname==="/archive"?'selected':""}`} to="/archive" ><ArchiveIcon className="icon" /> Archive</Link>
    </div>
    <div className="bottom">
      <p><SettingIcon className="icon" />setting</p>
      <p onClick={onToggle}>Toggle theme</p>
    </div>
  </div> );
}
 
export default Sidebar;