import React, { Component } from 'react';
// import { FormErrors } from '../../Components/FormErrors';
import PropTypes from 'prop-types';
import PhoneInput from '../../Components/PhoneInput'

const complaintConfig = {
  pageName:"Complaint",
  pageDescription:"Leave a Comment", 
  name:"Name",
  mobileNumber:"Mobile Number",
  email:"Email ",
  message :"Message ",
};

class Complaint extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      mobileNumber: '',
      email: '',     
      message: '',

      nameValid: false,
      emailValid: false,
      messageValid: false,

      formErrors: {name: '',email: '', message: ''},
      formValid: false
    }
  }

  componentDidMount(){
    this.nameInput.focus(); 
    //console.log(this.props)
    this.setState({
      name: this.props.name,
      mobileNumber: this.props.mobileNumber,
      email: this.props.email,   
      message: this.props.message,
    });
  }

  handleUserInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {    
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let messageValid = this.state.messageValid;

    switch(fieldName) {
      case 'name':
        nameValid = value ? true:false;
        fieldValidationErrors.name = nameValid ? '': ' is required';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
        case 'message':
          messageValid = value ? true:false;
          fieldValidationErrors.message = messageValid ? '': ' is required';
          break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    emailValid: emailValid,
                    messageValid: messageValid,
                  }, this.validateForm);
  }

  validateForm() {    
    // this.setState({
    //   formValid: (this.state.nameValid && this.state.emailValid && this.state.messageValid)
    // });

    this.setState((state, props) => ({
      formValid: (this.state.nameValid && this.state.emailValid && this.state.messageValid)
    }));
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (event) =>{
    event.preventDefault();  
    console.log('submitted');  

    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText="Complain has been Saved.";
    setTimeout(function(){     
       x.className = x.className.replace("show", "");       
    }, 3000);

    this.clearValues();
  }

  clearValues = (event) => {
    
  //   Object.keys(this.state).map((key, index) => {
      
  //     this.setState({[key] : ""});
  //  });    
      const emptyValue = '';
      this.setState({
        name: emptyValue,
        mobileNumber: emptyValue,
        email: emptyValue,    
        message: emptyValue,
      });
    }


  render () {
    return (
      
      <div className="container">
         
          <div className="row margin-bottom-40 margin-top-40">
           
            <div className="col-md-12 col-sm-12">
              <h1>{complaintConfig.pageName}</h1>
              
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                      <div className="post-comment">
                                      <h3>{complaintConfig.pageDescription}</h3>
                                      <form className="compaintForm" onSubmit={this.handleSubmit} method="post" role="form">
                                      {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                        
                                      <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                                          <label className="control-label" htmlFor={complaintConfig.name}>{complaintConfig.name} 
                                          <span className="color-red">*</span></label>
                                          <input type="text" required className="form-control"
                                            ref={(input) => { this.nameInput = input; }} 
                                            placeholder={complaintConfig.name}
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleUserInput}/>
                                        </div>

                                        <div className="form-group">
                                          <label className="control-label">{complaintConfig.mobileNumber}</label>
                                          {/* <input 
                                          className="form-control" 
                                          type="text" 
                                          name="mobileNumber"
                                          value={this.state.mobileNumber}
                                          onChange={this.handleUserInput}
                                          placeholder={complaintConfig.mobileNumber}/> */}
                                          <PhoneInput className="form-control"
                                          name="mobileNumber"
                                          value={this.state.mobileNumber}
                                          onChange={this.handleUserInput}
                                          placeholder={complaintConfig.mobileNumber}/>
                                        </div>

                                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                          <label className="control-label" htmlFor={complaintConfig.email}>{complaintConfig.email}
                                          <span className="color-red">*</span></label>
                                          <input type="email" required className="form-control" 
                                            name="email"
                                            placeholder={complaintConfig.email}
                                            value={this.state.email}
                                            onChange={this.handleUserInput}  />                                        
                                        </div>

                                        <div className={`form-group ${this.errorClass(this.state.formErrors.message)}`}>
                                          <label className="control-label">{complaintConfig.message} <span className="color-red">*</span></label>
                                          <textarea className="form-control" rows="8"
                                          name="message"
                                          value={this.state.message}
                                          onChange={this.handleUserInput} 
                                          ></textarea>
                                        </div>
                                        <p>
                                          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Post a Comment</button>
                                        </p>
                                      </form>
                      </div>
                  </div>
                  </div>
              </div>
            </div>          
          </div>        
       
    )
  }
}
Complaint.defaultProps = {
  name: 'John',
  mobileNumber: '050 123 4567',
  email: 'John@hotmail.com',     
  message: 'need your help through phone',
}

Complaint.propTypes = {
  name: PropTypes.string,
  mobileNumber: PropTypes.string,
  email: PropTypes.string,   
  message: PropTypes.string,  
}

export default Complaint;
