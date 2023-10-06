import React, { Component } from 'react';
// import { FormErrors } from '../../Components/FormErrors';
import PropTypes from 'prop-types';
import PhoneInput from '../../Components/PhoneInput'
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { SAVECOMPLAIN, GETLOOKUP } from '../../Services/AppService'
import { showSuccessSnackbar ,showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Recaptcha from 'react-recaptcha'
import { FEEDBACKMESSAGE } from './../../Helpers/app-const';

const commentConfig = {
  pagetTile:"Complaint",
  complainType: "Complain Type",
  name : "Name ",
  mobileNumber: "Mobile Number",
  email : "Email ",
  message: "Message",  
  btnPostAComplain: "Post a Complain",
  captchaAPIKey:'6LeGovUUAAAAAHvlyoVHjQGXCTXlBijdGKbFbY2A' 
};

const lookupCode = { 
	complainTypes : 3
};

class Comment extends Component {
  captcha = null;
  constructor (props) {
    super(props);
    this.state = {
      complainTypeId : null,
      name: '',
      mobileNumber: '',
      email: '',     
      message: '',
      
      nameValid: false,
      mobileNumberValid: false,
      emailValid: false,
      messageValid: false,
      isCaptchaVerified : false,

      formErrors: {name: '', mobileNumber: '', email: '', message: ''},
      formValid: false,
      businessId: null,

      complains: []
    }     
  }

  async componentDidMount(){
    
    this.setState((state, props) => ({ 
      businessId : this.props.businessId      
    }));	

    let data = JSON.stringify({
			Code: lookupCode.complainTypes,     
   	});

		await axiosbase.post(GETLOOKUP, data)
		.then(res => { 
      
      let complainsFromApi = res.data.lookups.map(team => {
        return {value: team.id, display: team.englishName}
      });
      
      this.setState({        
        complains : complainsFromApi
      });
      
      if(complainsFromApi){
        this.setState({        
          complainTypeId : complainsFromApi[0].value
        });
      }
     
		}).catch(error => {  
		
    }); 
    
  }

  handleUserInput = (e, istrim) => {
    const name = e.target.name;
    const value = istrim && istrim === true ? e.target.value.replace(/\s/g, '') : e.target.value;    
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {    
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let mobileNumberValid = this.state.mobileNumberValid;
    let emailValid = this.state.emailValid;
    let messageValid = this.state.messageValid;

    switch(fieldName) {
      case 'name':
        nameValid = value ? true : false;
        fieldValidationErrors.name = nameValid ? '': ' is required';
        break;
      case 'mobileNumber':             
        var str = value;
        mobileNumberValid = str.replace(/ /g, "").length === 10 ? true : false;  
        fieldValidationErrors.mobileNumber = mobileNumberValid ? '' : ' is invalid';          
      break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'message':
          messageValid = value ? true : false;
          fieldValidationErrors.message = messageValid ? '': ' is required';
      break;
      default:
      break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    mobileNumberValid: mobileNumberValid,
                    emailValid: emailValid,
                    messageValid: messageValid,
                  }, this.validateForm);
  }

  validateForm() {   
    this.setState((state, props) => ({
      formValid: 
          (this.state.nameValid && 
          this.state.mobileNumberValid &&
          this.state.emailValid && 
          this.state.messageValid && 
          this.state.isCaptchaVerified)
    }));
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = async (event) => {  
   
    event.preventDefault();     

    let data = JSON.stringify({
      BusinessId: this.state.businessId,
      ComplainTypeId: parseInt(this.state.complainTypeId),
      FullName: this.state.name,
      Email: this.state.email,
      MobileNumber: this.state.mobileNumber,
      ComplainDetails: this.state.message,
    });

    await axiosbase.post(SAVECOMPLAIN, data)
    .then(res => {      
      this.props.showSuccessSnackbar(FEEDBACKMESSAGE);
      
      //clear form inputs
      this.clearValues();
      //reset captcha
      this.resetCaptcha();

    }).catch(error => { 
      var msg ="";
      error.response.data.errorList.map((filterItem) => {
        msg += `${filterItem.errorDescription} <br/>`;
      });   
      this.props.showErrorSnackbar(msg);
    });  

  }

  clearValues = (event) => {    
    const emptyValue = '';

    this.setState({
      complainTypeId: 1,
      
      name: emptyValue,
      mobileNumber: emptyValue,
      email: emptyValue,    
      message: emptyValue,

      formValid: false,
      nameValid: false,
      mobileNumberValid: false,
      emailValid: false,
      messageValid: false,
      isCaptchaVerified: false,
    });
  }


  // captcha handlers start
  //https://www.npmjs.com/package/react-recaptcha
  onloadCapcha = () => {
    console.log("captcha loaded successfully.")
  }

  verifyCallback = (response) => {
    if(response){
      this.setState({
        isCaptchaVerified :true,
      }, this.validateForm);     
    }
  } 

  setCaptchaRef = (ref) => {
    if (ref) {
      return this.captcha = ref;
    }
  };

   resetCaptcha = () => {
    this.captcha.reset();
  }
  // captcha handlers end
  
  render () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit} method="post" role="form">   
      <div className="col-md-6 col-sm-12">
      <div className="post-comment">
      <h3>{commentConfig.pagetTile}</h3>

        <form role="form">

        <div className="form-group"> 
        <label>{commentConfig.complainType} </label>
        <select value={this.state.complainTypeId}
              onChange={(e) => this.setState({complainTypeId: e.target.value})} className="form-control">
        {this.state.complains.map((complain) => <option key={complain.value} value={complain.value}>{complain.display}</option>)}
         </select>
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>                                   
          <label>{commentConfig.name} <span className="color-red">*</span></label>
          <input type="text" required className="form-control"                                            
                                            name="name"
                                            placeholder={commentConfig.name}
                                            value={this.state.name}
                                            maxLength="50"
                                            onChange={this.handleUserInput}/>
                                      </div>
          
        <div className={`form-group ${this.errorClass(this.state.formErrors.mobileNumber)}`}>         
          <label>{commentConfig.mobileNumber}</label>          
          <PhoneInput className="form-control"
                                          name="mobileNumber"
                                          value={this.state.mobileNumber}
                                          onChange={this.handleUserInput}                                          
                                          placeholder={commentConfig.mobileNumber}/>
          </div>
          
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>                                    
          <label>{commentConfig.email} <span className="color-red">*</span></label>
          <input type="email" required className="form-control" 
                                            name="email"
                                            maxLength="50"
                                            placeholder={commentConfig.email}
                                            value={this.state.email}
                                            onChange={(event)=>this.handleUserInput(event, true)}  />                                        
                                    </div>
          
          <div className={`form-group ${this.errorClass(this.state.formErrors.message)}`}>                                    
          <label>{commentConfig.message} <span className="color-red">*</span></label>
          <textarea className="form-control" rows="8"
                                          name="message"
                                          maxLength="900"
                                          value={this.state.message}
                                          onChange={this.handleUserInput} 
                                          ></textarea>
          </div>
          <div className="form-group">
          <Recaptcha   
            ref={(r) => this.setCaptchaRef(r) }       
            sitekey={commentConfig.captchaAPIKey}
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.onloadCapcha}            
            /> 
          </div>
          <p>
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
          {commentConfig.btnPostAComplain}  
          </button>                                  
          </p>
        </form>
      </div>
    </div> 
    </form>
    )
  }
}

Comment.propTypes = {
  complainTypeId: PropTypes.number,
  name: PropTypes.string,
  mobileNumber: PropTypes.string,
  email: PropTypes.string,   
  message: PropTypes.string,  
}

const mapState = (state, ownProps) => {
  return {
  
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
)(Comment);

