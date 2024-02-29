
import React, { useState } from 'react'; 
import { v4 } from "uuid"

import ContactsList from './ContactsList';

import inputs from '../constants/inputs';

import styles from './Contacts.module.css' ;



function Contacts() {

    const [alert ,setAlert]= useState("");
    const [contacts , setContacts]= useState([]);
    const [contact , setContact] = useState ({
        id: "",      
        name: "" ,
        lastName: "" ,
        email: "" ,
        phone: "" ,
    }) ;

    const deleteHandler = (id) => {
     
      const newContacts = contacts.filter ((contact) => contact.id !== id);
       setContacts(newContacts) ;
    }

      const changeHandler = event => {
        const name = event.target.name ;
        const value = event.target.value;
        // console.log({name , value})

        setContact((contact) => ({...contact, [name]: value}))
      }  ;

      const addHandler = () => {

        if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
          setAlert("Please  Enter Valid Data!");
          return;
        }
        setAlert("");
        const newContact= {...contact, id: v4() };
        setContacts((contacts) =>  [...contacts, newContact]);
          
           setContact({
            name: "" ,
            lastName: "" ,
            email: "" ,
            phone: "" ,
        })
      };

    return (
       <div className={styles.container}>
        <div className={styles.form}>
          {inputs.map((input, index) => (
          <input 
          key={index}
          type={input.type}
          placeholder={input.placeholder}
          name={input.name}
          value={contact[input.name]}
          onChange={changeHandler}
          />
          ))}
            

            <button onClick={addHandler}> Add contact</button>
        </div>
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
        <ContactsList    contacts={contacts}  deleteHandler={deleteHandler}/>
       </div> 
    )
}

export default Contacts
