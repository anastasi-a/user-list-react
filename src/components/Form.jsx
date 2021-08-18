import React from "react";
import FormInput from "./FormInput";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      email: ""
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && (!prevProps.user || prevProps.user.id !== this.props.user.id)) {
      this.updateFormState(this.props.user.name, this.props.user.username, this.props.user.email);
    }
  }

  updateFormState = (name, username, email) => {
    this.setState({
      name: name,
      username: username,
      email: email
    });
  }

  changeInput = (inputName, value) => {
    this.setState({
      [inputName]: value
    });
  }

  clearForm = () => {
    this.props.clearSelectedUser();
    this.updateFormState("", "", "");
  }

  saveUser = () => {
    if (this.state.name.trim() && this.state.username.trim() && this.state.email.trim()) {
      this.props.saveUser(this.state);
      this.updateFormState("", "", "");
    }
  }

  render() {
    return(
      <form className='login-form'>
        {
          Object.keys(this.state).map(key =>
            <FormInput
              key={key}
              inputName={key}
              inputValue={this.state[key]}
              changeInput={this.changeInput}
            />
          )
        }
        <div className="button-wrapper">
          <div className='lf--submit' onClick={this.saveUser}>
            {this.props.isSaving ? "SAVING..."  : "SAVE"}
          </div>
          <div className='lf--submit' onClick={this.clearForm}>
            CLEAR
          </div>
        </div>
      </form>
    )
  }
}

export default Form;
