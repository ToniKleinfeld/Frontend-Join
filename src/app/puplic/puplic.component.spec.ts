import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuplicComponent } from './puplic.component';

describe('PuplicComponent', () => {
  let component: PuplicComponent;
  let fixture: ComponentFixture<PuplicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuplicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuplicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
