const Todo = ({todoList,onSelect,onTagClick,selectedTodo}) => {

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t} onClick={(e)=>{e.stopPropagation();
      handleTagClick(t)}}>{t}</div>))
  }
  function handleTagClick(selectedTag){
    onTagClick(selectedTag);
  }
  return (<div className="todo-container">
      {todoList.map((t) => {
        const totalTask = t.todos.length;
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