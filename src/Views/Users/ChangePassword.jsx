import React from 'react'
import PasswordInput from '../../Components/password-input';
import PropTypes from 'prop-types';
import { CHANGEPASSWORD } from '../../Services/AppService'
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SUCCESSMESSAGE } from './../../Helpers/app-const';

const changePasswordConfig={
  currentPassword:'Current Password',
  newPassword:'New Password',
  retypeNewPassword:'Re-type New Password',
};

class ChangePassword extends React.Component {
  
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
    
          formValid: false
        }
       
        this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
      }

      handlePasswordChanges = (name,value) => {        
        this.setState({[name]: value});     
        this.validateField(name, value)   
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
            currentPasswordValid = value.length >= 8;     
            fieldValidationErrors.currentPassword = currentPasswordValid ? '' : ' is invalid';          
            break;
          case 'newPassword': 
            newPasswordValid = value.length >= 8;
            fieldValidationErrors.currentPassword = newPasswordValid ? '': ' is invalid';           
          break;
            case 'reEnterPassword':
              reEnterPasswordValid = this.state.newPassword!==value?false:true;
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
    
      handleSubmit = async (event) => {
        
       
        event.preventDefault(); 
        var userId = this.props.businessData.userId;  
        let data = JSON.stringify({
          UserId: userId,
          CurrentPassword: this.state.currentPassword,
          NewPassword:this.state.newPassword,
        });
      
        await axiosbase.post(CHANGEPASSWORD, data)
        .then(res => { 
            this.props.showSuccessSnackbar(SUCCESSMESSAGE);    
          }).catch(error => {
            this.props.showErrorSnackbar(error.response.data.message); 
          });        
        } 
        
    render(){  
    return(
      <div>
      <h3 style={{color: "#E26A6A"}}><strong> Change Password</strong></h3>           
            <hr/>  
        <form id="changePasswordForm" className="" role="form" onSubmit={this.handleSubmit}>         
          {this.props.userName}
          <div className={`form-group ${this.errorClass(this.state.formErrors.currentPassword)}`}>
            <label className="control-label">{changePasswordConfig.currentPassword}</label>         

            <PasswordInput  
            name="currentPassword"
            className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
            value={this.state.currentPassword}
            placeholder={changePasswordConfig.currentPassword}
            handleChanges={(e)=>this.handlePasswordChanges('currentPassword',e.target.value)}
          />
          </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.newPassword)}`}>
            <label className="control-label">{changePasswordConfig.newPassword}</label>
          
            <PasswordInput  
            name="newPassword"
            className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
            value={this.state.newPassword}
            placeholder={changePasswordConfig.newPassword}
            handleChanges={(e)=>this.handlePasswordChanges('newPassword',e.target.value)}
          />
            </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.reEnterPassword)}`}>
            <label className="control-label">{changePasswordConfig.retypeNewPassword}</label>
            <input type="password" 
             className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
              placeholder={changePasswordConfig.retypeNewPassword}
              name="reEnterPassword"
              value={this.state.reEnterPassword}
              onChange={this.handleUserInput}/>                      
            </div>

            <div className="margin-top-10">
            <button type="submit" className="btn green" disabled={!this.state.formValid}>Change Password </button>
            &nbsp;
            <button type="button" className="btn default">Cancel </button>
            </div>
        </form> </div>
        );
    };
}

ChangePassword.propTypes = {
  currentPassword: PropTypes.string,
  newPassword: PropTypes.string,
  reEnterPassword: PropTypes.string,
}


const mapState = (state, ownProps) => {	
	return {
		  isSignedIn : state.auth.isSignedIn,
		  businessData : state.auth.businessData,
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
  )(ChangePassword);