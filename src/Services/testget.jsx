import axiosbase from './BaseServices/axiosbaseconfig'
import React from 'react'; 
export default class PersonList extends React.Component {
    state = {
      persons: []
    }
  
   async componentDidMount() {
       await axiosbase.get(`users`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
  
    render() {
      return (
        <ul>
          { this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
        </ul>
      )
    }
  }