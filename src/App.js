import {useState, useEffect} from 'react';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App () {
  const [todoList, setTodoList] = useState ([
    {id: 1, title: 'Todo 1 '},
    {id: 2, title: 'Todo 2'},
    {id: 3, title: 'Todo 3'},
  ]);

  const [postList, setPostList] = useState ([]);

  function handleTodoClick (todo) {
    // console.log (todo);
    const index = todoList.findIndex (x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice (index, 1);
    setTodoList (newTodoList);
  }

  function handleTodoFormSubmit (formValues) {
    // console.log (formValues.title);
    // add new todo to current todo list
    const newTodoList = [...todoList];
    const newTodo = {
      id: newTodoList.length + 1,
      ...formValues,
    };
    newTodoList.push (newTodo);
    setTodoList (newTodoList);
  }

  useEffect (() => {
    async function fetchPostList () {
      try {
        const requestUrl =
          'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch (requestUrl);
        const responseJSON = await response.json ();
        console.log ({responseJSON});

        //lấy data từ responseJSON
        const {data} = responseJSON; //destructuring assignment
        // const data = responseJSON.data;
        // console.log (data);
        setPostList (data);
      } catch (error) {
        console.log ('Fail to fetch post list: ', error.message);
      }
    }
    fetchPostList ();
  }, []);

  return (
    <div className="App">
      <PostList posts={postList} />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
    </div>
  );
}

export default App;
