import { useEffect, useState } from "react";

const Todoform = ({todoToEdit,onCancel,onUpdateTodo,onAddTodo}) => {
  const [category, setCategory] = useState('other');
  const [title, setTitle] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [todosInput, setTodosInput] = useState('');
  const [tags, setTags] = useState([]);
  const [todos, setTodos] = useState([]);




  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setCategory(todoToEdit.category);
      setTags(todoToEdit.tags)
      setTodos(todoToEdit.todos || []);
    }
  }, [todoToEdit]);


  function handleSubmit() {
    if (todoToEdit) {
      if (!title.trim()) return;
      onUpdateTodo({
        id: todoToEdit.id,
        title,
        todos:todos,
        category,
        isArchived: todoToEdit.isArchived,
        tags: tags
      })
    } else {
      if (!title.trim()) return;
      onAddTodo({
        id: Date.now(),
        title,
        todos:todos,
        category,
        isArchived: false,
        tags: tags
      })
      setTitle('');
      setTodos([]);
      setTags([]);
      setCategory('other');
    }
  }


  function handleCancel() {
    setTitle('');

    setCategory('other');
    onCancel && onCancel();
  }

  function handleTagAddition() {
    if (!tagsInput) return;

    setTags((prev) => [...prev, tagsInput]);
    setTagsInput('');
  }

  function handleTodosAddition() {
    if (!todosInput) return;

    setTodos((prev) => [...prev, {
      id: Date.now(),
      text:todosInput,
      completed: false
    }]);
    setTodosInput('');
  }

  function handleDeleteTodo(id){
    let remainingTodos=todos.filter((t)=>t.id !== id);
    setTodos(remainingTodos)
  }

  return (
    <div className="todo-form">
      <header className="todo-form-head">
        <h2>{todoToEdit ? "Edit TodoList" : "Add New Todo"}</h2>
        <p>{todoToEdit ? "update your Todo" : "create a new todo and get started"}</p>
      </header>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label htmlFor="todoFormTitle">Title</label>
        <input type="text" id="todoFormTitle" placeholder="Enter a Todo title..." value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="form-todos-container">
              <label htmlFor="todoInput">Tasks</label>
              <input type="text" placeholder="Add todos..." id="todoInput" value={todosInput} onChange={(e) => setTodosInput(e.target.value.trim())} />
              <button type="button" onClick={handleTodosAddition}>Add</button></div>
            <div className="added-todo">
              {todos.map((t) => {
                return <span className="form-todo" key={t.id}>{t.text}<button type="button" onClick={()=>handleDeleteTodo(t.id)}>delete</button></span>
              })}
            </div>
            

        <div className="form-partesian">
          <div className="left">
            <label htmlFor="formCategories">Category</label>
            <select id="formCategories" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option className="option" value={'other'}>other</option>
              <option className="option" value={'work'}>work</option>
              <option className="option" value={'study'}>study</option>
              <option className="option" value={'personal'}>personal</option>
              <option className="option" value={'idea'}>idea</option>

            </select>
          </div>
          <div className="right">
            <div className="form-tags-container">
              <label htmlFor="tagInput">Tags</label>
              <input type="text" placeholder="Add tag..." id="tagInput" value={tagsInput} onChange={(e) => setTagsInput(e.target.value.trim())} />
              <button type="button" onClick={handleTagAddition}>Add</button></div>
            <div className="added-tags">
              {tags.map((t) => {
                return <span className="form-tags" key={t}>{t}</span>
              })}
            </div>
          </div>
        </div>


        <div className="Todo-form-buttons">
          <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>

    </div>);
}

export default Todoform;