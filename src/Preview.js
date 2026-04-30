const Preview = ({noteSelected,onDelete,onEdit,onArchive}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
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
      
    </div>
  );
}
 
export default Preview;