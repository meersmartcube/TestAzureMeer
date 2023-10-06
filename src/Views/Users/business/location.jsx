import React from 'react'
import PropTypes from 'prop-types';
import { SAVEBUSINESSLOCATION } from '../../../Services/AppService'
import axiosbase from '../../../Services/BaseServices/axiosbaseconfig';
import { showSuccessSnackbar, showErrorSnackbar } from '../../../actions/snackbarActions'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Map, GoogleApiWrapper, Marker,InfoWindow  } from 'google-maps-react';
import  { GOOGLEMAPKEY } from  '../../../Helpers/app-const';
import { SUCCESSMESSAGE ,ERRORMESSAGE } from './../../../Helpers/app-const';

const mapStyles = {
    width: '100%',
	height: '500px',	
    minHeight: '190px',
}; 
const mapdiv = { 
    height:'500px',
    width:"100%",
};

const locationConfig = {
    pageTitle :"Location",
    areaLabel :"Area",
    streetAddressLabel :"Street Address",
    latitudeLabel :"Latitude",
    longitudeLabel :"Longitude",
    makaniLabel :"Makani",
}

class Location extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
           formValid: false,
           latitudeValid : false,
           longitudeValid : false,
           makaniValid : false,

           area :'',
           streetAddress :'',
           latitude :'',
           longitude :'',
           makani: '',
           formErrors: {latitude: '', longitude: '',makani: ''},

           markers: [
            {
              name: "Current position",
              position: {
                // lat: 25.2706816,
                // lng: 55.4172416
                lat: this.props.businessInfo.latitude,
                lng: this.props.businessInfo.longitude
              }
            }
          ],

           stores: [],
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    /* Google map related function*/
    displayMarkers = () => {
		return this.state.stores.map((store, index) => {
		  return <Marker key={index} id={index} position={{
		   lat: store.latitude,
		   lng: store.longitude
		 }}
         onClick={this.onMarkerClick}
         draggable={true}
         onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
			 title={store.name}
			 name={store.name}
		 />
		})
	  }
      onMarkerDragEnd = (coord, index) => {
        debugger
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        
        this.setState((state, props) => ({
                latitude :lat.toFixed(3),
                longitude: lng.toFixed(3),
        }));

        this.validateField('latitude',this.state.latitude);
        this.validateField('longitude',this.state.longitude);

        this.setState(prevState => {
          const markers = [...this.state.markers];
          markers[index] = { ...markers[index], position: { lat, lng } };
          return { markers };
        });       

      };
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
    /* Google map related function*/

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
    
    validateField(fieldName, value) {                
        let fieldValidationErrors = this.state.formErrors;
        let latitudeValid = this.state.latitudeValid;
        let longitudeValid = this.state.longitudeValid;
        let makaniValid = this.state.makaniValid;
    
        switch(fieldName) {
          case 'latitude':   
            latitudeValid = value ? value.match(/^\d{1,}(\.\d{0,3})?$/) : false;  
            fieldValidationErrors.latitude = latitudeValid ? '' : ' is invalid';          
            break;
          case 'longitude': 
            longitudeValid = value ? value.match(/^\d{1,}(\.\d{0,3})?$/) : false;
            fieldValidationErrors.longitude = longitudeValid ? '': ' is invalid';           
          break;
            case 'makani':
                makaniValid = value?true:false;
              fieldValidationErrors.makani = makaniValid ? '': ' is invalid';
           break;
          default:
            break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
            latitudeValid: latitudeValid,
            longitudeValid: longitudeValid,
            makaniValid: makaniValid
                      }, this.validateForm);
    }

    validateForm = () => {        
        this.setState((state, props) => ({
          formValid: 
          (this.state.latitudeValid 
            && this.state.longitudeValid 
            && this.state.makaniValid)
        }));
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

    handleSubmit  = async (event) =>  {
        event.preventDefault();      
        let data = JSON.stringify({
          Id: this.props.businessData.businessId,
          Longitude: this.state.longitude.toString(),
          Latitude:this.state.latitude.toString(),
          Makani: this.state.makani,
        });
      
        await axiosbase.post(SAVEBUSINESSLOCATION, data)
        .then(res => {             
            this.props.showSuccessSnackbar(SUCCESSMESSAGE);    
          }).catch(error => { 
            this.props.showErrorSnackbar(ERRORMESSAGE); 
          });  
    }

    componentDidMount() {
        
        //map related staff
        const items = []
		const markerPoint={
			latitude : this.props.businessInfo.latitude,
			longitude : this.props.businessInfo.longitude,
			//name: "test"
		}
		items.push(markerPoint);
        this.setState({stores : items});
        //map related staff

        this.setState({
            area : this.props.businessInfo.area,
            streetAddress : this.props.businessInfo.streetAddress,
            latitude : this.props.businessInfo.latitude,
            longitude : this.props.businessInfo.longitude,             
            makani : this.props.businessInfo.makani,
            
            latitudeValid : this.props.businessInfo.latitude ? true : false,
            longitudeValid : this.props.businessInfo.longitude ? true : false,
            makaniValid : this.props.businessInfo.makani ? true : false,
        });        
    } 

    render(){
        return (
            <div>
            <h3 style={{color: "#E26A6A"}}><strong> {locationConfig.pageTitle}</strong></h3> 
            <hr/>          
            <form id="locationform" className="" role="form" onSubmit={this.handleSubmit}>
            
                <div className='form-group'>
                    <label className="control-label">{locationConfig.areaLabel}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="area"
                    value={this.state.area}
                    placeholder={locationConfig.areaLabel}
                    disabled
                    onChange={this.handleUserInput}/>
                </div>
            
                <div className='form-group'>
                    <label className="control-label">{locationConfig.streetAddressLabel}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="streetAddress"
                    value={this.state.streetAddress}
                    placeholder={locationConfig.streetAddressLabel}
                    disabled
                    onChange={this.handleUserInput}/>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.latitude)}`}>
                    <label className="control-label">{locationConfig.latitudeLabel}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="latitude"                    
                    value={this.state.latitude}
                    placeholder={locationConfig.latitudeLabel}                    
                    onChange={this.handleUserInput}
                    />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.longitude)}`}>
                    <label className="control-label">{locationConfig.longitudeLabel}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="longitude"
                    value={this.state.longitude}
                    placeholder={locationConfig.longitudeLabel}
                     onChange={this.handleUserInput}
                    />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.makani)}`}>
                    <label className="control-label">{locationConfig.makaniLabel}</label>
                    <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    name="makani"
                    value={this.state.makani}
                    placeholder={locationConfig.makaniLabel}  
                    maxLength="90"                  
                    onChange={this.handleUserInput}/>
                </div>
                <div className="row">
                    <div className="col-md-12" style={mapdiv}>
                    <Map
									google={this.props.google}
									zoom={14}
									style={mapStyles}
                                    initialCenter={{ lat: this.props.businessInfo.latitude , lng: this.props.businessInfo.longitude}}
                            		>
                                         {this.state.markers.map((marker, index) => (
                                        <Marker
                                            position={marker.position}
                                            draggable={true}
                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                                            name={marker.name}
                                        />
                                                ))}
                  				</Map>
                    </div>
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
  
  const WrappedContainer = GoogleApiWrapper({
    apiKey: GOOGLEMAPKEY
  })(Location);
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(WrappedContainer);