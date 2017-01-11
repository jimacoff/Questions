import React from 'react';
import GreetingContainer from '../greeting_container';
import { Link, withRouter } from 'react-router';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { edit: false, first_name: "", last_name: "", description: "", userpicFile: null, userpicUrl: null }
    this.changeToEdit = this.changeToEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }


  componentDidMount() {
    this.props.fetchUser(this.props.params.id).then(() => this.validateUser());
  }

  validateUser() {
    if (parseInt(this.props.params.id) !== this.props.currentUser.id) {
      return this.props.router.push("/")
    }
  }

  update(field) {
    return e => {
      this.setState({
      [field]: e.currentTarget.value
    });
    }
  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ userpicFile: file });
    }
    if (file) {
    fileReader.readAsDataURL(file);
    }

  }

  getTopics() {
      return $.ajax({
        type: "GET",
        url: '/api/user_subscribed_topics',
      });
    }

  

  changeToEdit(e) {
    e.preventDefault();
    this.setState({
      edit: true,
      userpic: this.props.currentUser.userpic,
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      description: this.props.currentUser.description
    });
  }

  renderSpecificError(fieldName) {
		let singleError = "";
		const allErrors = this.props.errors;

		allErrors.forEach(error => {
			if(error.includes(fieldName)){
				singleError = error;
			}
		});
		if (singleError === "Password is too short (minimum is 1 character)"){
			singleError = "Password is too short"
		}
		return singleError;
	}

  getDescription(){
    let descr = this.state.description;
    if (typeof descr === "undefined" || descr === 'null'){
      descr = "";
    }
    return descr;
  }

  checkCurrentUserDescr() {
    if (this.props.currentUser.description === 'null') {
      return "";
    } else {
      return this.props.currentUser.description;
    }
  }

  handleUpdate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user[id]", this.props.currentUser.id);
    if(!(this.state.userpicFile === null)){
      formData.append("user[userpic]", this.state.userpicFile);
    }
    formData.append("user[first_name]", this.state.first_name);
    formData.append("user[last_name]", this.state.last_name);
    formData.append("user[description]", this.state.description);
    this.props.updateUser(formData, this.props.currentUser.id).then(() => this.setState({edit: false}));
  }

  getUser() {
    return {
      id: this.props.currentUser.id,
      userpic: this.state.userpicFile,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      description: this.state.description
  };
}

  render() {
    if (this.state.edit) {
      return (
        <div className="uu-form-container">
          <form onSubmit={ this.handleUpdate }
            className="uu-form">
            <div className="userpic-profile">
              <img src={this.props.currentUser.userpic_url} />

              <input type="file" onChange={(e) => this.updateFile(e)} />
            </div>

            <div className="uu-input">
              <label className="uu-field-title">First Name</label>
              <input
                className="auth-form-input"
                type="text"
                value={`${this.state.first_name}`}
                onChange={this.update("first_name")} />
              <div className="signup-form-errors">{this.renderSpecificError("First name")}</div>
              <br />
            </div>

            <div className="uu-input">
              <label className="uu-field-title">Last Name</label>
              <input
                className="auth-form-input"
                type="text"
                value={`${this.state.last_name}`}
                onChange={this.update("last_name")} />
              <div className="signup-form-errors">{this.renderSpecificError("Last name")}</div>
              <br />

            </div>

            <div className="uu-input">
              <label className="uu-field-title">Description</label>
              <input
                className="auth-form-input"
                type = "text"
                value={this.state.description}
                onChange={this.update("description")} />
              <div className="signup-form-errors">{this.renderSpecificError("Description")}</div>
            </div>

            <br />
          <div className="uu-buttons group">
              <Link className="cancel-link link" onClick={() => this.setState({edit: false})}>Cancel</Link>
              <input type="submit" className="ans-btn" value="Update" />
          </div>

          </form>
        </div>
      );
    } else {
      return (
      <div className="ui_container">
        <div className="user-profile">
          <div className="userpic-profile">
            <img src={this.props.currentUser.userpic_url} />
          </div>

          <div className="user-info-profile">
            <div className="user-name">
              <p>{this.props.currentUser.first_name}&nbsp;&nbsp;{this.props.currentUser.last_name}</p>
            </div>
            <div className="user-descr">
              <p>{this.props.currentUser.description}</p>
            </div>
          </div>
        </div>
        <div className="edit-btn">
           <form onSubmit={this.changeToEdit}>
             <input type="submit" className="ans-btn" value="Edit" />
           </form>
        </div>
      </div>
        );
      }
    }

}

export default withRouter(UserProfile);