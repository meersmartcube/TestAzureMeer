import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ChangePassword from './ChangePassword'
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { GETBUSINESSDETAIL } from '../../Services/AppService'
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { showSpinner, hideSpinner } from '../../actions/spinnerAction'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import LicenceDetail from './business/licence-detail';
import TeamAvailability from './business/team-availability';
import AuthorizedPersonDetail from './business/authorized-person-detail';
import ContactPersonInformation from './business/contact-person-information';  
import Location from './business/location';
import CleansingList from './business/cleansing-list'; 

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      businessInfo:{}
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {   
    this.setState({ key: key });
  }

 async componentDidMount(){

  const businessId = this.props.businessData.businessId; 
  let data = JSON.stringify({
    id: businessId,   
  });

  //await axiosbase.get(`${GETBUSINESSBYID}/${businessId}`)
  await axiosbase.post(GETBUSINESSDETAIL, data)
  .then(res => {      
      this.props.showSpinner();
      this.setState((state, props) => ({
        businessInfo : res.data.business
      }));      
      console.log(res.data);     
    }).catch(error => {
      error.response.data.errorList.map((filterItem) => {
        console.log(filterItem.errorDescription);
      });   
      this.props.showErrorSnackbar("Something went wrong!")
    }); 

    setTimeout(() => {
			this.props.hideSpinner();
		}, 1000);

  }

  render() {  
    
    if (!this.state.businessInfo.englishName){
      return (  <div className="container">
        <div className="row margin-top-40"> 
         <div className="col-md-12 col-sm-12">
         <h1>My Profile</h1>  
         </div>
        </div>
      </div> );
    }
    else{
    return (
      <div className="container">
        <div className="row margin-top-40"> 
         <div className="col-md-12 col-sm-12" >
         <h1 style={{textAlign:"center"}}><i class="fa fa-university" aria-hidden="true" style={{fontSize:"30px"}}></i>&nbsp;My Profile</h1>      
       <hr/>
        <Tabs fill variant="tabs" activeKey={this.state.key} onSelect={this.handleSelect}>         
          
          <Tab eventKey={1} title="Licence Details">          
            <LicenceDetail businessInfo={this.state.businessInfo}/>
          </Tab>

          <Tab eventKey={2} title="Team Availability">          
            <TeamAvailability businessInfo={this.state.businessInfo}/>
          </Tab>

          <Tab eventKey={3} title="Authorized Person Details">          
            <AuthorizedPersonDetail businessInfo={this.state.businessInfo}/>
          </Tab>

          <Tab eventKey={4} title="Contact Person Details">          
            <ContactPersonInformation businessInfo={this.state.businessInfo}/>
          </Tab>

          <Tab eventKey={5} title="Location">          
            <Location businessInfo={this.state.businessInfo}/>           
          </Tab>

          <Tab eventKey={6} title="Cleansing">          
            <CleansingList />
          </Tab>

          <Tab eventKey={7} title="Change Password">          
            <ChangePassword />              
          </Tab>
        </Tabs> 
        
       </div>
      </div>
      <br/> <br/> <br/>
    </div>
    )
    }
  }
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
    showSpinner,
    hideSpinner,
	  },
	  dispatch
	)
  }
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(UserProfile);