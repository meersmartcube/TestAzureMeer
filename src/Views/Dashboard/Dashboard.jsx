import React from 'react';
import List from './List';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
import  GooglePlacesAutocomplete  from 'react-google-places-autocomplete';
import { geocodeByPlaceId, getLatLng  } from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
import {Business} from '../../Services/Business';
import { signOut } from '../../actions/index';
import { showSuccessSnackbar, showErrorSnackbar } from '../../actions/snackbarActions';
import { showSpinner,hideSpinner } from '../../actions/spinnerAction';
import { Form } from 'react-bootstrap';
import Moment from 'react-moment';
import{GOOGLEMAPKEY} from '../../Helpers/app-const';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { PLEASESELECTCATEGORY } from '../../Helpers/app-const'
const checkboxStyle = {
	position: "absolute",
    clip: "rect(0,0,0,0)",
    pointerEvents: "none",
};

const constValues = {
	radius: 3,
	mapStatusOpen: 'Open',
	mapStatusClose: 'Close',
	currentLocation: 'Current Location',
};

const mapStyles = {
    width: '100%',
	height: '500px',	
    minHeight: '190px',
};

const divStyle = {
	paddingRight: "0px"
};

const mapdiv = { 
	height:'500px',
	width:"100%",
};

class Dashboard extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
			lstBusiness: [],
			stores: [],//[{latitude: 25.276987, longitude: 55.296249},],
			categorySelected: [],
			initiallng:55.3407783,
			initiallat:25.2806938,
			lng:0,
			lat:0,
			currentLocToggle:true,
			showingInfoWindow: false,  //Hides or the shows the infoWindow
  		    activeMarker: {},          //Shows the active marker upon click
			selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker			
			categoryList: [
					{ id: '1', englishName: 'Wholesale and Retail Trade', arabicName: 'تجارة الجملة والتجزئة',themeColor:'red-stripe' },
					{ id: '2', englishName: 'Construction', arabicName: 'اعمال بناء',themeColor:'yellow-stripe' },
					{ id: '3', englishName: 'Manufacturing', arabicName: 'المصانع',themeColor:'purple-stripe' },
					{ id: '4', englishName: 'Offices and office buildings', arabicName: 'المكاتب والمباني المكتبية' ,themeColor:'blue-stripe'},
					{ id: '5', englishName: 'Social Welfare Services', arabicName: 'خدمات الرعاية الاجتماعية' ,themeColor:'blue-stripe'},
			]			   
		}
		
		this.props.signOut();	
	  } 
		

		displayMarkers = () => {
			return this.state.stores.map((store, index) => {
			  return <Marker key={index} id={index} position={{
			   lat: store.latitude,
			   lng: store.longitude
			 }}	
			 icon= {store.status === constValues.mapStatusOpen ? {
				url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
			} : store.status === constValues.mapStatusClose ? {
				url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			} : store.status === '' ? {
				url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
			} : ''}		
			 onClick={this.onMarkerClick}
			 title={store.name}
			 name={store.name}
			 status={store.status}
			 from={store.from}
			 to={store.to}
			 start={store.start}
			 end={store.end}
			 item={store.item}
			 />
			})
		  }
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


	getLatLong = async (placeId) => {
		if(!this.state.currentLocToggle){
		 this.currentLocRef.checked=false;
			this.setState({currentLocToggle:true });
		}		
		if(this.state.categorySelected.length === 0){
			this.showSnackBar();
		}
		console.log(this.state.categorySelected);	
  		geocodeByPlaceId(placeId)
  		.then(results => getLatLng(results[0]))
 		.then(({ lat, lng }) =>{
		// will get data
		this.setState((state,prev)=>({
			lat: lat 
			,lng: lng,
			initiallat:lat,
			initiallng:lng
			}));
			if(this.state.categorySelected.length !== 0){
			this.getBusinessList(lng,lat);
			}
		
		}
    );
   }

   getBusinessList =(lng,lat) => {	   
	   if(this.state.categorySelected.length === 0){
		this.setState({ lstBusiness :[]});
		this.setCurrentMarker(lat,lng);
	   } else{

		Business.getBylatlongcatId(lat,lng,constValues.radius,this.state.categorySelected.map((item)=>{ return parseInt(item) }))
		.then(
			result => {	
				this.props.showSpinner(); 
				this.setState({ lstBusiness :[]});	
				if(result.businesses && result.businesses.length > 0){
					this.setState({ lstBusiness :result.businesses});
				console.log(result.businesses);
				const items = []
				let currentObject={
					latitude:lat,
					longitude:lng,
					name:constValues.currentLocation,
					status:'',
					from:'',
					to:'',
					start:'',
					end:'',
					item:0,
				}
			items.push(currentObject);
			result.businesses.map((value, index) => {
				let lstObject={
					latitude:value.latitude,
					longitude:value.longitude,
					name:value.englishName,
					status:value.customStatus === 1 ? constValues.mapStatusOpen : constValues.mapStatusClose,
					from:value.dateFrom,
			 		to:value.dateTo,
					start:value.startTime,
					end:value.endTime,
					item:value.id,
				}
				items.push(lstObject);
			  })

			  this.setState({ stores:items });
			
			} else{
			
			this.setCurrentMarker(lat,lng);
			}
		},
		error => {
			setTimeout(() => {
				this.props.hideSpinner();
			}, 1000);
		});
		
		setTimeout(() => {
			this.props.hideSpinner();
		}, 1000);
	}
}

setCurrentMarker=(lat,lng)=>{
	const items = []
			let currentObject={
				latitude:lat,
				longitude:lng,
				name:constValues.currentLocation,
				status:'',
				from:'',
			    to:'',
				start:'',
				end:'',
				item:0,
			}
			items.push(currentObject);
			this.setState({ stores:items });
}

   showSnackBar =() => {	
		this.props.showSuccessSnackbar(PLEASESELECTCATEGORY); 
  	}
 
	
	async componentDidMount() {		
		// await  axiosbase.get(weatherforecast)
		//   .then(res => {
		// 	  debugger
		// 	const persons = res.data;			
		// 	this.setState({ persons });
		//   });			 
	  }

	  tabActive = (tabNo) => {
		return this.state.categorySelected.includes(tabNo) ? false : true;
	  }

	  selectCategory = (tabNo) => {		
		let category=[];
		category=this.state.categorySelected;
		let index=category.indexOf(tabNo);
		this.state.categorySelected.includes(tabNo) ? category.splice(index,1): category.push(tabNo);
		this.setState({
			categorySelected: category,
		});
		if(this.state.lng !== 0 && this.state.lat !== 0 ){

		this.getBusinessList(this.state.lng,this.state.lat);
		}
	  }

	  selectMyLocation=()=>{
		if (navigator.geolocation) {
			console.log(navigator.geolocation.getCurrentPosition(this.showPosition));
		  } else { 
			//alert('not supported');
		  }
	  }
	  showPosition=(position)=>{
		this.setState((state,prev)=>({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			initiallat:position.coords.latitude,
			initiallng:position.coords.longitude
		   }));
		if(this.state.categorySelected.length === 0){
			this.showSnackBar();
			return false;			
	   }else{
		 this.getBusinessList(position.coords.longitude,position.coords.latitude);
		
		 this.locationRef.changeValue("");
	   }
	}	

	render(){
		
		return(			
			<div className="container">  
				<div className="row margin-bottom-30 margin-top-10">         
					<div className="col-md-12">						
						<div className="content-page">
							
							<div className="portlet">
								<div className="portlet-body">
									<h4>Select Categories</h4>
									<div className="clearfix">
										<div  data-toggle="buttons">
											{
												this.state.categoryList.map((item)=>{
													return (
															<label key={item.id}
																style={{margin:"0 4px 4px 0"}} 
																className={this.tabActive(item.id) ? 
																`btn btn-default btn-lg ${item.themeColor}` : `btn btn-default btn-lg ${item.themeColor} active`}>

															<input 
																style={checkboxStyle} 
																type="checkbox" 
																className="toggle" 
																name="myCheckbox"
																onChange={() => { this.selectCategory(item.id);	}}
																checked={this.state.categorySelected.includes(item.id)}	
																/> 
																{item.englishName} 
															</label>
													)
												})
											}									
										</div>
									</div>
								</div>
							</div>

							<div className="row">
							
								<div className="col-md-10 col-sm-12 col-xs-12" style={divStyle}>
									<form action="#" className="content-search-view2">
										<div className="input-group">
										<GooglePlacesAutocomplete
										ref={(instance) => { this.locationRef = instance }}
											onSelect={({ place_id }) => (
												this.getLatLong( place_id )
											)}
										/>
										</div>
									</form>
								</div>
								<div className="col-md-2 col-sm-12 col-xs-12" style={{alignSelf:'center'}}>								
								<Form.Check 								
									type="switch"
									id="custom-switch"
									label={constValues.currentLocation}
									defaultChecked={!this.state.currentLocToggle}
									ref={(instance) => { this.currentLocRef = instance }}
									onChange={() => {
										this.setState({currentLocToggle:!this.state.currentLocToggle});
										if(this.state.currentLocToggle){
											this.selectMyLocation();
										}
									}}
								/>
									</div>

								</div>
								<div className="row">

								<div className="col-md-12 col-sm-12" style={mapdiv}>
									<Map
									ref="map"
									google={this.props.google}
									zoom={14}
									style={mapStyles}
									initialCenter={{ lat:this.state.initiallat, lng:this.state.initiallng}}
									center={{ lat:this.state.initiallat, lng:this.state.initiallng}}
									>
									{this.displayMarkers()}
									
									<InfoWindow
										marker={this.state.activeMarker}
										visible={this.state.showingInfoWindow}
										onClose={this.onClose}
										>
										<div id="mydiv">
										{
										this.state.selectedPlace.name === constValues.currentLocation ?
										<h4><b>{this.state.selectedPlace.name}</b></h4> :
										<a  href={`/Detail/${this.state.selectedPlace.item}`}> <h4><b>{this.state.selectedPlace.name}</b></h4>  </a> 
										// <BrowserRouter>
										//  <Link to={`/Detail/${this.state.selectedPlace.item}`}><h4><b>{this.state.selectedPlace.name}</b></h4></Link>
										// </BrowserRouter>
										 }
											{ this.state.selectedPlace.name === constValues.currentLocation ? 
												""									
												:  <strong style={{color : this.state.selectedPlace.status === constValues.mapStatusOpen ? 'green' : 'red', textAlign:"center" }}><b>Status</b>: {this.state.selectedPlace.status} </strong>
											}
											{
												this.state.selectedPlace.name === constValues.currentLocation ? 
												""									
												: this.state.selectedPlace.from && this.state.selectedPlace.to?  
											<p style={{margin:"0 0 3px 0"}}><i className="fa fa-clock-o"></i> <b><strong>Schedule</strong></b>:  <Moment format="DD-MM-YYYY" withTitle>{this.state.selectedPlace.from}</Moment> - <Moment format="DD-MM-YYYY" withTitle>{this.state.selectedPlace.to}</Moment> </p> :""
											}
											{
												this.state.selectedPlace.name === constValues.currentLocation ? 
												""									
												: this.state.selectedPlace.start && this.state.selectedPlace.end ?  
												<p><i className="fa fa-clock-o"></i> <b><strong>Time</strong></b>: {this.state.selectedPlace.start} - {this.state.selectedPlace.end} </p> : ""
											}
										</div>
										</InfoWindow>
									</Map>									
								</div>
							</div>

						</div>
					</div>     
				</div>
				<br/>
			 { this.state.lstBusiness.length > 0 ? <List lists={this.state.lstBusiness}/> : ""	}<br/>
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
		showSpinner,
		hideSpinner,
		signOut,
	  },
	  dispatch
	)
  }
  
  const WrappedContainer = GoogleApiWrapper({
    apiKey: GOOGLEMAPKEY
  })(Dashboard);
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(WrappedContainer);
