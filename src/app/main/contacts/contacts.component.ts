import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit, OnDestroy {
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getRequest('contacts').subscribe({
      next: (resonse) => {
        console.log(resonse);
      },
    });
  }

  ngOnDestroy(): void {}

  createContact() {
    let newContact: Contact = {
      name: 'Toni',
      email: 'Test@post.de',
      phone: '0173544636',
    };
    
    this.backendService.postRequest('contacts', newContact).subscribe({
      next: (resonse) => {
        console.log(resonse);
      },
    });
  }

  deleteContact(id: string) {
    this.backendService.deleteRequest(`contacts/${id}`).subscribe({
      next: (resonse) => {
        console.log(resonse);
      },
    });
  }
}
