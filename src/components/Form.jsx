import React from "react";
import FormInput from "./FormInput";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: ""
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && (!prevProps.user || prevProps.user.id !== this.props.user.id)) {
      this.updateFormState(this.props.user.name, this.props.user.phone, this.props.user.email);
    }
    if (prevProps.user && !this.props.user) {
      this.updateFormState("", "", "");
    }
  }

  updateFormState = (name, phone, email) => {
    this.setState({
      name: name,
      phone: phone,
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

  saveUser = (isNew) => {
    if (this.state.name.trim() && this.state.phone.trim() && this.state.email.trim()) {
      if (isNew) {
        this.props.createUser(this.state);
        this.updateFormState("", "", "");
      } else {
        this.props.updateUser(this.state);
      }
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
          <div className='lf--submit' onClick={() => {this.saveUser(false)}}>
            SAVE
          </div>
          <div className='lf--submit' onClick={() => {this.saveUser(true)}}>
            CREATE
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
