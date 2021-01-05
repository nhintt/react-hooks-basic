import {useState, useEffect} from 'react';
import queryString from 'query-string';
import Pagination from './components/Pagination';
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
  const [pagination, setPagination] = useState ({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState ({
    _limit: 10,
    _page: 1,
  });

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

  function handlePageChange (newPage) {
    console.log (newPage);
    setFilters ({
      ...filters,
      _page: newPage,
    });
  }

  useEffect (
    () => {
      async function fetchPostList () {
        try {
          const paramsString = queryString.stringify (filters); //install them package query-string de su dung
          const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
          const response = await fetch (requestUrl);
          const responseJSON = await response.json ();
          console.log ({responseJSON});

          //lấy data từ responseJSON
          const {data, pagination} = responseJSON; //destructuring assignment
          // const data = responseJSON.data;
          // console.log (data);
          setPostList (data);
          setPagination (pagination);
        } catch (error) {
          console.log ('Fail to fetch post list: ', error.message);
        }
      }
      fetchPostList ();
    },
    [filters]
  );

  return (
    <div className="App">
      <PostList posts={postList} />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
