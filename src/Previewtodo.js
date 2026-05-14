const Previewtodo = ({selectedTodo,onChecked,onEdit}) => {
  
  return ( <div>
    <p>{selectedTodo.title}</p>
    <div className="todo-checkbox-container">
      {selectedTodo.todos.map((o)=>{
        return <div>
          <input type="checkbox" id={o.id} onChange={()=>onChecked(o.id)} checked={o.completed}/>
          <label htmlFor={o.id}>{o.text}</label>
        </div>
      })}
    </div>

    <button onClick={onEdit}>Edit</button>
         
  </div> );
}
 
export default Previewtodo;