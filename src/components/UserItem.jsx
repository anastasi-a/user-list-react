import React from "react";

class UserItem extends React.Component {
  render() {
    return(
      <li className="table-row">
        <div className="col col-1">{this.props.user.name}</div>
        <div className="col col-2">{this.props.user.username}</div>
        <div className="col col-3">{this.props.user.email}</div>
        <div className="col col-4">
          <button
            className="edit"
            onClick={() => {this.props.editUser(this.props.user)}}
          >✎</button>
          <button
            className="edit"
            onClick={() => {this.props.deleteUser(this.props.user.id)}}
          >✗</button>
        </div>
      </li>
    )
  }
}

export default UserItem;
