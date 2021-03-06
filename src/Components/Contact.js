/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable */
import React from 'react';
import axios from 'axios';
import ValidationMessage from './ValidationMessage';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      comment: '',
      errorLastName: false,
      errorFirstName: false,
      errorEmail: false,
      errorComment: false,
      isFormSend: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleErrorLastName = () => {
    const { lastName } = this.state;
    if (lastName.length <= 0) {
      this.setState({ errorLastName: true });
    } else {
      this.setState({ errorLastName: false });
    }
  };
  handleErrorFirstName = () => {
    const { firstName } = this.state;
    if (firstName.length <= 0) {
      this.setState({ errorFirstName: true });
    } else {
      this.setState({ errorFirstName: false });
    }
  };
  handleErrorEmail = () => {
    const { email } = this.state;
    if (email.length <= 0) {
      this.setState({ errorEmail: true });
    } else {
      this.setState({ errorEmail: false });
    }
  };
  handleErrorComment = () => {
    const { comment } = this.state;
    if (comment.length <= 0) {
      this.setState({ errorComment: true });
    } else {
      this.setState({ errorComment: false });
    }
  };
  handleChange = (fieldName, fieldValue) => {
    this.setState({ [fieldName]: fieldValue });
  };

  handleCloseValidationMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isFormSend: false });
  };

  submitForm = () => {
    const { firstName, lastName, email, comment } = this.state;
    console.log(firstName, lastName, email, comment);

    axios
      .post(
        `https://meals-factory.herokuapp.com/Contact?apiKey=${window.apiKey}`,
        {
          firstname: firstName,
          lastname: lastName,
          email,
          comment,
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          isFormSend: true,
        });
      });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      comment: '',
      errorLastName: false,
      errorFirstName: false,
      errorEmail: false,
      errorComment: false,
    });
  };

  render() {
    const {
      lastName,
      firstName,
      email,
      comment,
      errorLastName,
      errorFirstName,
      errorEmail,
      errorComment,
    } = this.state;
    return (
      <div className="contact-main-container">
        <ValidationMessage
          isFormSend={this.state.isFormSend}
          handleCloseValidationMessage={this.handleCloseValidationMessage}
        />
        <h1 className="contact-title">Contact</h1>
        <p className="contact-text">
          For any question or suggestion, please fulfill the form below.
        </p>
        <div className="form-container">
          <div>
            <label htmlFor="lastName">Lastname : </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => this.handleChange('lastName', e.target.value)}
              onBlur={this.handleErrorLastName}
              placeholder="Bocuse"
              className="form-field"
            />
            <p className="required">
              {errorLastName && 'Lastname is required'}
            </p>

            <br />
            <br />
          </div>
          <div>
            <label htmlFor="firstName">Firstname : </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => this.handleChange('firstName', e.target.value)}
              onBlur={this.handleErrorFirstName}
              placeholder="Paul"
              className="form-field"
            />
            <p className="required">
              {errorFirstName && 'Firstname is required'}
            </p>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              value={email}
              onChange={(e) => this.handleChange('email', e.target.value)}
              onBlur={this.handleErrorEmail}
              placeholder="paulbocuse@gmail.com"
              className="form-field"
            />
            <p className="required">{errorEmail && 'Email is required'}</p>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="comment">Message :</label>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => this.handleChange('comment', e.target.value)}
              onBlur={this.handleErrorComment}
              rows="5"
              placeholder="Your message..."
              className="form-textarea"
            />
            <p className="required">
              {errorComment && 'A message is required'}
            </p>
            <br />
            <br />
          </div>
          <button
            type="button"
            className="send-button"
            onClick={this.submitForm}
          >
            SEND
          </button>
        </div>
      </div>
    );
  }
}

export default Contact;
