import EmptyState from "./EmptyState";

const Archivetodo = ({todos,onSelectTodo,onTagClick,selectedTodo,activeCategory,searchQuery}) => {

  if(todos.length===0 && searchQuery){
    return <EmptyState title={"No TodoList Found"} message={`no todolist found including "${searchQuery}" in title`}/>
  }

  if(todos.length===0 && activeCategory==="all"){
    return <EmptyState title={"No Archived TodoList Found"} message={"archive todolist are stored here"}/>
  }

  if(todos.length===0 && activeCategory !== "all"){
    return <EmptyState title={"No Archived TodoList Found"} message={`no archive todolist found with category "${activeCategory}"`}/>
  }
  

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t.id} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t.title}</div>))
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
 
export default Archivetodo;