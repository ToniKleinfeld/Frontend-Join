import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit, OnDestroy {

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.GetRequest('contacts').subscribe({
      next: (resonse) => {
        console.log(resonse)
      }
    })
  }

  ngOnDestroy(): void {

  }
}
