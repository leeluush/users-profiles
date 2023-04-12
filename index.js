function getAvatarUrl(style, seed) {
  return `https://avatars.dicebear.com/api/${style}/${encodeURIComponent(seed)}.svg`;
}



function User(props) {
  const avatarStyle = "adventurer";
  const avatarUrl = getAvatarUrl(avatarStyle, props.username)
  return `

      <div class="User">
         <img src="${avatarUrl}" alt="Avatar for ${props.username}" />
            <dl>
              <div>
              <dt>Name</dt>
              <dd>${props.name}</dd>
              </div>
              <div>
              <dt>Username</dt>
              <dd>${props.username}</dd>
              </div>
              <div>
              <dt>Email</dt>
              <dd>${props.email}</dd>
              </div>
            </dl>
            <p><button data-user-id="${props.id}" data-user-name="${props.name}">See more</button></p>
            <div ${props.isLoading ? '' : 'hidden'}>
            Loading...
            </div>
         
          ${props.todos ? renderTodos(props.todos) : ""}
        </div>
        
     `
}

function Todo(props) {
  return `
  <div class = "Todos"> 
  
    <label for="todo-${props.id}">
    <input id="todo-${props.id}" type="checkbox"/> <label for="todo-${props.id}"> 
    ${props.title}
    </label>
</div>
`;
}


document.addEventListener('click', (e) => {
  const { userId } = e.target.dataset;

  setState(actions.openUser(userId));

  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then(response => response.json())
    .then(todos => {
      setState(actions.setToDos(userId, todos))
      console.log(todos)
    })
});



let actions = {
  openUser(userId) {
    let newState;

    let user = state.users.find(user => user.id === Number(userId));
    user.isLoading = true;
    newState = { users: state.users };
    setState(newState);
    return newState;
  },

  setToDos(userId, todos) {
    let newState;
    let user = state.users.find(user => user.id === Number(userId));
    user.isLoading = false;
    user.todos = todos;
    newState = { users: state.users, todos: todos };
    setState(newState);
    return newState;
  }
}




function setState(newState) {
  state = { ...state, ...newState };
  render(state);
}


let state = {
  users: [],
  todos: []
};

function render(state) {
  root.innerHTML = `
  
  <h1>Welcome to JSBook! 🤖</h1>
  <h2>These are the latest users</h2>
  <ul class = "users-list">
    ${state.users.map(user => `
      <li>
        ${User(user)}
      </li>
    `).join('')}
  </ul>

`;
}


function renderTodos(todos) {
  return `
 <ul class="todos-list">
 ${state.todos.map(todo => `
 <li>
 ${Todo(todo)}
 </li>
 `).join('')}
 </ul>

 `
    ;
}


const root = document.querySelector('#root');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    setState({ users });
  });



