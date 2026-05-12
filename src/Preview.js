import { ReactComponent as ArchiveIcon } from './svg/archive.svg';
import {ReactComponent as DeleteIcon} from './svg/delete.svg';
import {ReactComponent as EditIcon} from './svg/edit.svg';
import {ReactComponent as UnarchiveIcon} from './svg/unarchive.svg';

const Preview = ({ noteSelected, onDelete, onEdit, onArchive, onTagClick }) => {
  if (!noteSelected) {
    return <div className="preview">Select A Note</div>
  }
  function handleTagClick(selectedTag) {
    onTagClick(selectedTag)
  }

  function renderTags(tags) {
    if (!tags || tags.length === 0) return;
    return tags.map((t) => (<div className="preview-tags" key={t} onClick={(e) => {
      e.stopPropagation();
      handleTagClick(t)
    }}>{t}</div>))
  }

  const unarchive=<div className='previewbtn-flex'><UnarchiveIcon className="icon" /><p>Unarchive</p></div>;
  const archive=<div className='previewbtn-flex'><ArchiveIcon className='icon'/><p>Archive</p></div>;


  return (
    <div className="preview">
      <div className="preview-header">
        <h1 className="preview-title">{noteSelected.title}</h1>
        <div className="preview-btns">
          <button onClick={onEdit}><div className='previewbtn-flex'><EditIcon className="icon" /><p>Edit</p></div></button>
          <button onClick={onArchive}>
            {noteSelected.isArchived === true ?unarchive:archive}
          </button>
          <button onClick={onDelete}><div className='previewbtn-flex'><DeleteIcon className="icon" /><p>Delete</p></div></button></div>
      </div>

      <div className="note-info">
        <div className="left">
          <p>Category</p>
          <p>Last Modiefied</p>
          <p>Tags</p>
        </div>
        <div className="right">
          <p>{noteSelected.category}</p>
          <p>Date</p>
          <div className="preview-tags-container">
                {renderTags(noteSelected.tags)}
          </div>
        </div>
      </div>


      <p className="preview-content">{noteSelected.content}</p>

    </div>
  );
}

export default Preview;