import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Comment from './Comment';
import { Map, GoogleApiWrapper, Marker,InfoWindow  } from 'google-maps-react';
import Moment from 'react-moment';
import {Business} from '../../Services/Business';
import { GOOGLEMAPKEY } from '../../Helpers/app-const';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const mapStyles = {
    width: '100%',
	height: '500px',	
    minHeight: '190px',
  };
  const mapdiv = { 
	   height:'500px',
       width:"100%",
};

class Detail extends React.Component {  
  
    constructor(props) {
        super(props);
		
		this.state = {
		  key: 1,
		  itemDetail: {},		 
		  toggle: true,
		  stores: [],
		  initiallng:55.296249,
		  initiallat:25.276987,
		  showingInfoWindow: false,  //Hides or the shows the infoWindow
  		  activeMarker: {},          //Shows the active marker upon click
   		  selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };
		this.handleSelect = this.handleSelect.bind(this);			
	  }
	  
	  displayMarkers = () => {
		return this.state.stores.map((store, index) => {
		  return <Marker key={index} id={index} position={{
		   lat: store.latitude,
		   lng: store.longitude
		 }}
		 icon= {store.status === 'Open' ? {
			url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		} : store.status === 'Close' ? {
			url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		} : ''}
		 onClick={this.onMarkerClick}
			 title={store.name}
			 name={store.name}
		 />
		})
	  }

	   //new 
	   onMarkerClick = (props, marker, e) =>{
		this.setState({
		  selectedPlace: props,
		  activeMarker: marker,
		  showingInfoWindow: true
		});
	  }
	  
	  onClose = props => {
		if (this.state.showingInfoWindow) {
		  this.setState({
			showingInfoWindow: false,
			activeMarker: null
		  });
		}
	  };
	  
		//end
	
	  componentDidMount () {
		  const { match: { params } } = this.props;
		  console.log(params.id);
		  let businessId=0;
		  if(params.id){
			businessId = parseInt(params.id);
		  } else{
			businessId = this.props.location.state?.itemDetail.id
		  }
if(businessId > 0){

	Business.getBusinessById(businessId)
		.then(result => {
     if(result && result.business){
		 
		const items = []
		const markerPoint={
			latitude : result.business.latitude,
			longitude : result.business.longitude,
			name:result.business.englishName,
			status:result.business.customStatus === 1 ? "Open":"Close",
		}
		items.push(markerPoint);
		//this.setState({stores : items});

	this.setState((state, props) => ({
		itemDetail : result.business,
		stores : items,
		initiallat:result.business.latitude,
		initiallng:result.business.longitude
	}));

			}
		});
		}
		window.scrollTo(0, 0)
		
	  }

	  componentDidUpdate(){
		//console.log(this.state.itemDetail);
		}

      handleSelect(key) {
        //console.log('selected' + key);
        this.setState({ key: key });
	  }
	  
	  onToggleHandler = (event) => {		
		this.setState(prevState => ({ toggle: !prevState.toggle }));		
		this.showSnackBar();
	  }

	 
	  showSnackBar =() => {
		
		this.hideSnackBar();
		var msg="You have check-in";
		if(this.state.toggle){
			msg="You have check-in";
		}
		else{
			msg="You have check-Out";
		}
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerText=msg;
		this.myVar = setTimeout(function(){     
		   x.className = x.className.replace("show", "");       
		}, 3000);
	  }

	  hideSnackBar = () => {
		clearTimeout(this.myVar);
	  }	

      render() {
		  
        return (
			
        <div className="container">
       
        <div className="row margin-bottom-30 margin-top-20">
        
			<div className="col-md-12">
		      <h1 style={{textAlign:"center"}}>{this.state.itemDetail.englishName}</h1>
			  <p style={{textAlign:"center"}}>{this.state.itemDetail.businessCategoryId === 1 ? "Grocery" : this.state.itemDetail.businessCategoryId === 2 ? "Pharmacy" :  this.state.itemDetail.businessCategoryId === 3 ? "Bakery" :  this.state.itemDetail.businessCategoryId === 4 ? "Restaurant" :  this.state.itemDetail.businessCategoryId === 5 ? "Hospital" :  ""   }</p>
				<div style={{textAlign:"center"}} className="clearfix">
				<button type="button" style={{cursor:"default"}} className={`btn business-status ${this.state.itemDetail.customStatus === 1  ?'green':'red'}`}> {this.state.itemDetail.customStatus === 1 ? "OPEN":"CLOSE"} </button>
		{/* <button type="button" className={`btn business-status ${this.state.toggle?'green':'red'}`} onClick={()=> this.onToggleHandler()}> {this.state.toggle?"OPEN":"CLOSE"} </button> */}
				</div>
				<p style={{textAlign:"center"}} className="margin-top-20">{this.state.itemDetail.streetAddress}</p>
					<div className="portlet">
						<ul className="blog-info">
						<h4>Working hours</h4>
						{ this.state.itemDetail.dateFrom ? <li><i className="fa fa-clock-o"></i><Moment format="DD-MM-YYYY" withTitle>{this.state.itemDetail.dateFrom}</Moment>  &nbsp; {this.state.itemDetail.startTime}  -  {this.state.itemDetail.endTime}</li> : "" }
						{ this.state.itemDetail.dateTo ? <li><i className="fa fa-clock-o"></i><Moment format="DD-MM-YYYY" withTitle>{this.state.itemDetail.dateTo}</Moment>  &nbsp; {this.state.itemDetail.startTime}  -  {this.state.itemDetail.endTime}</li> : "" }
					  </ul>
					</div>
					 
                    <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                      <Tab eventKey={1} title={<span><i style={{fontSize:"25px",padding: "15px 40px 5px 40px"}}  className=" fa fa-map-marker" /> </span>}>          
                      
							<div className="col-md-12" style={mapdiv}>
							<Map
							ref="map"
									google={this.props.google}
									zoom={14}
									style={mapStyles}
									center={{ lat:this.state.initiallat, lng: this.state.initiallng}}
									>
									{this.displayMarkers()}
									<InfoWindow
										marker={this.state.activeMarker}
										visible={this.state.showingInfoWindow}
										onClose={this.onClose}
										>
										<div>
											<h4>{this.state.selectedPlace.name}</h4>
										</div>
										</InfoWindow>
									</Map>
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d32416.313351828867!2d55.27949702614966!3d25.20468602917598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1587374621426!5m2!1sen!2sae" height="500" width="100%"  frameBorder="0" style={{border:"0"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe> */}
							</div>
						
					    </Tab>

                        <Tab eventKey={2} title={<span><i style={{fontSize:"25px",padding: "15px 40px 5px 40px"}} className="fa fa-commenting-o" /> </span>}>

					
							<Comment businessId={this.props.location.state?.itemDetail.id}/>
					
                        </Tab>
					  </Tabs>  </div>  </div>  </div>
                      
                      )
                    }
				  }
				  
				  const mapState = (state, ownProps) => {	
					return {
						
					}
				  }
				  
				  const mapDispatchToProps = (dispatch, ownProps) => { 
					return bindActionCreators(
					  {

					  },
					  dispatch
					)
				  }

				  const WrappedContainer = GoogleApiWrapper({
					apiKey: GOOGLEMAPKEY
				  })(Detail);
				  
				  export default connect(
					mapState,
					mapDispatchToProps,
					null,
				  )(WrappedContainer);

// export default GoogleApiWrapper({
//     apiKey: GOOGLEMAPKEY
//   })(Detail);
