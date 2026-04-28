const Preview = ({noteSelected,onDelete}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
  }
  function handleDelete(){
    onDelete();
  }
  return ( 
    <div className="preview">
      <h2>{noteSelected.title}</h2>
      <p>{noteSelected.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
 
export default Preview;