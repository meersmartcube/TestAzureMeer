import React from 'react'
import PropTypes from 'prop-types';
import { SAVEBUSINESSAUTHORIZED } from '../../../Services/AppService'
import axiosbase from '../../../Services/BaseServices/axiosbaseconfig';
import { showSuccessSnackbar, showErrorSnackbar } from '../../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PhoneInput from '../../../Components/PhoneInput'
import { SUCCESSMESSAGE ,ERRORMESSAGE } from './../../../Helpers/app-const';

const authorizedConfig = {
    pageTitle:"Authorized Person Details",
    authorizedPersonEnglishName :"Authorized Person English Name",
    authorizedPersonArabicName :"Authorized Person Arabic Name",
    authorizedPersonMobile :"Authorized Person Mobile",
    authorizedPersonEmail :"Authorized Person Email",   
}

class AuthorizedPersonDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizedPersonEnglishName :'',
            authorizedPersonArabicName :'',
            authorizedPersonMobile :'',
            authorizedPersonEmail :'',

            formValid: false,
            authorizedPersonMobileValid : false,
            authorizedPersonEmailValid : false,

            formErrors: {authorizedPersonEmail: '', authorizedPersonMobile: ''},
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
        let authorizedPersonMobileValid = this.state.authorizedPersonMobileValid;
        let authorizedPersonEmailValid = this.state.authorizedPersonEmailValid;
    debugger
        switch(fieldName) {
          case 'authorizedPersonMobile':   
          var str = value;
            authorizedPersonMobileValid = str.replace(/ /g, "").length === 10 ? true : false;    
            fieldValidationErrors.authorizedPersonMobile = authorizedPersonMobileValid ? '' : ' is invalid';          
            break;
          case 'authorizedPersonEmail': 
            authorizedPersonEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.authorizedPersonEmail = authorizedPersonEmailValid ? '': ' is invalid';           
          break;           
          default:
            break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
            authorizedPersonMobileValid: authorizedPersonMobileValid,
            authorizedPersonEmailValid: authorizedPersonEmailValid,
                      }, this.validateForm);
    }

    validateForm = () => {        
        this.setState((state, props) => ({
          formValid: 
          (this.state.authorizedPersonMobileValid && this.state.authorizedPersonEmailValid)
        }));
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

    handleSubmit  = async (event) =>  {
        
        event.preventDefault();      
        let data = JSON.stringify({
          Id: this.props.businessData.businessId,
          OwnerEmail: this.state.authorizedPersonEmail,
          OwnerMobile:this.state.authorizedPersonMobile,
        });
      
        await axiosbase.post(SAVEBUSINESSAUTHORIZED, data)
        .then(res => { 
            this.props.showSuccessSnackbar(SUCCESSMESSAGE);    
          }).catch(error => {
            this.props.showErrorSnackbar(ERRORMESSAGE); 
          });  
    }
    
    componentDidMount() { 
        this.setState({
            authorizedPersonEnglishName : this.props.businessInfo.ownerEnglishName,
            authorizedPersonArabicName : this.props.businessInfo.ownerArabicName,
            authorizedPersonMobile : this.props.businessInfo.ownerMobile,
            authorizedPersonEmail : this.props.businessInfo.ownerEmail,             

            authorizedPersonMobileValid : this.props.businessInfo.ownerMobile ? true : false,
            authorizedPersonEmailValid : this.props.businessInfo.ownerEmail ? true : false,
        });
    }

    render(){
        return (
            <div>
            <h3 style={{color: "#E26A6A"}}><strong> {authorizedConfig.pageTitle}</strong></h3>           
            <hr/>          
            <form id="authorizedpersonform" className="" role="form" onSubmit={this.handleSubmit}>
            
                <div className='form-group'>
                    <label className="control-label">{authorizedConfig.authorizedPersonEnglishName}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="authorizedPersonEnglishName"
                    value={this.state.authorizedPersonEnglishName}
                    placeholder={authorizedConfig.authorizedPersonEnglishName}
                    disabled
                    onChange={this.handleUserInput}/>
                </div>
            
                <div className='form-group'>
                    <label className="control-label">{authorizedConfig.authorizedPersonArabicName}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="authorizedPersonArabicName"
                    value={this.state.authorizedPersonArabicName}
                    placeholder={authorizedConfig.authorizedPersonArabicName}
                    disabled
                    onChange={this.handleUserInput}/>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.authorizedPersonMobile)}`}>
                    <label className="control-label">{authorizedConfig.authorizedPersonMobile}</label>
                    {/* <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="authorizedPersonMobile"
                    value={this.state.authorizedPersonMobile}
                    placeholder={authorizedConfig.authorizedPersonMobile}                
                    onChange={this.handleUserInput}/> */}

                    <PhoneInput className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                          name="authorizedPersonMobile"
                                          value={this.state.authorizedPersonMobile}
                                          onChange={this.handleUserInput}
                                          placeholder={authorizedConfig.authorizedPersonMobile}     
                    />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.authorizedPersonEmail)}`}>
                    <label className="control-label">{authorizedConfig.authorizedPersonEmail}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="authorizedPersonEmail"
                    value={this.state.authorizedPersonEmail}
                    placeholder={authorizedConfig.authorizedPersonEmail}
                    maxLength="50"                
                    onChange={(event)=>this.handleUserInput(event,true)}/>
                </div>

                <div className="margin-top-10">
                    <button type="submit" className="btn green" disabled={!this.state.formValid}>Save Details </button>
                    &nbsp;
                    {/* <button type="button" className="btn default">Cancel </button> */}
                </div>

            </form>
            
            </div>
        );
    };
}

AuthorizedPersonDetail.propTypes = { 
  authorizedPersonMobile: PropTypes.string,
  authorizedPersonEmail: PropTypes.string,   
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
  )(AuthorizedPersonDetail);