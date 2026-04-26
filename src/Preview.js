const Preview = ({noteSelected}) => {
  if(!noteSelected){
    return <div className="preview">Select A Note</div>
  }
  return ( 
    <div className="preview">
      <h2>{noteSelected.title}</h2>
      <p>{noteSelected.content}</p>
    </div>
  );
}
 
export default Preview;