import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



class ListContacts extends Component {
    state = {
        query : ''
    }
    upadateQuery = query => {
        this.setState({
            query : query.trim()
        })
    }
    render(){
        let showingContacts;
         if(this.state.query){
            let match = new RegExp(escapeRegExp(this.state.query),'i') // i is for ignoring case
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
         }else
            showingContacts = this.props.contacts
        
        showingContacts.sort(sortBy('name')) // sort by obejct
        return (  
            <div className= "contact-list">
                <div className="list-contacts-top" >
                    <input className="search-contacts"
                        type="text" placeholder ="Search Contacts"
                        value = {this.state.query} 
                        onChange = {(event) => this.upadateQuery(event.target.value)} />
                        <Link to= "/create" className="add-contact" >add contacts</Link>
                </div>
                <ol className = "contact-list">
                    {
                        showingContacts.map(contact => (
                            <li key={contact.id} className = "contact-list-item">
                                <div className ="contact-avatar" style = {{
                                    backgroundImage : `url(${contact.avatarURL})`
                                }}>
                                </div>
                                <div className = "contact-details">
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick = {()=> this.props.onDelete(contact)} className="contact-remove">
                                    remove
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </div> 
            
        )
    }
}




export default ListContacts;