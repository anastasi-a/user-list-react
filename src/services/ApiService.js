
const getUserList = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());
}

const create = (user) => {
  return fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
}

const update = (user) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
}

const deleteUser = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });
}


export {
  getUserList,
  create,
  update,
  deleteUser
}
