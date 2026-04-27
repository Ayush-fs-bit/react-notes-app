const Noteform = () => {
  return (
  <div className="note-form">
    <header>
      <h2>Add New Note</h2>
      <p>create a new note and get started</p>
    </header>
    <form>
      <label htmlFor="form-title">Title</label>
      <input type="text"  id="form-title" placeholder="Enter a note title..."/>
      <label htmlFor="form-categories">Category</label>
      <select id="form-categories">
        <option>work</option>
        <option>study</option>
        <option>personal</option>
        <option>idea</option>
        <option>other</option>
      </select>
      <label htmlFor="form-content">Content</label>
      <textarea id="form-content" placeholder="start writing your notes..."></textarea>
    </form>
    <button>Cancle</button>
    <button>Save</button>
  </div> );
}
 
export default Noteform;