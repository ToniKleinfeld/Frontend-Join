import { Component, OnDestroy, signal } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnDestroy {
  private _contacts = signal<Contact[]>([]);
  readonly contacts = this._contacts.asReadonly();
  private subContact = new Subscription();

  constructor(private backendService: BackendService) {
    this.subContact.add(
      this.backendService.getRequest<Contact[]>('contacts').subscribe({
        next: (contacts) => this._contacts.set(contacts),
        error: (err) => console.error('Fehler beim Laden der Nutzer:', err),
      })
    );
  }

  ngOnDestroy(): void {
    this.subContact.unsubscribe();
  }

  createContact() {
    let newContact: Contact = {
      name: 'Antonio',
      email: 'Test2@post.de',
      phone: '0173534636',
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
