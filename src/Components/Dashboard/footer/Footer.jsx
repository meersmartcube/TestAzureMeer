import React from 'react'

const footerConfig={
  year: (new Date().getFullYear()),  
};

const Footer = () =>{

  // const mystyle = {
  //   display: 'inline-block',
  //   width: '1.25em',
  //    textAlign: 'center'
  // }


    return(
     
        <div className="footer">
        <div className="container">
          <div className="row">           
            <div className="col-md-6 col-sm-6 padding-top-10">
            {footerConfig.year} © Business Recovery. <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </div>  
            <div className="col-md-6 col-sm-6">
              <ul className="social-footer list-unstyled list-inline pull-right">
                <li style={{display: 'inline-block', width: '1.25em', textAlign: 'center'}}><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li style={{display: 'inline-block', width: '1.25em', textAlign: 'center'}}><a href="#"><i className="fa fa-linkedin"></i></a></li>
                <li style={{display: 'inline-block', width: '1.25em', textAlign: 'center'}}><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li style={{display: 'inline-block', width: '1.25em', textAlign: 'center'}}><a href="#"><i className="fa fa-youtube"></i></a></li>
                <li style={{display: 'inline-block', width: '1.25em', textAlign: 'center'}}><a href="#"><i className="fa fa-instagram"></i></a></li>
              </ul>  
            </div>         
          </div>
        </div>
      </div>
      
    );
}

export default Footer;