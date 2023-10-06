import React from 'react';
import axiosbase from '../../Services/BaseServices/axiosbaseconfig';
import { SAVECECKINCHECKOUT, GETBUSINESSDETAIL,GETOPENANDCLOSESTATUS } from '../../Services/AppService'
import Moment from 'react-moment';
import 'moment-timezone';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { SUCCESSMESSAGE, ERRORMESSAGE } from './../../Helpers/app-const';

class CurrentSchedule extends React.Component { 
	
	constructor(props) {
        super(props);
		
		this.state = {
		  toggle: true,
		  businessInfo:{},
		  checkInCheckOutStatus : [],
		  isCurrentAvailable : false, 
		  show:false,
		};
	}	

	handleHideShow = (flag) => {
		this.setState((state, props) => ({ 
			show : flag,
		}));
	};
	
	onToggleHandler = async (event) => {	

		var msg = "";	
		
		//CheckIn = 1,
        //Checkout = 2
		this.setState(prevState => ({ toggle: !prevState.toggle }));		

		const userId = this.props.businessData.userId; 
		const businessId = this.props.businessData.businessId; 

		let data = JSON.stringify({
			UserId: userId,
			BusinessId: businessId,
			LogType: this.state.toggle ? 1 : 2,
		  });
		  
		await axiosbase.post(`${SAVECECKINCHECKOUT}`,data)
		.then(res => {  
			
			this.props.showSuccessSnackbar(SUCCESSMESSAGE);    
		  }).catch(error => {
			this.props.showErrorSnackbar(ERRORMESSAGE);
		  }); 

		
		await axiosbase.post(`${GETOPENANDCLOSESTATUS}`,data)
		.then(res => { 
			this.setState((state, props) => ({ 
				checkInCheckOutStatus : res.data.checkInCheckOutLogs
			}));	

			if(res.data.checkInCheckOutLogs!=null && res.data.checkInCheckOutLogs.length>0){
				this.setState((state, props) => ({ 
				toggle: res.data.checkInCheckOutLogs[0].logType === 1 ? false : true,
				show : false,
				}));
			}
			else{
				this.setState((state, props) => ({ 
					toggle: true,
					show : false,
				}));
			}
		}).catch(error => {           		   
			this.props.showErrorSnackbar("Something went wrong!");
		}); 
		
	  }
	  async componentDidMount(){
	
		this.setState((state, props) => ({
			isCurrentAvailable :  this.props.businessData.currentShceduleId ? true : false
		}));

		const userId = this.props.businessData.userId; 
		const businessId = this.props.businessData.businessId; 

		//Get Business Detail
		let data = JSON.stringify({
			Id: businessId,		
		  });

		await axiosbase.post(`${GETBUSINESSDETAIL}`,data)
		.then(res => { 
		
			this.setState((state, props) => ({
				businessInfo : res.data.business,
				isCurrentAvailable :  res.data.business.scheduleId ? true : false
			}));	  
		}).catch(error => {           		
			this.props.showErrorSnackbar("Something went wrong!");	  
		}); 

		//Get current checkin and checkout
		data = JSON.stringify({
			UserId: userId,
			businessId: businessId,
		});

		await axiosbase.post(`${GETOPENANDCLOSESTATUS}`,data)
		.then(res => { 
			this.setState((state, props) => ({ 
				checkInCheckOutStatus : res.data.checkInCheckOutLogs
			}));	

			if(res.data.checkInCheckOutLogs!=null && res.data.checkInCheckOutLogs.length>0){
				this.setState((state, props) => ({ 
				toggle: res.data.checkInCheckOutLogs[0].logType === 1 ? false : true
				}));
			}
			else{
				this.setState((state, props) => ({ 
					toggle: true
				}));
			}
		}).catch(error => {           		   
			this.props.showErrorSnackbar("Something went wrong!");
		}); 	  
	}	
		
	render() { 
		if(this.state.isCurrentAvailable === false) {
			return (
			    <div className="container">
					<div className="row margin-bottom-30 margin-top-20">          
						<div className="col-md-12">	
							<h3>
								<Alert variant="success">Currently you don't have schedule. </Alert>
							</h3>
						</div>
				 	</div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				</div>
			);
		  } else {
		
		return (
      <div className="container">		 
        {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
        <div className="row margin-bottom-30 margin-top-20">
          {/* <!-- BEGIN CONTENT --> */}
			<div className="col-md-12">					
				<h1 style={{textAlign : "center"}}>{this.state.businessInfo.englishName}</h1>
					<div style={{textAlign : "center"}} className="clearfix margin-bottom-50">
					  <button type="button" className={`btn business-status ${this.state.toggle?'green':'red'}`} onClick={()=> this.handleHideShow(true)}> {this.state.toggle?"OPEN":"CLOSE"} </button>
				</div>
					<div style={{textAlign : "center"}} className="portlet">
						<ul className="blog-info">

						<h3 style={{textAlign : "center"}}>
						{ 

						this.state.checkInCheckOutStatus.map((item)=>{
							return(
								<span key={item.id}>
								<strong> { item.logType===1? " Opened - ":" Closed - "}</strong>
								 <Moment format="DD-MM-YYYY HH:mm a" withTitle>
									{ item.insertDate}
								</Moment>
								 </span>
								 );
							})	
						}						 
										
						</h3>
						<hr/>
						<h3 className="margin-bottom-20">Current Schedule</h3>
						<h4>
							<li>
								 <i className="fa fa-calendar"></i> </li> From &nbsp;&nbsp;
								<strong>
									<Moment format="DD-MM-YYYY" withTitle>
							 			{this.state.businessInfo.dateFrom} 
           							</Moment>								
								</strong> to&nbsp;&nbsp;
								<strong>
									<Moment format="DD-MM-YYYY" withTitle>
										{this.state.businessInfo.dateTo}
           							</Moment>
								</strong>
						</h4>
						<li>
							{
								this.state.businessInfo.startTime ? 
						 			<span>
										 <i className="fa fa-clock-o"></i> {`${this.state.businessInfo.startTime}`}
									</span>
						 		: ''
							}
						</li>

						<li> 
							{
								this.state.businessInfo.endTime ? 
									<span>
										<i className="fa fa-clock-o"></i> {`${this.state.businessInfo.endTime}`}			
									</span>
								: ''
							}
						</li>
					  </ul>
					</div>
			</div>
			
          {/* <!-- END CONTENT --> */}
        </div>
		<br/><br/><br/><br/>

		<Modal 
		show={this.state.show} 
		onHide={()=>this.handleHideShow(false)} 
		style={{display: 'flex !important'}}
		centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to update the current status ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.handleHideShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> this.onToggleHandler()}>
            Confirm
          </Button>
    	    </Modal.Footer>
	      </Modal>

      </div>

        );
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
	  },
	  dispatch
	)
  }
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(CurrentSchedule);