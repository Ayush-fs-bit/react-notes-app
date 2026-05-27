const Todo = ({todoList,onSelect,onTagClick,selectedTodo}) => {

  if(todoList.length===0){
     return <div className="empty-state">
      <h3>No TodoList found</h3>
      <p>Start By Adding First TodoList</p>
    </div>
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t}</div>))
  }
  
  return (<div className="todo-container">
      {todoList.map((t) => {
        const totalTask = t.todos.length||0;
        const completedTask = t.todos.filter((task) => task.completed).length;
        return (
          <div className={`todo-card ${selectedTodo?.id===t.id?"selected":""}`} key={t.id} onClick={()=>onSelect(t.id)}>
            <p className="todo-title">{t.title}</p>
            <p className="todo-completed">{completedTask} / {totalTask}  Completed</p>
            <div className="tags-container">{renderTags(t.tags)}</div>
          </div>
        );
      })}
    </div>)
}
 
export default Todo;