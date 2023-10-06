import React, { Component } from 'react';
import { Link }  from 'react-router-dom'

const userLginConfig={
  username:'inspector@smartcube.com',
  password:'inspector@123',  
};


class InspectorLogin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    window.localStorage.clear();
  }


  componentDidMount(){
    this.nameInput.focus(); 
  }
  
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {

    this.setState((state, props) => ({
      formValid: this.state.emailValid && this.state.passwordValid
    }));

    //this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (event) =>{
    
    event.preventDefault();  
    console.log('submitted');  
    
    window.localStorage.clear();
    window.localStorage.setItem('userType',2);
    var msg="";
    if(this.state.email===userLginConfig.username && this.state.password===userLginConfig.password){
      msg="Inspector Login Succesfully.";
    }
    else{
      msg="Please enter valid credentials.";
    }

    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText=msg;
    setTimeout(function(){     
       x.className = x.className.replace("show", "");       
    }, 3000);
    window.location = "/";

  }

  render () { 
  return (
      <div className="container">       
      <div className="row margin-bottom-40 margin-top-40">
        <div className="col-md-12 col-sm-12">
          <h1>Inspector Login</h1>
         
            <div className="row">
              <div className="col-md-7 col-sm-7">
                <form className="form-horizontal form-without-legend" role="form" onSubmit={this.handleSubmit}>
                 
                {/* <FormErrors formErrors={this.state.formErrors} /> */}
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email" className="col-lg-4 control-label">Email <span className="">*</span></label>
                        <div className="col-lg-8">
                          
                        <input type="email" required className="form-control" 
                                            ref={(input) => { this.nameInput = input; }} 
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleUserInput}  />  
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="password" className="col-lg-4 control-label">Password <span className="">*</span></label>
                        <div className="col-lg-8">
                          <input type="password" className="form-control" name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleUserInput}  />
                        </div>
                      </div>
                 
                  <div className="form-group">
                    <div className="col-lg-8 col-md-offset-4">
                    <Link to="/ForgetPassword">Forget Password?</Link>
                    </div>
                  </div>
                 
                  <div className="form-group">
                    <div className="col-lg-8 col-md-offset-4">
                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Login</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4 col-sm-4 pull-right">
                <div className="form-info">
                  <h2><em>Important</em> Information</h2>
                  <p>Duis autem vel eum iriure at dolor vulputate velit esse vel molestie at dolore.</p>

                  <button type="button" className="btn btn-default">More details</button>
                </div>
              </div>
            </div>
          </div>
        </div>    <br/>     
            <br/>     
            <br/>     
            <br/>     
            <br/>     
            <br/>       
      </div>
  
    
    );
  };
}


export default InspectorLogin;