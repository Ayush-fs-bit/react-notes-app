
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import Preview from './Preview';
import Archivepage from './Archivepage';
import Noteform from './Noteform';
import Todo from './Todo'
import Previewtodo from './Previewtodo';
import Todoform from './Todoform'
import Archivetodo from './Archivetodo'
import { Routes, Route, useLocation } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { ReactComponent as AddIcon } from './svg/add.svg'




function App() {


  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  })

  const [todoLists, setTodoLists] = useState(() => {
    const saved = localStorage.getItem('todoLists');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "College Tasks",
        todos: [
          {
            id: 101,
            text: "Complete assignment",
            completed: false
          },
          {
            id: 102,
            text: "Study DSA",
            completed: true
          }
        ]
      },

      {
        id: 2,
        title: "Shopping",
        todos: [
          {
            id: 201,
            text: "Buy milk",
            completed: false
          }
        ]
      }
    ]
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeTheme, setActiveTheme] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme ? JSON.parse(theme) : "light";
  });
  const location = useLocation();
  const selectedTodo = todoLists.find((t) => t.id === selectedTodoId);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(activeTheme));
  }, [activeTheme]);

  useEffect(() => {
    if (location.pathname !== "/todo") {
      setSelectedTodoId(null);
    }
    if (location.pathname === "/todo") {
      setSelectedNote(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  const baseFilteredNotes = notes.filter((n) => {
    const searchFilter = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());

    const tagFilter = selectedTag === "all" || n.tags?.includes(selectedTag);

    return searchFilter && tagFilter;
  });


  const filteredNotes = baseFilteredNotes.filter((n) => {
    const categoryFilter = activeCategory === 'all' || n.category === activeCategory;
    return categoryFilter;
  })

  const homeNotes = filteredNotes.filter((n) => !n.isArchived);
  const archivedNotes = filteredNotes.filter((n) => n.isArchived);

  const homeNotesCategoryCount = baseFilteredNotes.filter((n) => !n.isArchived).reduce((acc, note) => {
    const cat = note.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {})

  const archiveNotesCategoryCount = baseFilteredNotes.filter((n) => n.isArchived).reduce((acc, note) => {
    const cat = note.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {})


  const totalArchiveNotes =  baseFilteredNotes.filter((n) => n.isArchived).length;
  const totalHomeNotes =   baseFilteredNotes.filter((n) => !n.isArchived).length;


  const baseFilteredTodos = todoLists.filter((t) => {
    const searchFilter = t.title.toLowerCase().includes(searchQuery.toLowerCase());

    const tagFilter = selectedTag === "all" || t.tags?.includes(selectedTag);

    return searchFilter && tagFilter;
  });

  const filteredTodos = baseFilteredTodos.filter((t) => {
    const categoryFilter = activeCategory === 'all' || t.category === activeCategory;
    return categoryFilter;
  })

  const homeTodos = filteredTodos.filter((t) => !t.isArchived);
  const archivedTodos = filteredTodos.filter((t) => t.isArchived);

  const homeTodosCategoryCount = baseFilteredTodos.filter((t) => !t.isArchived).reduce((acc, todo) => {
    const cat = todo.category || 'other'
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {})

  const archiveTodosCategoryCount = baseFilteredTodos.filter((t) => t.isArchived).reduce((acc, todo) => {
    const cat = todo.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {})

  const countsToShow = location.pathname === "/archive" || location.pathname === "/" ? location.pathname === "/archive" ? archiveNotesCategoryCount : homeNotesCategoryCount : location.pathname === "/archivetodo" ? archiveTodosCategoryCount : homeTodosCategoryCount;

  const totalArchiveTodos = baseFilteredTodos.filter((t) => t.isArchived).length;
  const totalHomeTodos = baseFilteredTodos.filter((t) => !t.isArchived).length;

  const totalCount = location.pathname === "/archive" || location.pathname === "/" ? location.pathname === "/archive" ? totalArchiveNotes : totalHomeNotes : location.pathname === "/archivetodo" ? totalArchiveTodos : totalHomeTodos;

  function handleSelectNote(id) {
    let note = notes.find((n) => n.id === id);
    setSelectedNote(note);
    setIsAdding(false);
    setIsEditing(false);
    setSelectedTodoId(null);
  }

  function handleAddClick() {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedNote(null);
  }

  function handleChangeSearch(e) {
    const value = e.target.value;
    setSearchQuery(value);
  }

  function handleAddingNote(newNote) {
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNote(newNote);
    setIsAdding(false);
    setIsEditing(false);
  }

  function handleAddingTodo(newTodo) {
    setTodoLists((prev) => [newTodo, ...prev]);
    setSelectedTodoId(newTodo.id);
    setIsAdding(false);
    setIsEditing(false);
  }

  function handleDeletingNote() {
    if (!selectedNote) return;
    if (!window.confirm("Delete This Note")) return;
    const remainingNotes = notes.filter((n) => n.id !== selectedNote.id);
    setNotes(remainingNotes);
    setSelectedNote(null);
  }

  function handleDeletingTodo() {
    if (!selectedTodoId) return;
    if (!window.confirm("Delete This Todo")) return;
    const remainingTodos = todoLists.filter((t) => t.id !== selectedTodoId);
    setTodoLists(remainingTodos);
    setSelectedTodoId(null);

  }

  function handleEditing() {
    setIsEditing(true);
    setIsAdding(false);
  }

  function handleUpdatedNote(updatedNote) {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    )
    setSelectedNote(updatedNote);
    setIsEditing(false);
  }

  function handleUpdatedTodo(updatedTodo) {
    setTodoLists((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    )
    setSelectedTodoId(updatedTodo.id);
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleCategoryChange(category) {
    setActiveCategory(category);

  }

  function handleArchiveNote() {
    setNotes((prev) =>
      prev.map((n) => (
        n.id === selectedNote.id
          ? { ...n, isArchived: !n.isArchived }
          : n
      ))
    )
    setSelectedNote(null);
  }

  function handleArchiveTodo() {
    setTodoLists((prev) =>
      prev.map((t) => (
        t.id === selectedTodo.id
          ? { ...t, isArchived: !t.isArchived }
          : t
      ))
    )
    setSelectedTodoId(null);
  }



  function handleSelectedTag(tag) {
    setSelectedTag(tag);
    setSearchQuery('');
    setActiveCategory('all');
  }

  function handleClearTags() {
    setSelectedTag('all');
    setSearchQuery('');
    setActiveCategory('all')
  }
  function handleToggleTheme() {
    setActiveTheme(prev => prev === "light" ? "dark" : "light")
  }

  function handleSelectedTodo(id) {
    let todo = todoLists.find((t) => t.id === id);
    setSelectedTodoId(todo.id);
    setIsAdding(false);
    setIsEditing(false);
    setSelectedNote(null);
  }

  function handleCheckToogle(id) {
    setTodoLists((prev) => {
      return prev.map((list) => (
        {
          ...list, todos: list.todos.map((todo) => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ))
        }
      ))
    })
  }

  return (
    <div id="App" className={activeTheme === 'dark' ? 'dark' : ""}>

      
      <Sidebar onSearch={handleChangeSearch} input={searchQuery} onCategory={handleCategoryChange} counts={countsToShow} total={totalCount} activeCategory={activeCategory} onToggle={handleToggleTheme} />




      <div className="main">
        <div className="main-header">
          <h2 className="main-heading">
            {location.pathname === "/" ? "My Notes" : location.pathname === "/archive" ? (location.pathname === "/archivetodo"
              ? "Archived Todos"
              : "Todo Lists") : "Todo List"}
          </h2>
          <button onClick={handleAddClick} className='add-note-btn'><AddIcon className="icon" /> {(location.pathname === '/todo'||location.pathname==='/archivetodo' )? "Add Todo" : "Add New Note"}</button>
          {selectedTag !== 'all' && <div className='tag-filter-msg'>
            <p>Filtered By Tag "{selectedTag}"</p><button onClick={handleClearTags}>clear</button>
          </div>}
        </div>
        <Routes>
          <Route path="/" element={<Homepage notes={homeNotes} onSelectNote={handleSelectNote} onTagClick={handleSelectedTag} selectedNote={selectedNote} />} />
          <Route path="/archive" element={<Archivepage notes={archivedNotes} onSelectNote={handleSelectNote} onTagClick={handleSelectedTag} selectedNote={selectedNote} />} />
          <Route path="/archivetodo" element={<Archivetodo todos={archivedTodos} onSelectTodo={handleSelectedTodo} onTagClick={handleSelectedTag} selectedTodo={selectedTodo} />} />
          <Route path="/todo" element={<Todo todoList={homeTodos} onSelect={handleSelectedTodo} onTagClick={handleSelectedTag} selectedTodo={selectedTodo}/>} />
        </Routes>
      </div>



      <div className='right'>
        {isAdding && (location.pathname === "/" || location.pathname === "/archive") && <Noteform onAddNote={handleAddingNote} />}
        {isEditing && (location.pathname === "/" || location.pathname === "/archive") && <Noteform onUpdateNote={handleUpdatedNote} noteToEdit={selectedNote} onCancel={handleCancelEdit} />}
        {!selectedNote && !isAdding && !selectedTodo && <div className='preview-emptystate'>
          <h2>Select A Note</h2>
          <p>Choose a note from the list to preview,edit,archive,delete its content.</p>
        </div>}
        {!isEditing && selectedNote && <Preview noteSelected={selectedNote} onDelete={handleDeletingNote} onEdit={handleEditing} onArchive={handleArchiveNote} onTagClick={handleSelectedTag} />}
        {isAdding && location.pathname === "/todo" && <Todoform onAddTodo={handleAddingTodo} />}
        {isEditing && location.pathname === "/todo" && <Todoform todoToEdit={selectedTodo} onCancel={handleCancelEdit} onUpdateTodo={handleUpdatedTodo} />}
        {!isEditing && selectedTodo && !isAdding && <Previewtodo selectedTodo={selectedTodo} onChecked={handleCheckToogle} onDelete={handleDeletingTodo} onEdit={handleEditing} onArchive={handleArchiveTodo} onTagClick={handleSelectedTag}/>}
      </div>
    </div>

  );
}

export default App;
