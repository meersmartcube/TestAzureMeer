import React from 'react'
// import { FormErrors } from '../../Components/FormErrors';
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { FORGETPASSWORD } from '../../Services/AppService'
import ResetPassword from './reset-password'
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SUCCESSMESSAGE } from './../../Helpers/app-const';

class ForgetPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: '',     

      formErrors: {userName: '',},

      userNameValid: false,     

      formValid: false,

      showResetPassword : false,
    }  
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
    let userNameValid = this.state.userNameValid;  

    switch(fieldName) {
      case 'userName':
        userNameValid = value.length >= 6;
        fieldValidationErrors.userName = userNameValid ? '' : ' is invalid';
        break;    
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      userNameValid: userNameValid,                
                  }, this.validateForm);
  }

  validateForm() {

    this.setState((state, props) => ({
      formValid: (this.state.userNameValid)
    }));
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = async (event) =>{
    
    event.preventDefault();
    console.log('submitted');    

    await axiosbase.post(`${FORGETPASSWORD}/${this.state.userName}`)
    .then(res => { 
       
      // this.setState((state, props) => ({
      //   showResetPassword: true
      // }));
        this.props.showSuccessSnackbar(SUCCESSMESSAGE);
        window.location = "/BusinessOwnerLogin";       
      }).catch(error => {            
           this.props.showErrorSnackbar(`${error.response.data.message}`);   
      });   

      //
      
    } 

ownHTML = () => {
  return (
    <div className="container">
  <div className="row margin-top-40">
  <div className="col-md-12 col-sm-12">
    <h1>Forget Password</h1>
   
      <div className="row">
        <div className="col-md-7 col-sm-7">
        <form id="forgetPasswordForm" className="form-horizontal form-without-legend" role="form" onSubmit={this.handleSubmit}>

          {/* <FormErrors formErrors={this.state.formErrors} /> */}

            <div className={`form-group ${this.errorClass(this.state.formErrors.userName)}`}>
            <label htmlFor="password" required className="col-lg-4 control-label">User Name <span className="require">*</span></label>
              <div className="col-lg-8">
                <input type="text" className="form-control" name="userName"
                ref={(input) => { this.nameInput = input; }}
                value={this.state.userName}
                placeholder="User Name"
                maxLength="25"
                onChange={this.handleUserInput}/>
              </div>
            </div>                 

            <div className="form-group">
              <div className="col-lg-8">
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Forget Password</button>
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
</div><br/><br/><br/>
   <br/>
   <br/>
   <br/> <br/><br/><br/><br/><br/><br/><br/></div>     
  )

}

  render(){
  return (

    <div className="">
      { this.state.showResetPassword? <ResetPassword userName={this.state.userName} />:this.ownHTML()}     
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
  )(ForgetPassword);