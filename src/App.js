import React, { Component } from 'react';
import ListContacts  from './ListContact' ;
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import {Route} from 'react-router-dom'

class App extends Component {
  state = {
    contacts : [],
    screen : 'list'
  }
  componentDidMount(){
    ContactsAPI.getAll().then((contacts) =>{
      this.setState({contacts})
    })
  }
  removeContact = (contact) =>{
    this.setState((state)=>({
      contacts : this.state.contacts.filter(c=> c.id !== contact.id)
    }))
  }
  createContact (contact){
    ContactsAPI.create(contact).then(contact =>{
      this.setState(state =>{
        contacts : this.state.contacts.concat([contact])
      })
    })
  }
  render() { 
    return (
      <div className="app">
      
      <Route exact path="/" render={()=>(
        <ListContacts onDelete = {this.removeContact} contacts = {this.state.contacts} 
        />
      )}/>
      <Route exact path="/create" render = {({history}) =>
        <CreateContact onCreateContact = {contact =>{
          this.createContact(contact)
          history.push('/')
        }}/>
      }/>
      </div>
    )
  }
}
 
export default App;

