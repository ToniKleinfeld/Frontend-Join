import { Component, OnDestroy, signal, computed } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Contact } from '../../shared/interfaces/interfaces.model';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../shared/pipes/format-user-name.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contacts',
  imports: [ButtonComponent, InitialsPipe, FormatUserNamePipe, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnDestroy {
  private _contacts = signal<Contact[]>([]);
  readonly contacts = computed(() => {
    return [...this._contacts()].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  });
  private subContact = new Subscription();
  activeContact: string = '-1';

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

  setActiveContact(contact: Contact) {
    this.activeContact = contact.id || '-1';
  }

  get selectedContact(): Contact | null {
    return this.contacts().find((c) => c.id === this.activeContact) ?? null;
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
