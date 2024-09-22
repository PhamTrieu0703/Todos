import { useEffect, useRef, useState } from "react";
import { addTodosAPI, delTodosAPI, editTodosAPI, getTodosAPI } from "../../Services/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [textBtn,setTextBtn] = useState("them moi");
  const todoRef =useRef([]);

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
      await editTodosAPI({
        name:val,
        id:id
      });
    }else 
    //new
    await addTodosAPI({
      name:val,
    });
    window.location.reload();

    event.target[0].value ="";
    event.target[1].value = null;
    todoRef.current[id].className ="fas fa-edit";
    
  }
  const editTodo = (id) => {
    todoRef.current.forEach((item) => {
      if (item?.getAttribute("data-id") && item.getAttribute("data-id") !== String(id)) {
        item.className = "fas fa-edit";
      }
    });
  
    const inputName = document.getElementById("name");
    const inputId = document.getElementById("id");
  
    if (todoRef.current[id] && todoRef.current[id].className === "fas fa-edit") {
      todoRef.current[id].className = "fas fa-user-edit";
      setTextBtn("Cập nhật");
      inputName.value = todoRef.current[id].getAttribute("data-name");
      inputId.value = id;
    } else if (todoRef.current[id] && todoRef.current[id].className === "fas fa-user-edit") {
      todoRef.current[id].className = "fas fa-edit";
      inputName.value = "";
      inputId.value = null;
      setTextBtn("Thêm mới");
    }
  };
  
 
  const onIsCompleteTodo = async(todo)=>{
    await editTodosAPI({
      ...todo,
      isComplete:true
    });
    fetchData();
  }

  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
      {todos && todos.length > 0 ? (
        todos.map((item, key) => (
          <li key={key} className={item.isComplete ? "done" : ""} onDoubleClick={() => onIsCompleteTodo(item)}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button onClick={()=>editTodo(item.id)}
              className="btn-picto" 
              type="button">
                <i
                 className="fas fa-edit" 
                 ref={el => todoRef.current[item.id] = el}
                 data-name ={item.name}
                 data-id={item.id}

                 />
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
        <input type="text" name="id" id="id" style={{display:"none"}}/>
        <button type="submit">{textBtn}</button>
      </form>
    </main>
  );
};

export default Todos;
