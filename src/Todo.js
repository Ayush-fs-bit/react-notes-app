const Todo = ({todoList,onSelect}) => {
  return (<div className="todo-container">
      {todoList.map((t) => {
        const totalTask = t.todos.length;
        const completedTask = t.todos.filter((task) => task.completed).length;
        return (
          <div className="todo-card" key={t.id} onClick={()=>onSelect(t.id)}>
            <p>{t.title}</p>
            <p>{completedTask} / {totalTask}  Completed</p>
          </div>
        );
      })}
    </div>)
}
 
export default Todo;