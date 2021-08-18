import React from "react";
import './App.css';
import UserList from "./components/UserList";
import Form from "./components/Form";
import {getUserList, createUser, updateUser, deleteUser} from "./services/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      selectedUser: null,
      isSaving: false
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


  saveUser = (data) => {
    this.setState({isSaving: true});
    if (this.state.selectedUser) {

      this.setState({
        selectedUser: {
          ...this.state.selectedUser,
          name: data.name,
          username: data.username,
          email: data.email
        }
      });

      updateUser(this.state.selectedUser)
        .then((json) => {
          this.setState({
            userList: this.state.userList.map(user =>
              user.id === this.state.selectedUser.id ?
                {...this.state.selectedUser} :
                user
            )
          }, () => {
            this.setState({
              selectedUser: null,
              isSaving: false
            });
          });
        });

    } else {

      createUser(data)
        .then((json) => {
          this.setState({
            userList: [
              ...this.state.userList,
              {...json, id: Date.now()}
              ],
            isSaving: false
          });
        });

    }
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
          saveUser={this.saveUser}
          isSaving={this.state.isSaving}
        />
      </div>
    );
  }
}

export default App;
