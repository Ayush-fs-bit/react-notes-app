const Preview = ({noteSelected,onDelete,onEdit,onArchive}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
  }
  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div key={t}>#{t}</div>))
  }
  return ( 
    <div className="preview">
      <button onClick={onEdit}>edit</button>
      <button onClick={onArchive}>
        {noteSelected.isArchived===true?"Unarchive":"Archive"}
      </button>
      <button onClick={onDelete}>Delete</button>
      <h2>{noteSelected.title}</h2>
      <p>{noteSelected.content}</p>
      <div><p>Tags</p>
        <div className="preview-tags">
          {renderTags(noteSelected.tags)}
        </div>
      </div>
    </div>
  );
}
 
export default Preview;