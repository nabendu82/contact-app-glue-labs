import React from 'react'
import ContactCard from './ContactCard'

const ContactList = (props) => {
    return (
        <div className='ui celled list'>
            {props.contacts.map(contact => <ContactCard key={contact.id} contact={contact} />)}
        </div>
    )
}

export default ContactList