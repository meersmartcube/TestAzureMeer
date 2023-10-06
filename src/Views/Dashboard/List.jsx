import React from 'react';
import PaginatedLists from '../../Components/PaginatedLists';
import img1 from '../../assests/images/searchresult/img1.jpg'; 
import Image from 'react-bootstrap/Image';
import { Link }  from 'react-router-dom';
import Moment from 'react-moment';

const List = ({ lists }) => {  

    return (
      <div className="row">        
          <div className="col-md-12 col-sm-12">
    <h1>{lists.length > 0 ? 'Search Results' : ''}</h1>                    
              <PaginatedLists 
                lists={lists}
                itemsPerPage={3}
                render={(paginatedLists) => (
                  <div className="content-page">
                  {paginatedLists.map((item, id) => {                                           
                      return(                  
                      <div className="row" key={id}>           
                        <div className="col-md-9 col-sm-9 blog-posts">             
                        <div className="row">
                          <div className="col-md-3 col-sm-3">              
                            <Image fluid src={img1}/>
                          </div>
                        <div className="col-md-9 col-sm-9">
                        <h2>
                        <Link className="more"  to={`/Detail/${item.id}`}>{item.englishName}</Link>
                        {/* <Link className="more" 
                              to={{
                                pathname: '/Detail',
                                state: { itemDetail: item }
                                }}>{item.englishName}
                        </Link>                          */}
                        </h2>
                            <ul className="blog-info">
                            <li>
                              <i style={{color : item.customStatus === 1 ? 'green' : 'red' }} className={item.customStatus === 1 ? "fa fa-check" : "fa fa-times"}></i> 
                              <strong style={{color : item.customStatus === 1 ? 'green' : 'red'}}> 
                              {item.customStatus === 1 ? 'OPEN':'CLOSE'} 
                              </strong>
                              </li><br/>

                              {/* <li><i className="fa fa-clock-o"></i> {item.dateFrom} </li> */}
                                { item.dateFrom ? <li><i className="fa fa-clock-o"></i> 
                                <Moment format="DD-MM-YYYY" withTitle>
							               	 {item.dateFrom} 
           				        	</Moment>
                             &nbsp; {item.startTime}  -  {item.endTime} 
                               
                                </li> :""}

                                { item.dateTo ? <li><i className="fa fa-clock-o"></i> 
                                <Moment format="DD-MM-YYYY" withTitle>
							               	 {item.dateTo} 
           				        	</Moment>
                             &nbsp; {item.startTime}  -  {item.endTime} 
                                 
                                 </li> : ""}   { item.dateTo ? <br/> :""}
                                { item.streetAddress ?<li><i className="fa fa-map-marker"></i> {item.streetAddress} </li> :""}  { item.streetAddress ? <br/> :""}
                            <li><i className="fa fa-phone"></i> <strong> {item.ownerMobile} </strong></li>
                            {/* <li><i className="fa fa-globe"></i> <strong> <a href="#"> www.website.com </a> </strong></li> */}
                            </ul>
                            <Link className="more"  to={`/Detail/${item.id}`}>More...<i className="fa fa-angle-right"></i></Link>
                            {/* <Link className="more" 
                                  to={{
                                    pathname: '/Detail',
                                    state: { itemDetail: item }
                                  }}>More...<i className="fa fa-angle-right"></i>
                            </Link> */}
                        </div>
                      </div>
                      <hr className="blog-post-sep"/>
                    </div>
                  </div>
                );                     
              })}
            </div>
          )}
        />             
      </div>
    </div>     
  );
}

export default List;