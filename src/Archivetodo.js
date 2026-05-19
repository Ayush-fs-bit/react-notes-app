const Archivepage = ({todos,onSelectTodo,onTagClick,selectedTodo}) => {
  if(todos.length===0){
    return <div className="empty-state">
      <h3>No Archived Todos Found</h3>
      <p>Archived Todos are stored here</p>
    </div>
  }
  function handleTagClick(selectedTag){
    onTagClick(selectedTag)
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t} onClick={(e)=>{e.stopPropagation();
      handleTagClick(t)}}>{t}</div>))
  }
  
  

  return (<div className="archived-todos-container">
     {todos.map((todo) =>{
      const totalTask = todo.todos.length;
      const completedTask = todo.todos.filter((task) => task.completed).length;
      return <div className={`todo-card ${selectedTodo?.id===todo.id?"selected":""}`}  onClick={()=>onSelectTodo(todo.id)} key={todo.id}>
        <p className="todo-title">{todo.title}</p>
        <p className="todo-completed">{completedTask} / {totalTask}  Completed</p>
        <div className="tags-container">{renderTags(todo.tags)}</div>
      </div>
  })
    }
  </div>  );
}
 
export default Archivepage;