import React from 'react';
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { GETCHECKINCHECKOUTLIST } from '../../Services/AppService';
import Moment from 'react-moment';
import PaginatedLists from '../../Components/PaginatedLists';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions';
import { showSpinner, hideSpinner } from '../../actions/spinnerAction'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Alert from 'react-bootstrap/Alert';

//https://bootsnipp.com/snippets/qAdNQ - example
class ActivityList extends React.Component { 
    serial = 0;
    constructor(props) {
        super(props);
		
		  this.state = {
        activityList: [],
        counter : 1,		  
	  	};
    }	

    async componentDidMount(){

    const userId = this.props.businessData.userId; 
		const businessId = this.props.businessData.businessId;

		let data = JSON.stringify({
			UserId: userId,
			BusinessId: businessId,
    });
          
    await axiosbase.post(`${GETCHECKINCHECKOUTLIST}`,data)
      .then(res => { 
        this.props.showSpinner();
        this.setState((state, props) => ({ 
          counter: 1,
          activityList : res.data.checkInCheckOutLogs
        }));
		  }).catch(error => {         
        // /this.props.showErrorSnackbar("Something went wrong!"); 
      });   

      setTimeout(() => {
        this.props.hideSpinner();      
      }, 1000);        
    }    
    
    render() {
       if(this.state.activityList.length === 0){
          return (
            <div class="container">
            <div className="row">        
              <div className="col-md-12 col-sm-12">
              <br/>
                <h3> 
                  <Alert variant="success">
                    Activity Log are not available.
                  </Alert> 
                </h3>                  
               </div>
            </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        );
      }       
    return (
        <div class="container">
        <div className="row">        
          <div className="col-md-12 col-sm-12">
              <br/>
              <h1 style={{textAlign:"center"}}><i class="fa fa-history" aria-hidden="true" style={{fontSize:"30px"}}></i>&nbsp;Activity Log</h1>  
              <hr/>
              <h2>{this.state.activityList.length === 0 ?              
                <Alert variant="success">
                  Activity Log are not available.
                </Alert>
                  : ''}
              </h2>                  
              <PaginatedLists 
                  lists={this.state.activityList}
                  itemsPerPage={10}
                  render={(paginatedLists) => (
                    <div class="row">
                    {paginatedLists.map((item, id) => {
                        return(                        
                          <div className="container">
                            <div className={`notice ${item.logType === 1?'notice-success':'notice-danger'}`}>
                              <strong>{item.logType === 1? 'Opened': 'Closed'}</strong> 
                              &nbsp;&nbsp;
                              <Moment fromNow>
                                {item.insertDate}
                              </Moment>	
                              &nbsp;&nbsp;
                              <Moment format="DD-MM-YYYY HH:mm a" withTitle>
                                {item.insertDate}
                              </Moment>
                            </div>
                          </div>                                 
                        );                       
                    })}
                </div>
                )}
                />             
            </div>
        </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>            
    </div>        
    )
 };
};

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
  )(ActivityList);