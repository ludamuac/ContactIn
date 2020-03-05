import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.sass']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  contacts: Contact[];
  contactForm: FormGroup;
  mostrarse = 'noeditar';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    $('.modal').modal();
    const contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.getContact(contactId);
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }

  patchForm() {
    this.contactForm.patchValue({
      ...this.contact
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const updateContact: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };
      this.contactService.updateContact(this.contact.id, updateContact).then((res) => {
        this.router.navigate(['']);
      }).catch((error) => {
        alert('Ocurrio un error al actualizar. Vuelvelo a intentar mas tarde.');
      });
    } else {
      alert('Tu forma no esta completa.');
    }
  }

  mostrar() {
    this.mostrarse = 'editar';
  }

  getContacts() {
    this.contactService.getContacts().then((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  getContact(contactId: string) {
    this.contactService.getContact(contactId).then((contact: Contact) => {
      this.contact = contact;
      this.patchForm();
    }).catch((error) => {
      this.router.navigate(['']);
    });
  }

  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).then((result) => {
      this.getContacts();
      $('#deleteModal').modal('close');
      this.router.navigate(['']);
    }).catch((error) => {
    });
  }
}
