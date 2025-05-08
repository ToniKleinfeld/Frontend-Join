import { Component, signal, computed } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../shared/pipes/format-user-name.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contacts',
  imports: [
    ButtonComponent,
    InitialsPipe,
    FormatUserNamePipe,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.form.component.scss'],
})
export class ContactsComponent {
  private _contacts = signal<Contact[]>([]);
  readonly contacts = computed(() => {
    return [...this._contacts()].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  });

  activeContact: string = '-1';
  overlayActive: boolean = false;
  overlayContent: string = '';

  defaultContact: Contact = {
    name: '',
    email: '',
    phone: '',
  };

  addContact: Contact = JSON.parse(JSON.stringify(this.defaultContact));

  constructor(private backendService: BackendService) {
    this.loadContacts();
  }

  /**
   * Load contact list , add to signal
   */
  loadContacts() {
    this.backendService.getRequest<Contact[]>('contacts').subscribe({
      next: (contacts) => this._contacts.set(contacts),
      error: (err) => console.error('Fehler beim Laden der Nutzer:', err),
    });
  }

  /**
   * add shown contact id to --> activeContact
   * @param contact
   */
  setActiveContact(contact: Contact) {
    this.activeContact = contact.id || '-1';
  }

  get selectedContact(): Contact | null {
    return this.contacts().find((c) => c.id === this.activeContact) ?? null;
  }

  /**
   * toggle state of overlay , and content shown
   * @param state
   */
  toggleOverlay(state: string): void {
    this.overlayActive = !this.overlayActive;
    this.addContact = JSON.parse(JSON.stringify(this.defaultContact));

    switch (state) {
      case 'add':
        this.overlayContent = 'add';
        break;
      case 'edit':
        this.overlayContent = 'edit';
        this.addContact = JSON.parse(JSON.stringify(this.selectedContact));
        break;
      default:
        this.overlayContent = '';
        break;
    }
  }

  /**
   * filter for current Contact index
   * @param contact Contact list
   * @returns First letter of Name to uppercase
   */
  getInitial(contact: Contact): string {
    return contact.name.charAt(0).toUpperCase();
  }

  /**
   *Check if this is the first Contact with the Nameletter , return first Letter when , yes
   * @param index Conctact index
   * @returns
   */
  isNewGroup(index: number): boolean {
    const contacts = this.contacts();
    if (index === 0) {
      return true;
    }
    const prevInitial = this.getInitial(contacts[index - 1]);
    const currInitial = this.getInitial(contacts[index]);
    return prevInitial !== currInitial;
  }
  //TODO; später mir mehreren Testen !

  //TODO: Farbe für Contact im Frontend schon erstellen oder im backend?

  /**
   *  Create a new Contact
   * @param formRef
   */
  createContact(formRef: any) {
    if (formRef.valid) {
      this.backendService.postRequest('contacts', this.addContact).subscribe({
        next: (response) => {
          this.loadContacts();
          this.toggleOverlay('');
        },
        error: (err) =>
          console.error('Fehler beim Erstellen des Kontakts:', err),
      });
    }
  }

  /**
   * Update Contact
   * @param formRef
   */
  patchContact(formRef: any) {
    if (formRef.valid) {
      this.backendService
        .patchRequest(`contacts/${this.addContact.id}`, this.addContact)
        .subscribe({
          next: () => {
            this.loadContacts();
            this.toggleOverlay('');
          },
        });
    }
  }

  /**
   * Delte Contact
   * @param id contact ID
   */
  deleteContact(id: string) {
    this.backendService.deleteRequest(`contacts/${id}`).subscribe({
      next: () => {
        this.loadContacts();
      },
    });
  }
}
