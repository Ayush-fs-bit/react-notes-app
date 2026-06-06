import EmptyState from "./EmptyState";

const Todo = ({todoList,onSelect,onTagClick,selectedTodo,activeCategory,searchQuery}) => {

  if (todoList.length === 0) {
    let message = "No todolists found";
    if (searchQuery && activeCategory !== "all") {
      message = `No todolist matching "${searchQuery}" in category "${activeCategory}"`;
    } else if (searchQuery) {
      message = `No todolist matching "${searchQuery}"`;
    } else if (activeCategory !== "all") {
      message = `No todolist in category "${activeCategory}"`;
    } else {
      message = "Start by adding your first todolist";
    }
    return <EmptyState title="No TodoList Found" message={message} />;
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t.id} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t.title}</div>))
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