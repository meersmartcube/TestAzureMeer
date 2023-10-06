import React from 'react'
// import { FormErrors } from '../../Components/FormErrors';
import PropTypes from 'prop-types';
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { GETBUSINESSBYID } from '../../Services/AppService'
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

const userInfoConfig = {
  firstName: 'First Name',
  lastName: 'Last Name',
  mobileNumber: 'Mobile Number',
  interests: 'Interests',
  occupation: 'Occupation',
  about: 'About',
  websiteUrl: 'Website Url',
};

class UserInfo extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      interests: '',
      occupation: '',
      about: '',
      websiteUrl: '',

      formErrors: {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        interests: '', 
        occupation: '',
        //about: '',
        websiteUrl: '',          
      },

      firstNameValid: false,
      lastNameValid: false,
      mobileNumberValid: false,
      interestsValid: false,
      occupationValid: false,
      //aboutValid: false,
      websiteUrlValid: false,

      formValid: false,
      
      englishName: '',
      arabicName: '',
      licenseNumber:null,
    }
   
  }

  async componentDidMount(){
    const businessId = this.props.businessData.businessId;   
    await axiosbase.get(`${GETBUSINESSBYID}/${businessId}`)
    .then(res => {        
        this.setState((state, props) => ({ 
          englishName : res.data.englishName,
          arabicName : res.data.arabicName,
          licenseNumber : res.data.uniqueIdentificationNumber
        }));
      }).catch(error => {           
       
        error.response.data.errorList.map((filterItem) => {
          console.log(filterItem.errorDescription);
        });   
        this.props.showErrorSnackbar("Something went wrong!")
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
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let mobileNumberValid = this.state.mobileNumberValid;
    let interestsValid = this.state.interestsValid;
    let occupationValid = this.state.occupationValid;
    //let aboutValid = this.state.aboutValid;
    let websiteUrlValid = this.state.websiteUrlValid;

    switch(fieldName) {
      case 'firstName':   
        firstNameValid = value ? true:false; 
        fieldValidationErrors.firstNameValid = firstNameValid ? '' : ' is invalid';
        break;
      case 'lastName':
        lastNameValid = value ? true:false; 
        fieldValidationErrors.lastNameValid = lastNameValid ? '': ' is invalid';
        break;
      case 'mobileNumber':
        mobileNumberValid = value ? true:false; 
        fieldValidationErrors.mobileNumberValid = mobileNumberValid ? '': ' is invalid';
      break;
      case 'interests':
        interestsValid = value ? true:false; 
        fieldValidationErrors.interestsValid = interestsValid ? '': ' is invalid';
      break;
      case 'occupation':
        occupationValid =value ? true:false; 
        fieldValidationErrors.occupationValid = occupationValid ? '': ' is invalid';
      break;
      // case 'about':
      //   aboutValid = value.length >= 6;
      //   fieldValidationErrors.aboutValid = aboutValid ? '': ' is invalid';
      // break;
      case 'websiteUrl':
        websiteUrlValid = value ? true:false; 
        fieldValidationErrors.websiteUrlValid = websiteUrlValid ? '': ' is invalid';
      break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                        firstNameValid: firstNameValid,
                        lastNameValid: lastNameValid,
                        mobileNumberValid: mobileNumberValid,
                        interestsValid: interestsValid,
                        occupationValid: occupationValid,
                        //aboutValid: aboutValid,
                        websiteUrlValid: websiteUrlValid,
                  }, this.validateForm);
  }

  validateForm() {
    
    this.setState((state, props) => ({
      
      formValid: 
      ( this.state.firstNameValid && 
        this.state.lastNameValid && 
        this.state.mobileNumberValid &&
        this.state.interestsValid && 
        this.state.occupationValid && 
        //this.state.aboutValid && 
        this.state.websiteUrlValid 
        )
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
    x.innerText="Record saved successfully.";
    setTimeout(function(){     
       x.className = x.className.replace("show", "");       
    }, 3000);
  }



  render(){
    return(
        <form role="form" role="form" onSubmit={this.handleSubmit}>
    {/* <FormErrors formErrors={this.state.formErrors} /> */}
     
     <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
          <label className="control-label">English Name</label>
          <input type="text" 
            disabled
            className="form-control"
            placeholder="English Name"
            name="firstName"
            ref={(input) => { this.nameInput = input; }} 
            value={this.state.englishName}
            onChange={this.handleUserInput}/>
        </div>

        <div className="form-group">
          <label className="control-label">Arabic Name</label>
          <input type="text" 
           disabled
           className="form-control"
           placeholder="Arabic Name"
           name="lastName"           
           value={this.state.arabicName}
           onChange={this.handleUserInput}/>
        </div>

        <div className="form-group">
          <label className="control-label">License No</label>
          <input type="text" 
           disabled
           className="form-control"
           placeholder="License No"
           name="mobileNumber"
           value={this.state.licenseNumber}
           onChange={this.handleUserInput}/>
        </div>

        {/* <div className="form-group">
          <label className="control-label">{userInfoConfig.interests}</label>
          <input type="text" 
           className="form-control"
           placeholder={userInfoConfig.interests}
           name="interests"           
           value={this.state.interests}
           onChange={this.handleUserInput}/>
        </div>

        <div className="form-group">
          <label className="control-label">{userInfoConfig.occupation}</label>
          <input type="text"  className="form-control"
            placeholder={userInfoConfig.occupation}
            name="occupation"           
            value={this.state.occupation}
            onChange={this.handleUserInput}/>
        </div>

        <div className="form-group">
          <label className="control-label">{userInfoConfig.about}</label>
          <textarea className="form-control" rows="3" 
          placeholder={userInfoConfig.about} 
          value={this.state.about}></textarea>
        </div>

        <div className="form-group">
          <label className="control-label">{userInfoConfig.websiteUrl}</label>
          <input type="text"  className="form-control"
            placeholder={userInfoConfig.websiteUrl}
            name="websiteUrl"           
            value={this.state.websiteUrl}
            onChange={this.handleUserInput}/>
        </div> */}

        {/* <div className="margiv-top-10">
          <button type="submit" className="btn btn green" disabled={!this.state.formValid}>Save Changes</button>
          <a className="btn default">
          Cancel </a>
        </div> */}
      </form>
    );
  }
}

UserInfo.defaultProps = {
  firstName: 'Abdullah',
  lastName: 'Rashid',
  mobileNumber: '+971 50 123 4567',
  interests: 'Design, Web etc.',
  occupation: 'Sales manager',
  about: 'I am Abdullah, and working as sales manager',
  websiteUrl: 'http://www.website.com',
};

UserInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mobileNumber: PropTypes.string,
  interests: PropTypes.string,
  occupation: PropTypes.string,
  about: PropTypes.string,
  websiteUrl: PropTypes.string,
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
  )(UserInfo);