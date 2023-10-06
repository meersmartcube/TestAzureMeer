import React, { useState, useEffect } from 'react';

const licenceDetailConfig = {
    pageTitle:"Licence Details",
    englishName :"English Name",
    arabicName :"Arabic Name",
    licenceNo :"Licence No",
    businessCategory :"Business Category",
    businessActivity :"Business Activity",
}

const LicenceDetail = (props) => {

    const [englishName, setEnglishName] = useState('');
    const [arabicName, setArabicName] = useState('');
    const [uniqueIdentificationNumber, setUniqueIdentificationNumber] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');

    function handleUserInput (){
        
    }

    function handleSubmit (){

    }

    useEffect(() => {
        setEnglishName(props.businessInfo.englishName);
        setArabicName(props.businessInfo.arabicName);
        setUniqueIdentificationNumber(props.businessInfo.uniqueIdentificationNumber);
        setBusinessCategory(props.businessInfo.businessCategoryEnglish);
        // debugger
        // console.log("LicenceDetail")
        // console.log(props.businessInfo)
    });   

    return (
        <div>
         <h3 style={{color: "#E26A6A"}}><strong> {licenceDetailConfig.pageTitle}</strong></h3>           
          <hr/>          
          <form id="licencedetailform" className="" role="form" onSubmit={handleSubmit}>
        
            <div className='form-group'>
                <label className="control-label">{licenceDetailConfig.englishName}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="englishName"
                value={englishName}
                placeholder={licenceDetailConfig.englishName}
                disabled
                onChange={handleUserInput}/>
            </div>
          
            <div className='form-group'>
                <label className="control-label">{licenceDetailConfig.arabicName}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="arabicName"
                value={arabicName}
                placeholder={licenceDetailConfig.arabicName}
                disabled
                onChange={handleUserInput}/>
            </div>

            <div className='form-group'>
                <label className="control-label">{licenceDetailConfig.licenceNo}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="licenceNo"
                value={uniqueIdentificationNumber}
                placeholder={licenceDetailConfig.licenceNo}
                disabled
                onChange={handleUserInput}/>
             </div>

             <div className='form-group'>
                <label className="control-label">{licenceDetailConfig.businessCategory}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="businessCategory"
                value={businessCategory}
                placeholder={licenceDetailConfig.businessCategory}
                disabled
                onChange={handleUserInput}/>
             </div>

             <div className='form-group'>
                <label className="control-label">{licenceDetailConfig.businessActivity}</label>
                <input type="text" className="form-control col-lg-6 col-md-6 col-sm-12 col-xs-12"
                name="businessActivity"
                placeholder={licenceDetailConfig.businessActivity}
                disabled
                onChange={handleUserInput}/>
             </div>


        </form>

        
        </div>
    );

}

export default LicenceDetail;