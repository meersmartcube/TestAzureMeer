import React from 'react'
import { CHANGEPASSWORD } from '../../Services/AppService'
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import PasswordInput from '../../Components/password-input';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SUCCESSMESSAGE } from './../../Helpers/app-const';

class ResetPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      reEnterPassword: '',

      formErrors: {currentPassword: '', newPassword: '',reEnterPassword: ''},

      currentPasswordValid: false,
      newPasswordValid: false,
      reEnterPasswordValid: false,

      formValid: false,

      userName:null
    }    
    this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
  }

  handlePasswordChanges = (name,value) => {        
    this.setState({[name]: value});     
    this.validateField(name, value)   
  }

  componentDidMount(){
    //this.nameInput.focus();    
    const userName =  window.localStorage.getItem("userName");
    if(userName){
      this.setState({
        userName :userName
      });
    }
    else{
      this.setState({
        userName :this.props.userName
      });
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let currentPasswordValid = this.state.currentPasswordValid;
    let newPasswordValid = this.state.newPasswordValid;
    let reEnterPasswordValid = this.state.reEnterPasswordValid;

    switch(fieldName) {
      case 'currentPassword':
      currentPasswordValid = value.length >= 6;
        fieldValidationErrors.currentPassword = currentPasswordValid ? '' : ' is invalid';
        break;
      case 'newPassword':
        newPasswordValid = value.length >= 6;
        fieldValidationErrors.currentPassword = newPasswordValid ? '': ' is invalid';
        break;
        case 'reEnterPassword':
          reEnterPasswordValid = value.length >= 6;
          fieldValidationErrors.reEnterPassword = reEnterPasswordValid ? '': ' is invalid';
          break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    currentPasswordValid: currentPasswordValid,
                    newPasswordValid: newPasswordValid,
                    reEnterPasswordValid: reEnterPasswordValid
                  }, this.validateForm);
  }

  validateForm() {

    this.setState((state, props) => ({
      formValid: (this.state.currentPasswordValid && this.state.newPasswordValid && this.state.reEnterPasswordValid)
    }));
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = async (event) =>{
   
    event.preventDefault();
    console.log('submitted');

    let data = JSON.stringify({
      UserId: parseInt(this.state.userName),
      CurrentPassword: this.state.currentPassword,
      NewPassword:this.state.newPassword,
    }); 
    
    await axiosbase.post(CHANGEPASSWORD, data)
    .then(res => {         
        this.props.showSuccessSnackbar(SUCCESSMESSAGE);  
      }).catch(error => {       
        var msg ="";
        if(error.response.status && error.response.status===401){
          msg =  error.response.statusText
        }else{
          msg = error.response.data.message; 
        }
        this.props.showErrorSnackbar(msg); 
      }); 
  }

  render(){
  return (

    <div className="container">
      <div className="row margin-top-40">
        <div className="col-md-12 col-sm-12">
          <h1>Reset Password</h1>
         
            <div className="row">
              <div className="col-md-7 col-sm-7">
              <form id="forgetPasswordForm" className="form-horizontal form-without-legend" role="form" onSubmit={this.handleSubmit}>

                {/* <FormErrors formErrors={this.state.formErrors} /> */}

                  <div className={`form-group ${this.errorClass(this.state.formErrors.currentPassword)}`}>
                  <label htmlFor="password" required className="col-lg-4 control-label">Current Password <span className="require">*</span></label>
                    <div className="col-lg-8">
                      {/* <input type="password" className="form-control" name="currentPassword"
                      ref={(input) => { this.nameInput = input; }}
                      value={this.state.currentPassword}
                      placeholder="Current Password"
                      onChange={this.handleUserInput}/> */}

                    <PasswordInput  
                      name="currentPassword"
                      className="form-control"
                      value={this.state.currentPassword}
                      placeholder="Current Password"
                      handleChanges={(e)=>this.handlePasswordChanges('currentPassword',e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={`form-group ${this.errorClass(this.state.formErrors.newPassword)}`}>
                    <label htmlFor="password" required className="col-lg-4 control-label">New Password <span className="require">*</span></label>
                    <div className="col-lg-8">
                      {/* <input type="password" className="form-control" name="newPassword"
                       value={this.state.newPassword}
                       placeholder="New Password"
                       onChange={this.handleUserInput}/>                       */}
                        <PasswordInput  
                        name="newPassword"
                        className="form-control"
                        value={this.state.newPassword}
                        placeholder="New Password"
                        handleChanges={(e)=>this.handlePasswordChanges('newPassword',e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={`form-group ${this.errorClass(this.state.formErrors.reEnterPassword)}`}>
                    <label htmlFor="password" required className="col-lg-4 control-label">Re-type New Password <span className="require">*</span></label>
                    <div className="col-lg-8">
                      <input type="password" className="form-control" name="reEnterPassword"
                       value={this.state.reEnterPassword}
                       placeholder="Re-type New Password"
                       onChange={this.handleUserInput}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Save Changes</button>
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
      </div><br/><br/><br/><br/><br/>
    </div>

      );
    };
};
const mapState = (state, ownProps) => {	
	return {
		//  isSignedIn : state.auth.isSignedIn,
		//  businessData : state.auth.businessData,
	  }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => { 
	return bindActionCreators(
	  {
		showSuccessSnackbar,    
		showErrorSnackbar, 
	  },
	  dispatch
	)
  }
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(ResetPassword);