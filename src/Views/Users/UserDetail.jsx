import React from 'react'
import UserProfileImg from '../../assests/images/profile-img.png'

const UserDetail = (props) => {  
    return(
        <div className="row">
        <div className="col-md-3">
          <ul className="list-unstyled profile-nav">
            <li>
              <img src={UserProfileImg} className="img-fluid" alt=""/>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-8 profile-info">
              <h1>{props.businessInfo.englishName}</h1>
              {/* <p>
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt laoreet dolore magna aliquam tincidunt erat volutpat laoreet dolore magna aliquam tincidunt erat volutpat.
              </p> */}
              <p>
                <a href="#">
                {props.businessInfo.ownerEmail} </a>
              </p>
              {/* <ul className="list-inline">
                <li className="list-inline-item">
                  <i className="fa fa-map-marker"></i> UAE
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-calendar"></i> 18 Jan 1982
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-briefcase"></i> Sales Manager
                </li>
              </ul>              */}
            </div>
          </div>       
        </div>
      </div>
    );
}

export default UserDetail;