import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetail from './components/ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  });

  const addContactHandler = contact => {
    console.log(contact);
    setContacts([...contacts, {id: contacts.length, ...contact}]);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const removeContact = id => {
    const newContactList = contacts.filter(contact => contact.id !== id);
    setContacts(newContactList);
  }

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <ContactList contacts={contacts} getContactId={removeContact} /> } />
          <Route path="/add" component={(props) => <AddContact {...props} addContactHandler={addContactHandler} /> } />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
