import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Contact } from '../models/contact.model';

declare let $: any;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.sass']
})
export class AddContactComponent implements OnInit {

  contactos: Contact[];
  contactForm: FormGroup;

  constructor(private router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    $('.modal').modal();
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }

  onSumit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
      ...this.contactForm.value
      };
      this.contactService.addContact(newContact).then((result) => {
        this.router.navigate(['']);
      }).catch((error) => {
        console.log(error);
      });
      } else {
        alert('Tu forma no esta completa');
      }
  }
}
