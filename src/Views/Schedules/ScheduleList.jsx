
import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import {ScheduleService} from '../../Services/ScheduleService';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

//const events = [{ title: "today's event", date: '2020-04-04 17:30:00', end: new Date(2020, 3, 4, 20, 30, 0)}];
const scheduleConfig = {
    CurrentScheduleLabel:'Current Schedule',
  };
  
  class ScheduleList extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}		

	async componentDidMount() {		
		
		const businessId = this.props.businessData.businessId; 
		if(!businessId){
			businessId =1004;
		}

		ScheduleService.getBusinessesSchedules(businessId)
		.then(
			result => {
				const items = []
				result.schedules.map((value, index) => {
					let lstObject={
						title:value.englishTitle,
						date:new Date(value.dateFrom),
						end:new Date(value.dateTo),
						backgroundColor:value.statusValue === 0 ? 'red' : value.statusValue === 1 ? 'green' :  value.statusValue === 2 ? 'orange' : ''
					}
					items.push(lstObject);
				  })
	
				//  console.log('22eeee',items);
				 this.setState({ events:items });
				
			},
			error => {
			}
		   )
	  }

render(){
    return (        
      <div className="container">
        {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
        <div className="row margin-top-40">
          {/* BEGIN CONTENT  */}
          <div className="col-md-12 col-sm-12" >
            <h1 style={{textAlign:"center"}}>
				<i class="fa fa-calendar" aria-hidden="true" style={{fontSize:"30px"}}></i>
				&nbsp;My Schedules</h1>
			<hr/>
            <div className="content-form-page">
              <div className="row">
					<div className="col-md-12">
						<div className="portlet light calendar">
							{/* <div className="portlet-title">
								<div className="btn-group">
                                <a className="btn btn-fit-height grey-salt" href="/CurrentSchedule">  {scheduleConfig.CurrentScheduleLabel}  </a> 
                                                                  
								</div>
							</div> */}
							<div className="portlet-body">
								<div className="row">
									<div className="col-md-12 col-sm-12">									

                                    <FullCalendar
                                            defaultView="dayGridMonth"
                                            header={{
                                            left: "prev,next,today",
                                            center: "title",
                                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                                            }}
                                            plugins={[dayGridPlugin, timeGridPlugin]}
                                            events={this.state.events}
                                        />
									</div>
								</div>
								{/* <!-- END CALENDAR PORTLET--> */}
							</div>
						</div>
					</div>
				</div>
            </div>
          </div>
          {/* <!-- END CONTENT --> */}
        </div>
        {/* <!-- END SIDEBAR & CONTENT --> */}
      </div>

		);
	 };
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
  )(ScheduleList);