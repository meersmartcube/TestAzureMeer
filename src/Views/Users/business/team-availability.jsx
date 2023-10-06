import React, { useState, useEffect } from 'react';

const teamAvailabilityConfig = {
    pageTitle:"Team Availability",
    maximumAllowed :"Maximum Allowed %",
    areaSpace :"Area Space",
    numberOfEmployees :"Number Of Employees",
}

const TeamAvailability = (props) => {

    const [maximumAllowed, setMaximumAllowed] = useState('');
    const [areaSpace, setAreaSpace] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState('');

    function handleUserInput (){

    }

    function handleSubmit (){

    }

    useEffect(() => {
        setMaximumAllowed(props.businessInfo.maximumAllowedPer);
        setAreaSpace(props.businessInfo.areaSpace);
        setNumberOfEmployees(props.businessInfo.numberOfEmployees);
    });   


    return (
        <div>
         <h3 style={{color: "#E26A6A"}}><strong> {teamAvailabilityConfig.pageTitle}</strong></h3>           
          <hr/>          
          <form id="teamavailabilityform" className="" role="form" onSubmit={handleSubmit}>
        
            <div className='form-group'>
                <label className="control-label">{teamAvailabilityConfig.maximumAllowed}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="maximumAllowed"
                value={maximumAllowed}
                placeholder={teamAvailabilityConfig.maximumAllowed}
                disabled
                onChange={handleUserInput}/>
            </div>
          
            <div className='form-group'>
                <label className="control-label">{teamAvailabilityConfig.areaSpace}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="areaSpace"
                value={areaSpace}
                placeholder={teamAvailabilityConfig.areaSpace}
                disabled
                onChange={handleUserInput}/>
            </div>

            <div className='form-group'>
                <label className="control-label">{teamAvailabilityConfig.numberOfEmployees}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="numberOfEmployees"
                value={numberOfEmployees}
                placeholder={teamAvailabilityConfig.numberOfEmployees}
                disabled
                onChange={handleUserInput}/>
             </div>


        </form>

        
        </div>
    );

}

export default TeamAvailability;