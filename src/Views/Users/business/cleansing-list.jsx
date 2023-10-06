
import Table from 'react-bootstrap/Table';
import React from 'react';
import { GETCLEANSINGHISTORY } from '../../../Services/AppService';
import axiosbase from '../../../Services/BaseServices/axiosbaseconfig';
import { showSuccessSnackbar, showErrorSnackbar } from '../../../actions/snackbarActions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Alert from 'react-bootstrap/Alert';
import Moment from 'react-moment';
import PaginatedLists from '../../../Components/PaginatedLists';

class CleansingList extends React.Component {
  
 constructor(props) {
        super(props);
        this.state = {
          cleansingList : []
        };        
  }

  async componentDidMount(){
    
    let data = JSON.stringify({
      Id: this.props.businessData.businessId,     
    });

    await axiosbase.post(GETCLEANSINGHISTORY, data)
    .then(res => { 
      this.setState({ cleansingList : res.data});
    }).catch(error => {
      this.props.showErrorSnackbar("Something went wrong!"); 
    });  
  }

  renderList(){
    return this.state.cleansingList.map((item)=>{
        return (
          <tr>              
          <td>{item.companayEnglishName}</td>
          <td>{item.method}</td>
          <td>
          <Moment format="DD/MM/YYYY" withTitle>
            {item.cleansingDate}
          </Moment></td>
        </tr>
        );
    });
  }

  render()
  {
    if(this.state.cleansingList.length === 0){
      return (
        <div class="container">
        <div className="row">        
          <div className="col-md-12 col-sm-12">
          <br/>
            <h3> 
              <Alert variant="success">
              Cleansing History are not available.
              </Alert> 
            </h3>                  
           </div>
        </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
      );
    }
    return (
        <div>
          <h3 style={{color: "#E26A6A"}}><strong> Cleansing History</strong></h3>    
           <hr/>          
              <PaginatedLists 
                  lists={this.state.cleansingList}
                  itemsPerPage={10}
                  render={(paginatedLists) => (
                    <Table striped bordered hover>
                    <thead>
                      <tr>     
                        <th>Company</th>
                        <th>Method</th>
                        <th>Cleansing Date</th>
                      </tr>
                    </thead> 
                    <tbody>
                    {paginatedLists.map((item, id) => {
                        return(                        
                          <tr>              
                          <td>{item.companayEnglishName}</td>
                          <td>{item.method}</td>
                          <td>
                          <Moment format="DD/MM/YYYY" withTitle>
                            {item.cleansingDate}
                          </Moment></td>
                        </tr>                               
                        );                       
                    })}
                  </tbody> 
                </Table>
                )}
              />                
        </div>
     );
  };
}
const mapState = (state, ownProps) => {	
	return {		 
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
  )(CleansingList);