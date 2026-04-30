const Preview = ({noteSelected,onDelete,onEdit,onArchive}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
  }
  function handleDelete(){
    onDelete();
  }
  function handleEdit(){
    onEdit();
  }
  function handleArchive(){
    onArchive();
  }
  return ( 
    <div className="preview">
      <button onClick={handleEdit}>edit</button>
      <button onClick={handleArchive}>Archive</button>
      <button onClick={handleDelete}>Delete</button>
      <h2>{noteSelected.title}</h2>
      <p>{noteSelected.content}</p>
      
    </div>
  );
}
 
export default Preview;