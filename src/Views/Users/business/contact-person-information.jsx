import React from 'react'
import PropTypes from 'prop-types';
import { SAVEBUSINESSCONTACTDETAIL } from '../../../Services/AppService'
import axiosbase from '../../../Services/BaseServices/axiosbaseconfig';
import { showSuccessSnackbar, showErrorSnackbar } from '../../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PhoneInput from '../../../Components/PhoneInput'
import { SUCCESSMESSAGE ,ERRORMESSAGE } from './../../../Helpers/app-const';

const contactConfig = {
    pageTitle:"Contact Person Details",
    contactPersonEnglishName :"Contact Person English Name",
    contactPersonArabicName :"Contact Person Arabic Name",
    contactPersonMobile :"Contact Person Mobile",
    contactPersonEmail :"Contact Person Email",   
}

class ContactPersonInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contactPersonEnglishName :'',
            contactPersonArabicName :'',
            contactPersonMobile :'',
            contactPersonEmail :'',

            formValid: false,
            contactPersonEnglishNameValid : false,
            contactPersonArabicNameValid : false,
            contactPersonMobileValid : false,
            contactPersonEmailValid : false,

            formErrors: {
                contactPersonEnglishName: '',
                contactPersonArabicName: '',
                contactPersonMobile: '',
                contactPersonEmail: '',
            },
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);      
      }

      handleUserInput = (e, istrim) => {
        const name = e.target.name;       
        const value = istrim && istrim === true ? e.target.value.replace(/\s/g, '') : e.target.value; 
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
    
    validateField(fieldName, value) {                
        let fieldValidationErrors = this.state.formErrors;
        let contactPersonEnglishNameValid = this.state.contactPersonEnglishNameValid;
        let contactPersonArabicNameValid = this.state.contactPersonArabicNameValid;
        let contactPersonMobileValid = this.state.contactPersonMobileValid;
        let contactPersonEmailValid = this.state.contactPersonEmailValid;

        switch(fieldName) {
          case 'contactPersonEnglishName':
            contactPersonEnglishNameValid = value ? true : false;  
            fieldValidationErrors.contactPersonEnglishName = contactPersonEnglishNameValid ? '' : ' is invalid';          
          break;
          case 'contactPersonArabicName': 
            contactPersonArabicNameValid = value ? true : false;  
            fieldValidationErrors.contactPersonArabicName = contactPersonArabicNameValid ? '' : ' is invalid';          
          break;
          case 'contactPersonMobile':             
            var str = value;
            contactPersonMobileValid = str.replace(/ /g, "").length === 10 ? true : false;  
            fieldValidationErrors.contactPersonMobile = contactPersonMobileValid ? '' : ' is invalid';          
          break;
          case 'contactPersonEmail': 
            contactPersonEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.contactPersonEmail = contactPersonEmailValid ? '': ' is invalid';           
          break;           
          default:
            break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
            contactPersonEnglishNameValid: contactPersonEnglishNameValid,
            contactPersonArabicNameValid: contactPersonArabicNameValid,
            contactPersonMobileValid: contactPersonMobileValid,
            contactPersonEmailValid: contactPersonEmailValid,
                      }, this.validateForm);
    }

    validateForm = () => {        
        this.setState((state, props) => ({
          formValid: 
          ( 
              this.state.contactPersonEnglishNameValid
              && this.state.contactPersonArabicNameValid
              && this.state.contactPersonMobileValid 
              && this.state.contactPersonEmailValid)
        }));
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

    handleSubmit  = async (event) =>  {
        
        event.preventDefault();      
        let data = JSON.stringify({
          Id: this.props.businessData.businessId,
          ContactPersonEnglishName: this.state.contactPersonEnglishName,
          ContactPersonArabicName: this.state.contactPersonArabicName,
          ContactPersonEmail: this.state.contactPersonEmail,
          ContactPersonMobile: this.state.contactPersonMobile,
        });
      
        await axiosbase.post(SAVEBUSINESSCONTACTDETAIL, data)
        .then(res => { 
            this.props.showSuccessSnackbar(SUCCESSMESSAGE);    
          }).catch(error => {
            this.props.showErrorSnackbar(ERRORMESSAGE); 
          });  
    }
    
    componentDidMount() { 
        this.setState({
            contactPersonEnglishName : this.props.businessInfo.contactPersonEnglishName,
            contactPersonArabicName : this.props.businessInfo.contactPersonArabicName,
            contactPersonMobile : this.props.businessInfo.contactPersonMobile,
            contactPersonEmail : this.props.businessInfo.contactPersonEmail,             

            contactPersonEnglishNameValid : this.props.businessInfo.contactPersonEnglishName ? true : false,
            contactPersonArabicNameValid : this.props.businessInfo.contactPersonArabicName ? true : false,
            contactPersonMobileValid : this.props.businessInfo.contactPersonMobile ? true : false,
            contactPersonEmailValid : this.props.businessInfo.contactPersonEmail ? true : false,
        });
    }

    render(){
        return (
            <div>
            <h3 style={{color: "#E26A6A"}}><strong> {contactConfig.pageTitle}</strong></h3>           
            <hr/>          
            <form id="contactpersonform" className="" role="form" onSubmit={this.handleSubmit}>
            
            <div className={`form-group ${this.errorClass(this.state.formErrors.contactPersonEnglishName)}`}>
                    <label className="control-label">{contactConfig.contactPersonEnglishName}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="contactPersonEnglishName"
                    value={this.state.contactPersonEnglishName}
                    placeholder={contactConfig.contactPersonEnglishName}     
                    maxLength="100"                    
                    onChange={this.handleUserInput}/>
                </div>
            
                <div className={`form-group ${this.errorClass(this.state.formErrors.contactPersonArabicName)}`}>
                    <label className="control-label">{contactConfig.contactPersonArabicName}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="contactPersonArabicName"
                    value={this.state.contactPersonArabicName}
                    placeholder={contactConfig.contactPersonArabicName} 
                    maxLength="100"                   
                    onChange={this.handleUserInput}/>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.contactPersonMobile)}`}>
                    <label className="control-label">{contactConfig.contactPersonMobile}</label>
                    <PhoneInput className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                          name="contactPersonMobile"
                                          value={this.state.contactPersonMobile}
                                          onChange={this.handleUserInput}
                                          placeholder={contactConfig.contactPersonMobile}     
                    />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.contactPersonEmail)}`}>
                    <label className="control-label">{contactConfig.contactPersonEmail}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="contactPersonEmail"
                    value={this.state.contactPersonEmail}
                    placeholder={contactConfig.contactPersonEmail}                
                    maxLength="50" 
                    onChange={(event)=>this.handleUserInput(event,true)}/>
                </div>

                <div className="margin-top-10">
                    <button type="submit" className="btn green" disabled={!this.state.formValid}>Save Details </button>
                </div>

            </form>
            
            </div>
        );
    };
}

ContactPersonInformation.propTypes = { 
  contactPersonEnglishName: PropTypes.string,
  contactPersonArabicName: PropTypes.string,
  contactPersonMobile: PropTypes.string,
  contactPersonEmail: PropTypes.string,   
}

const mapState = (state, ownProps) => {	
	return {
		
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
  )(ContactPersonInformation);