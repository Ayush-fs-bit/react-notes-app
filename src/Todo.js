import EmptyState from "./EmptyState";

const Todo = ({todoList,onSelect,onTagClick,selectedTodo,activeCategory,searchQuery}) => {

  if(todoList.length===0 && searchQuery){
    return <EmptyState title={"No TodoList Found"} message={`no todolist found including "${searchQuery}" in title`}/>
  }

  if(todoList.length===0 && activeCategory==="all"){
    return <EmptyState title={"No TodoList Found"} message={"start by adding a first todolist"}/>
  }

  if(todoList.length===0 && activeCategory !== "all"){
    return <EmptyState title={"No TodoList Found"} message={`no todolist found with category "${activeCategory}"`}/>
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