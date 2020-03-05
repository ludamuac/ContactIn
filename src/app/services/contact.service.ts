import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    {
      id: '123',
      name: 'Jorge Gutierrez',
      number: '(664) 987 65 43',
      email: 'jguiterrez@gmail.com'
    },
    {
      id: '1234',
      name: 'Pedro Perez',
      number: '(664) 123 34 56',
      email: 'pedroperez@gmail.com'
    }
  ];

  constructor() { }


  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      resolve(this.contacts);
    });
  }

  getContact(contactId: string): Promise<Contact> {
    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find((contact) => {
        return contact.id === contactId;
      });

      if (foundContact) {
        resolve(foundContact);
      } else {
        reject(alert('No se encuentra tu libro!'));
      }
    });
  }

  addContact(contact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.contacts.push(contact);
      resolve(true);
    });
  }

  deleteContact(contactId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const remainingContacts = this.contacts.filter((contact) => {
        return contact.id !== contactId;
      });

      if (JSON.stringify(remainingContacts) !== JSON.stringify(this.contacts)) {
        this.contacts = remainingContacts;
        resolve(true);
      } else {
        reject(alert('No se borró tu libro'));
      }
    });
  }

  updateContact(contactId: string, updateContact: Contact): Promise<boolean> {
    return new Promise((resolve,reject) => {
      const updatedContact = this.contacts.map((contact) =>{
        if (contact.id === contactId) {
          const newContact = {
            ...contact,
            ...updateContact
          };
          return newContact;
        }
        return contact;
      });

      if (JSON.stringify(updatedContact) !== JSON.stringify(this.contacts)){
        this.contacts = updatedContact;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}

