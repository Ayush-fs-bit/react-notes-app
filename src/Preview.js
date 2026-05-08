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

  return (
    <div className="preview">
      <div className="preview-header">
        <h1>{noteSelected.title}</h1>
        <div className="preview-btns">
          <button onClick={onEdit}>edit</button>
          <button onClick={onArchive}>
            {noteSelected.isArchived === true ? "Unarchive" : "Archive"}
          </button>
          <button onClick={onDelete}>Delete</button></div>
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