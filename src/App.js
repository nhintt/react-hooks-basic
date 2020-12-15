import {useState} from 'react';
import TodoList from './components/TodoList';

function App () {
  const [todoList, setTodoList] = useState ([
    {id: 1, title: 'Todo 1 '},
    {id: 2, title: 'Todo 2'},
    {id: 3, title: 'Todo 3'},
  ]);

  function handleTodoClick (todo) {
    // console.log (todo);
    const index = todoList.findIndex (x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice (index, 1);

    setTodoList (newTodoList);
  }

  return (
    <div className="App">
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
