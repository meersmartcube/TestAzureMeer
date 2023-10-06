import React from 'react';

const PageNumbers = ({ 
    items, 
    currentPage, 
    onClickPageNumber 
  }) => {
    return(
     <ul className='pagination'>
      {items.map((item,index) => {
         return (
           <Item
              key={index}
              item={item}
              currentPage={currentPage}
              onClickPageNumber={onClickPageNumber}
            />
           );
         })}
      </ul>
    );
  }

  // Page number...
const Item = ({ 
    item, 
    currentPage, 
    onClickPageNumber 
  }) => {
    return (
      <li className= {item === currentPage ? "active" :""}
        onClick={() => onClickPageNumber(item)}>
        {item === currentPage ? 
        (<a>{item + 1}</a>) : 
        (<a href="#">{item + 1}</a>)}
      </li>
    );
  };

//https://hackernoon.com/using-react-render-props-to-create-a-paginated-lists-b618d839b369
class PaginatedLists extends React.Component {
    constructor(props) {
      super(props);
      
      // By default let's start the page by 0...
      this.state = { currentPage: 0 }; 
      
      this.onClickPageNumber = this.onClickPageNumber.bind(this);
    }
    
    getNumberOfPages(lists, itemsPerPage) {
      
      // Calculate the number pages to be displayed...
      const numberOfPages = Math.ceil(lists.length / itemsPerPage);
      return Array.from(Array(numberOfPages).keys());
    }
    
    paginatedLists(lists, itemsPerPage) {
      const { currentPage } = this.state;
      
      if (!Array.isArray(lists)) new Error('Invalid supplied Lists.');
      // Use array slice to create Paginated lists...
    return lists.slice(
        currentPage * parseInt(itemsPerPage, 0),
        (currentPage + 1) * parseInt(itemsPerPage, 0)
      );
    }
    
    onClickPageNumber(page) {
      this.setState({ currentPage: page });
    }
      
    render() {
      const { currentPage } = this.state;
      const { lists, itemsPerPage } = this.props;
      
      return(
        <div>
          {
            this.props.render(this.paginatedLists(lists, itemsPerPage))
          }
          
          <PageNumbers 
            items={this.getNumberOfPages(lists, itemsPerPage)} 
            currentPage={currentPage}
            onClickPageNumber={this.onClickPageNumber}
            />
        </div>
      ); 
    }
  }

  export default PaginatedLists;