import { Component, OnDestroy, signal } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';
import { Subscription } from 'rxjs';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../shared/pipes/format-user-name.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contacts',
  imports: [ButtonComponent,InitialsPipe,FormatUserNamePipe, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnDestroy {
  private _contacts = signal<Contact[]>([]);
  readonly contacts = this._contacts.asReadonly();
  private subContact = new Subscription();
  activeContact:string = '-1';

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

  setActiveContact(id:string|undefined){
    if(id){
      this.activeContact = id
    }
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
