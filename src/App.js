import React from "react";
import './App.css';
import UserList from "./components/UserList";
import Form from "./components/Form";
import {getUserList, create, update, deleteUser} from "./services/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      selectedUser: null
    }

  }

  componentDidMount() {
    getUserList().then(
      json => {
        this.setState({
          userList: [...json]
        });
      });
  }

  editUser = (user) => {
    this.setState({
      selectedUser: {...user}
    });
  }


  updateUser = (data) => {
    if (this.state.selectedUser) {

      this.setState({
        selectedUser: {
          ...this.state.selectedUser,
          name: data.name,
          phone: data.phone,
          email: data.email
        }
      });

      update(this.state.selectedUser)
        .then((json) => {
          this.setState({
            userList: this.state.userList.map(user =>
              user.id === this.state.selectedUser.id ?
                {...this.state.selectedUser} :
                user
            )
          }, () => {
            this.setState({
              selectedUser: null
            });
          });
        });

    }
  }

  createUser = (data) => {
    create(data)
      .then((json) => {
        this.setState({
          userList: [
            ...this.state.userList,
            {...json, id: Date.now()}
          ]
        });
      });
  }

  deleteUser = (id) => {
    deleteUser(id)
      .then((response) => {
        this.setState({
          userList: this.state.userList.filter(user =>
            user.id !== id
          )
        });
      });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUser: null
    });
  }

  render() {
    return (
      <div className="app">
        <UserList
          userList={this.state.userList}
          editUser={this.editUser}
          deleteUser={this.deleteUser}
        />
        <Form
          user={this.state.selectedUser}
          clearSelectedUser={this.clearSelectedUser}
          updateUser={this.updateUser}
          createUser={this.createUser}
        />
      </div>
    );
  }
}

export default App;
