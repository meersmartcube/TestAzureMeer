import React, { useReducer, useState, useEffect } from 'react';
import BusinessRecoveryLogo from '../../../assests/images/logos/BusinessRecoveryLogo.png';
import { Link } from 'react-router-dom';
import { SIGN_OUT } from '../../../actions/types';
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Spinner from '../../../Components/spinner' 
import { useTranslation } from 'react-i18next'
import Form from 'react-bootstrap/Form'
import { signOut } from '../../../actions/index';
import { 
  CURRENTSCHEDULE
  ,SCHEDULELIST
  ,USERPROFILE
  ,ACTIVITYLIST
  ,COMPLAINTLIST
  ,DASHBOARD
  ,BUSINESSOWNERLOGIN
 } from '../../../Helpers/app-const';

const classStyle = {
  addClass: false
};

const toggleBox = () => {
  classStyle.addClass =!classStyle.addClass; 
  var element = document.getElementById("menudiv");
  if(classStyle.addClass){
    element.classList.add("menuaddlogin");
    element.classList.remove("menuaddloginnone");
  } else{
    element.classList.add("menuaddloginnone");
    element.classList.remove("menuaddlogin");
  }
};

const defaultToggleRemove = () => { 
  console.log(window.location.pathname)
  classStyle.addClass =!classStyle.addClass;  
  var element = document.getElementById("menudiv");
  element.classList.add("menuaddloginnone");
  element.classList.remove("menuaddlogin");
}

//reducer for menu selection.
const initialState = {menuState: window.location.pathname.replace('/','').trim()};
  function reducer(state, action) {
    switch (action.type) {
      case CURRENTSCHEDULE:
        return {menuState: CURRENTSCHEDULE};
      case SCHEDULELIST:
        return {menuState: SCHEDULELIST};
      case USERPROFILE:
        return {menuState: USERPROFILE};
      case ACTIVITYLIST:
        return {menuState: ACTIVITYLIST};
      case COMPLAINTLIST:
        return {menuState: COMPLAINTLIST};
      default:
        throw new Error();
    }
  }

const Header = () => {    
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);  
  const auth = useSelector(state => state.auth);
  const [togggle,setToggle] = useState(false);
  
  function handleLogout() {
    dispatch({ type : SIGN_OUT }); 
    window.location.href= `/${BUSINESSOWNERLOGIN}`;
  }  
 
  const changeLanguage = (event) => {    
    setToggle(!togggle);
    if(togggle){
      i18n.changeLanguage('en')      
    }
    else{
      i18n.changeLanguage('ar')
    }
  }

  if(window.location.pathname.replace('/','').trim() == DASHBOARD)        
  {
      signOut();     
  }

  if (auth.isSignedIn) { // for business user
    return (
          <div className="header">   
          <Spinner/>      
            <div className="container">                    
               <Link className="site-logo" to={`/${CURRENTSCHEDULE}`} onClick={defaultToggleRemove, () => dispatch({type: CURRENTSCHEDULE})}>
                  <img style={{width: "172px"}} src={BusinessRecoveryLogo} alt="Business Recovery" title='Business Recovery'/>
                </Link>      
                <a href="javascript:void(0);" className="mobi-toggler" onClick={toggleBox}>
                 <i className="fa fa-bars"></i>
               </a>       
               <div id="menudiv" className="header-navigation font-transform-inherit menuaddloginnone" style={{float: 'right'}}>         
                  <ul>         
                  <li className={state.menuState===CURRENTSCHEDULE ?'active':''}>
                     <Link to={`/${CURRENTSCHEDULE}`} onClick={defaultToggleRemove, () => dispatch({type: CURRENTSCHEDULE})}>{t('homeLabel')}</Link>
                   </li>                                                
                   <li className={state.menuState===SCHEDULELIST ?'active':''}>
                     <Link to={`/${SCHEDULELIST}`} onClick={defaultToggleRemove, () => dispatch({type: SCHEDULELIST})}>{t('scheduleLabel')}</Link>
                   </li>    
                   <li className={state.menuState===USERPROFILE ?'active':''}>
                     <Link to={`/${USERPROFILE}`} onClick={defaultToggleRemove, () => dispatch({type: USERPROFILE})}>{t('profileLabel')}</Link>
                   </li>
                   <li className={state.menuState===ACTIVITYLIST ?'active':''}>
                     <Link to={`/${ACTIVITYLIST}`} onClick={defaultToggleRemove, () => dispatch({type: ACTIVITYLIST})}>{t('activityLabel')}</Link>
                   </li>
                   <li className={state.menuState===COMPLAINTLIST ?'active':''}>
                     <Link to={`/${COMPLAINTLIST}`} onClick={defaultToggleRemove, () => dispatch({type: COMPLAINTLIST})}>{t('complaintLabel')}</Link>
                   </li>
                   <li className="">
                     <Link to="/" onClick={() => handleLogout()}>{t('logoutLabel')}</Link>
                   </li>                  
                    {/* <li>
                    <Form.Check
                          custom
                          type="switch"
                          id="custom-switch"
                          label="Switch to language"
                          onChange={(event) => { 
                            changeLanguage(event)
                          }} />
                    </li> */}
                   </ul>        
               </div> 
             </div>               
          </div> 
    );
  }
 else if (true) {
  return (
      <div className="header">
          <Spinner/>     
        <div className="container">
          <Link className="site-logo" to={`/${DASHBOARD}`} onClick={defaultToggleRemove}>
                  <img style={{width: "172px"}} src={BusinessRecoveryLogo} alt="Business Recovery" title='Business Recovery'/>
          </Link>          
          <a href="javascript:void(0);" className="mobi-toggler" onClick={toggleBox}>
            <i className="fa fa-bars"></i>
          </a>       
          <div id="menudiv" className="header-navigation font-transform-inherit menuaddloginnone" style={{float: 'right'}}>         
              <ul>  
                <li>
                     <Link to={`/${BUSINESSOWNERLOGIN}`} onClick={defaultToggleRemove}>{t('loginLabel')}</Link>
                </li>       
              </ul>        
          </div> 
        </div>
      </div> 
     );
  }
  return (
    <div className="header">
       <Spinner/>      
      <div className="container">
        <Link className="site-logo" to="/Dashboard">               
          <img style={{width: "172px"}} src={BusinessRecoveryLogo} alt="Business Recovery" title='Business Recovery'/>
        </Link>      
       <a href="#" className="mobi-toggler">
         <i className="fa fa-bars"></i>
       </a>             
     </div>
   </div>
  )
}

const mapState = (state, ownProps) => {	
	return {
		  isSignedIn : state.auth.isSignedIn,
		  //businessData : state.auth.businessData,
	  }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => { 
	return bindActionCreators(
	  {
      signOut,
	  },
	  dispatch
	)
  }
  
  export default connect(
	mapState,
	mapDispatchToProps,
	null,
  )(Header);