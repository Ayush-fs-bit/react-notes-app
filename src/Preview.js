const Preview = ({noteSelected,onDelete,onEdit}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
  }
  function handleDelete(){
    onDelete();
  }
  function handleEdit(){
    onEdit();
  }
  return ( 
    <div className="preview">
      <button onClick={handleEdit}>edit</button>
      <h2>{noteSelected.title}</h2>
      <p>{noteSelected.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
 
export default Preview;