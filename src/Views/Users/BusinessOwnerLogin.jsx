import React, { Component } from 'react';
import { connect } from "react-redux";
// import { FormErrors } from '../../Components/FormErrors';
import { Link }  from 'react-router-dom';
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { AUTHENTICATEWEBUSER } from '../../Services/AppService';
import {  signIn,signOut } from "../../actions";
import { showSuccessSnackbar ,showErrorSnackbar } from '../../actions/snackbarActions';
import { showSpinner, hideSpinner } from '../../actions/spinnerAction';
import { bindActionCreators } from 'redux';
import { 
  RESETPASSWORD
  ,CURRENTSCHEDULE 
} from '../../Helpers/app-const';

class BusinessOwnerLogin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      
      userName: '',
      password: '',
      formErrors: {email: '', password: ''},
    
      userNameValid: false,
      passwordValid: false,
      formValid: false
    }

    this.props.signOut();
  }

 componentDidMount(){
    this.nameInput.focus();
    //this.auth.isSignedIn.listen(this.onAuthChange);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value.trim()},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;    
    let userNameValid = this.state.userNameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {      
      case 'userName':
        userNameValid = value.length >= 6;
        fieldValidationErrors.userName = userNameValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,                    
                    userNameValid : userNameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState((state, props) => ({
      formValid: this.state.userNameValid && this.state.passwordValid
    }));
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit =  async  (event) =>{

    var firstTimeLogin = false;

    event.preventDefault();
    let data = JSON.stringify({
      username: this.state.userName,
      password: this.state.password,
      DeviceKey:'web',
    });

  
  await axiosbase.post(AUTHENTICATEWEBUSER, data)
  .then(res => {    
      this.props.showSpinner();
      this.props.signIn(res.data);
      firstTimeLogin = res.data.firstTimeLogin;
    }).catch(error => {      
      var msg = "";
      if(!error.status && error.message === "Network Error"){       
        msg =`${error.message}`;
      }
      else{        
        this.props.hideSpinner();
        error.response.data.errorList.map((filterItem) => {
          //msg += `${filterItem.errorDescription} <br/>`;
          msg += `${filterItem.errorDescription} `;
        });
        
        this.props.signOut();
      } 

      this.props.showErrorSnackbar(`${msg}`);
    });

    //if successful then redirect to specific pages.    
    if(this.props.isSignedIn){
      //if first time login then user force to redirect to reset password screen.
      if(!firstTimeLogin){
        window.location = `/${RESETPASSWORD}`;
      }else{
        window.location = `/${CURRENTSCHEDULE}`;
      }
    }
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
        this.props.signIn(this.auth.currentUser.get().getId());
    }
    else{
        this.props.signOut();
    }
    //this.setState({ isSignedIn : this.auth.isSignedIn.get()});
  }

  render () {
  return (
        <div className="container">
          <div className="row margin-top-40">
            <div className="col-md-12 col-sm-12">
              <h1>Business Owner Login</h1>

                <div className="row">
                  <div className="col-md-7 col-sm-7">
                    <form id="businessOwnerForm" className="form-horizontal form-without-legend" role="form" onSubmit={this.handleSubmit}>

                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email" className="col-lg-4 control-label">User Name <span className="">*</span></label>
                        <div className="col-lg-8">

                        {/* <input type="email" required className="form-control"
                                            ref={(input) => { this.nameInput = input; }}
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleUserInput}  />   */}
                                            <input type="text" required className="form-control"
                                            ref={(input) => { this.nameInput = input; }}
                                            name="userName"
                                            placeholder="User Name"
                                            value={this.state.userName}
                                            maxLength="25"
                                            onChange={this.handleUserInput}  />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="password" required className="col-lg-4 control-label">Password <span className="">*</span></label>
                        <div className="col-lg-8">
                          <input type="password" className="form-control" name="password"
                            placeholder="Password"
                            value={this.state.password}
                            maxLength="50"
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
                  {/* <div className="col-md-4 col-sm-4 pull-right">
                    <div className="form-info">
                      <h2><em>Important</em> Information</h2>
                      <p>Duis autem vel eum iriure at dolor vulputate velit esse vel molestie at dolore.</p>
                      <button type="button" className="btn btn-default">More details</button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>   <br/><br/><br/><br/><br/><br/><br/>
          </div>
      );
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators(
	  {
      showSuccessSnackbar,
      showErrorSnackbar,
      showSpinner,
      hideSpinner,
      signIn,
      signOut
	  },
	  dispatch
	)
}

const mapStateToProps = (state) =>{
  return {isSignedIn : state.auth.isSignedIn};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps, 
)(BusinessOwnerLogin);