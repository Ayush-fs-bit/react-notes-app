import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AllIcon } from "./svg/all.svg";
import { ReactComponent as WorkIcon } from "./svg/work.svg";
import { ReactComponent as StudyIcon } from "./svg/study.svg";
import { ReactComponent as PersonalIcon } from "./svg/personal.svg";
import { ReactComponent as IdeaIcon } from "./svg/idea.svg";
import { ReactComponent as OtherIcon } from "./svg/other.svg";
import { ReactComponent as NoteIcon } from "./svg/note.svg";
import { ReactComponent as TodoIcon } from "./svg/todolist.svg";
import { ReactComponent as ArchiveIcon } from "./svg/archive.svg";
import { ReactComponent as SettingIcon } from "./svg/setting.svg";
import { ReactComponent as LightIcon} from "./svg/light.svg";
import { ReactComponent as DarkIcon} from "./svg/dark.svg";


const Sidebar = ({ onSearch, input, onCategory, counts, total, activeCategory, onToggle, className, onNav,activeTheme }) => {

  const location = useLocation();
  const isNotesPage=location.pathname==="/";
  const isNotesArchivePage=location.pathname==="/archive";

  const categories=[
    {key:"all",label:"All",icon:AllIcon,counts:total||0},
    {key:"work",label:"Work",icon:WorkIcon,counts:counts.work||0},
    {key:"study",label:"Study",icon:StudyIcon,counts:counts.study||0},
    {key:"personal",label:"Personal",icon:PersonalIcon,counts:counts.personal||0},
    {key:"idea",label:"Idea",icon:IdeaIcon,counts:counts.idea||0},
    {key:"other",label:"Other",icon:OtherIcon,counts:counts.other||0}
  ];

  const navLinks=[
    {key:"notes",label:"Notes",icon:NoteIcon,path:"/"},
    {key:"todolist",label:"Todo List",icon:TodoIcon,path:"/todo"},
    {key:"archivenotes",label:"Archive Notes",icon:ArchiveIcon,path:"/archive"},
    {key:"archivetodos",label:"Archive Todos",icon:ArchiveIcon,path:"/archivetodo"}
  ];

  return (<div className={className}>
    <div className="top">
      <div className="logo"><h2>NoteFlow</h2></div>
      <input type="text" className="sidebar-search" placeholder={(isNotesPage||isNotesArchivePage)?"search notes...":"search todolist..."} onChange={onSearch} value={input} />
      <div className="sidebar-categories">
        <p>Categories</p>
        {categories.map((category)=>{
          return <button key={category.key} className={activeCategory === category.key ? "selected" : ""} onClick={() => onCategory(category.key)}>
             <div className="category-left"> <category.icon className="icon" /> <span>{category.label}</span> </div> 
             <span>{category.counts}</span> 
          </button>
        })}
      </div>
      {navLinks.map((link)=> {
        return <Link key={link.key} onClick={onNav} className={`nav-link ${location.pathname === link.path ? 'selected' : ""}`} to={link.path}><link.icon className="icon" />{link.label}</Link>
      })}

    </div>
    <div className="bottom">
      <p><SettingIcon className="icon" />setting</p>
      <p onClick={onToggle}>{activeTheme==="dark"?<LightIcon />:<DarkIcon />}{activeTheme==="dark"?"Light Theme":"Dark Theme"}</p>
    </div>
  </div>);
}

export default Sidebar;