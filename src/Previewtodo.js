const Previewtodo = ({selectedTodo,onChecked}) => {
  
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
  </div> );
}
 
export default Previewtodo;