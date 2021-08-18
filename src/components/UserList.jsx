import React from "react";
import UserItem from "./UserItem";

class UserList extends React.Component {
  render() {
    return(
      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">Phone</div>
            <div className="col col-3">Email</div>
            <div className="col col-4"> </div>
          </li>
          {
            this.props.userList.map(user =>
              <UserItem
                key={user.id}
                user={user}
                editUser={this.props.editUser}
                deleteUser={this.props.deleteUser}
              />
            )
          }
        </ul>
      </div>
    )
  }
}

export default UserList;
