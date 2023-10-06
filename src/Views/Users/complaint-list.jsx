import React from 'react'
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { GETCOMPLAINS, GETLOOKUP } from '../../Services/AppService'
import Moment from 'react-moment';
import PaginatedLists from '../../Components/PaginatedLists';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { showSpinner, hideSpinner } from '../../actions/spinnerAction'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'

const lookupCode = { 
	complainTypes : 3
};

class ComplaintList extends React.Component {    
    constructor(props) {
        super(props);
		
		this.state = {
      complainList: [], 
      complainsType: []        	  
		  };
    }	

    async componentDidMount(){    
      
      let data = JSON.stringify({
        Code: lookupCode.complainTypes,     
      });
  
      await axiosbase.post(GETLOOKUP, data)
      .then(res => {   
        this.props.showSpinner();     
        this.setState({        
          complainsType : res.data.lookups
        });        
      }).catch(error => { 
        //this.props.showErrorSnackbar("Something went wrong!"); 
      }); 

		const businessId = this.props.businessData.businessId;
		data = JSON.stringify({			
			BusinessId: businessId,
    });
          
    await axiosbase.post(`${GETCOMPLAINS}`,data)
    .then(res => { 
      this.props.showSpinner();            
      this.setState((state, props) => ({                
          complainList : res.data
      }));          
    }).catch(error => {
        //this.props.showErrorSnackbar("Something went wrong!"); 
    }); 
    
    setTimeout(() => {
      this.props.hideSpinner();      
    }, 1000);    
  }    
    
  render() {
        if(this.state.complainList.length === 0){
          return (
            <div class="container">
            <div className="row">        
              <div className="col-md-12 col-sm-12">
              <br/>
                <h3> 
                  <Alert variant="success">
                    Complaints are not available.
                  </Alert> 
                </h3>                  
               </div>
            </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
          );
        }
    return (
        <div class="container">
        <div className="row">        
          <div className="col-md-12 col-sm-12">
              <br/>
              <h1 style={{textAlign:"center"}}><i class="fa fa-commenting-o" aria-hidden="true" style={{fontSize:"30px"}}></i> &nbsp;Complaints</h1>                                 
              <hr/>
              <PaginatedLists 
                lists={this.state.complainList}
                itemsPerPage={9}
                render={(paginatedLists) => (
                  <CardColumns>
                    {paginatedLists.map((item, id) => {                                           
                      return(                
                        <div>
                            <Card border="primary" style={{ width: '20rem' }}>
                                <Card.Header> 
                                   <stong>
                                     <i class="fa fa-user-o" aria-hidden="true"></i>&nbsp;&nbsp;
                                      {item.fullName}
                                    </stong> 
                                </Card.Header>
                                <Card.Body>
                                   <Card.Title>                                 
                                     <h4> <strong> {item.complainTypeId ? this.state.complainsType.find(x => x.id === item.complainTypeId).englishName : '' }
                                    </strong> </h4>
                                    </Card.Title>
                                  <Card.Text>                                  
                                  {/* <h4>
                                    <i class="fa fa-envelope" aria-hidden="true"></i> {item.email}
                                  </h4>                                    */}
                                   {/* <h5> 
                                    <i class="fa fa-mobile" aria-hidden="true" style={{ fontSize: "24px"}}></i>&nbsp;&nbsp;
                                    {item.mobileNumber}
                                   </h5>  */}

                                   <h4>
                                   <i class="fa fa-commenting" aria-hidden="true" style={{ fontSize: "16px"}}></i> {item.complainDetails}
                                  </h4> 
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  <strong> 
                                    <Moment fromNow>
                                        {item.insertDate}
                                    </Moment>	
                                  </strong>&nbsp;&nbsp;
                                  <Moment format="DD-MM-YYYY HH:mm a" withTitle>
                                    {item.insertDate}
                                  </Moment>                                 
                                </Card.Footer>
                              </Card>
                         </div>                  
                        );                     
                    })}
                </CardColumns>
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
    hideSpinner
	  },
	  dispatch
	)
  } 
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(ComplaintList);