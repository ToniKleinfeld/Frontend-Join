import { Component, signal, computed, HostListener } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../shared/pipes/format-user-name.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneformatPipe } from '../../shared/pipes/phoneformat.pipe';
@Component({
  selector: 'app-contacts',
  imports: [
    ButtonComponent,
    InitialsPipe,
    FormatUserNamePipe,
    CommonModule,
    FormsModule,
    PhoneformatPipe,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: [
    './contacts.component.scss',
    './contacts.form.component.scss',
    './contacts.mobile.component.scss',
  ],
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
  showSuccessMsg: boolean = false;
  isMobile: boolean = window.innerWidth < 681;
  mobileMenu: boolean = false;

  defaultContact: Contact = {
    name: '',
    email: '',
    phone: '',
    bgcolor: '',
  };

  addContact: Contact = JSON.parse(JSON.stringify(this.defaultContact));

  constructor(private backendService: BackendService) {
    this.loadContacts();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
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
   * toogle the mobile edit menu
   */
  toggleMobileMenu() {
    if (this.isMobile && this.activeContact !== '-1') {
      this.mobileMenu = this.mobileMenu ? false : true;
    } else {
      this.mobileMenu = false;
    }
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
   *
   * @returns renadom hex color
   */
  getRandomHexColor(): string {
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');
    return `#${hex}`;
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

  /**
   * Create a new Contact
   * @param formRef
   */
  createContact(formRef: any) {
    if (formRef.valid) {
      this.addContact.bgcolor = this.getRandomHexColor();
      this.backendService.postRequest('contacts', this.addContact).subscribe({
        next: () => {
          this.loadContacts();
          this.toggleOverlay('');
          this.showSuccessMsg = true;
          setTimeout(() => {
            this.showSuccessMsg = false;
          }, 2000);
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
            this.toggleMobileMenu();
          },
          error: (err) =>
            console.error('Fehler beim abändern des Kontakts:', err),
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
        this.toggleMobileMenu();
      },
      error: (err) => console.error('Fehler beim löschen des Kontakts:', err),
    });
  }
}
