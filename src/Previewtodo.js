import { ReactComponent as ArchiveIcon } from './svg/archive.svg';
import {ReactComponent as DeleteIcon} from './svg/delete.svg';
import {ReactComponent as EditIcon} from './svg/edit.svg';
import {ReactComponent as UnarchiveIcon} from './svg/unarchive.svg';

const Previewtodo = ({selectedTodo,onChecked,onEdit,onDelete,onArchive,onTagClick,onBack}) => {
  if (!selectedTodo) {
    return <div className="preview">Select A Todo</div>
  }


  function renderTags(tags) {
    if (!tags || tags.length === 0) return;
    return tags.map((t) => (<div className="preview-tags" key={t} onClick={(e) => {
      e.stopPropagation();
      onTagClick(t)
    }}>{t}</div>))
  }
  
  const unarchiveButton=<div className='previewbtn-flex'><UnarchiveIcon className="icon" /><p>Unarchive</p></div>;
  const archiveButton=<div className='previewbtn-flex'><ArchiveIcon className='icon'/><p>Archive</p></div>;

  return ( <div className="preview">
    <div className='mobile-preview-header'>
        <button className="desktop-hidden back-btn" onClick={onBack}>Back</button>
        <div className="preview-btns">
          <button onClick={onEdit}><div className='previewbtn-flex'><EditIcon className="icon" /><p>Edit</p></div></button>
          <button onClick={onArchive}>
            {selectedTodo.isArchived === true ?unarchiveButton:archiveButton}
          </button>
          <button onClick={onDelete}><div className='previewbtn-flex'><DeleteIcon className="icon" /><p>Delete</p></div></button></div>
    </div>

       <div className="note-info">
        <div className="left">
          <p>Category</p>
          <p>Created At</p>
          <p>Updated At</p>
          <p>Tags</p>
        </div>
        <div className="right">
          <p>{selectedTodo.category}</p>
          <p>{new Date(selectedTodo.createdAt).toLocaleDateString()}</p>
          <p>
            {selectedTodo.updatedAt? new Date(selectedTodo.updatedAt).toLocaleDateString(): "-"}
          </p>
          <div className="preview-tags-container">
                {renderTags(selectedTodo.tags)}
          </div>
        </div>
      </div>
  




    <div className="todo-checkbox-container">
      {selectedTodo.todos.map((o)=>{
        return <div key={o.id} className='preview-todo' onClick={()=>onChecked(o.id)}>
          <input type="checkbox" readOnly id={o.id}  checked={o.completed}/>
          <label htmlFor={o.id} onClick={()=>onChecked(o.id)}>{o.text}</label>
        </div>
      })}
    </div>
         
  </div> );
}
 
export default Previewtodo;