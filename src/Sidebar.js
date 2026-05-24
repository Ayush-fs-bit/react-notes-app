import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AllIcon } from "./svg/all.svg";
import { ReactComponent as WorkIcon } from "./svg/work.svg";
import { ReactComponent as StudyIcon } from "./svg/study.svg";
import { ReactComponent as PersonalIcon } from "./svg/personal.svg";
import { ReactComponent as IdeaIcon } from "./svg/idea.svg";
import { ReactComponent as OtherIcon } from "./svg/other.svg"
import { ReactComponent as NoteIcon } from "./svg/note.svg"
import { ReactComponent as TodoIcon } from "./svg/todolist.svg"
import { ReactComponent as ArchiveIcon } from "./svg/archive.svg"
import { ReactComponent as SettingIcon } from "./svg/setting.svg"

const Sidebar = ({ onSearch, input, onCategory, counts, total, activeCategory, onToggle, className, onNav }) => {

  const location = useLocation();
  function handleCategory(category) {
    onCategory(category);
  }





  return (<div className={className}>
    <div className="top">
      <div className="logo">LOGO</div>
      <input type="text" className="sidebar-search" placeholder="search notes/todos..." onChange={onSearch} value={input} />
      <div className="sidebar-categories">
        <p>Categories</p>
        <button className={activeCategory === "all" ? "selected" : ""} onClick={() => handleCategory('all')}>
          <div className="category-left">
            <AllIcon className="icon" />
            <span>All</span>
          </div>
          <span>{total || 0}</span>
        </button>
        <button className={activeCategory === "work" ? "selected" : ""} onClick={() => handleCategory('work')}>
          <div className="category-left">
            <WorkIcon className="icon" />
            <span>Work</span>
          </div>
          <span>{counts.work || 0}</span>
        </button>
        <button className={activeCategory === "study" ? "selected" : ""} onClick={() => handleCategory('study')}>
          <div className="category-left">
            <StudyIcon className="icon" />
            <span>Study</span>
          </div> 
          <span>{counts.study || 0}</span>
        </button>
        <button className={activeCategory === "personal" ? "selected" : ""} onClick={() => handleCategory('personal')}>
          <div className="category-left">
            <PersonalIcon className="icon" />
            <span>Personal</span>
          </div>
          <span>{counts.personal || 0}</span>
        </button>
        <button className={activeCategory === "idea" ? "selected" : ""} onClick={() => handleCategory('idea')}>
          <div className="category-left">
            <IdeaIcon className="icon" />
            <span>Idea</span>
          </div>
          <span>{counts.idea || 0}</span>
        </button>
        <button className={activeCategory === "other" ? "selected" : ""} onClick={() => handleCategory('other')}>
          <div className="category-left">
            <OtherIcon className="icon" />
            <span>Other</span>
          </div>
           <span>{counts.other || 0}</span>
        </button>
      </div>
      <Link onClick={onNav} className={`nav-link ${location.pathname === "/" ? 'selected' : ""}`} to="/"><NoteIcon className="icon" /> Notes</Link>
      <Link onClick={onNav} className={`nav-link ${location.pathname === "/todo" ? 'selected' : ""}`} to="/todo" ><TodoIcon className="icon" /> To-do</Link>
      <Link onClick={onNav} className={`nav-link ${location.pathname === "/archive" ? 'selected' : ""}`} to="/archive" ><ArchiveIcon className="icon" /> Archive Notes</Link>
      <Link onClick={onNav} className={`nav-link ${location.pathname === "/archivetodo" ? 'selected' : ""}`} to="/archivetodo" ><ArchiveIcon className="icon" /> Archive Todos</Link>

    </div>
    <div className="bottom">
      <p><SettingIcon className="icon" />setting</p>
      <p onClick={onToggle}>Toggle theme</p>
    </div>
  </div>);
}

export default Sidebar;