import { useEffect, useState } from "react";
import { addTodosAPI, delTodosAPI, getTodosAPI } from "../../Services/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTodosAPI();
    // Kiểm tra nếu API trả về undefined hoặc không phải là mảng
    setTodos(Array.isArray(data) ? data : []);
  };
  const delTodo = async (id) =>{
    if(window.confirm("Nhiem vu khong the khoi phuc, ban co muon xoa hay khong??")){
      await delTodosAPI(id);
      window.location.reload();
    }
  }
  
  const AddOrEditTodo = async (event)=>{
    event.preventDefault();
    const val = event.target[0].value;
    const id = event.target[1].value;
    console.log({val,id});
    if(id){
      //update
    }else 
    //new
    await addTodosAPI({
      name:val
    });
  }

  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
      {todos && todos.length > 0 ? (
        todos.map((item, key) => (
          <li key={key} className={item.isComplete ? "done" : ""}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button className="btn-picto" type="button">
                <i className="fas fa-edit" />
              </button>
              <button
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
                onClick={()=>delTodo(item.id)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Danh sách nhiệm vụ trống.</p>
      )}
      <form onSubmit={AddOrEditTodo}>
        <label>Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="id" />
        <button type="submit">Thêm mới</button>
      </form>
    </main>
  );
};

export default Todos;
