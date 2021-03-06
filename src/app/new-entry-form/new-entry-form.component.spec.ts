import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryFormComponent } from './new-entry-form.component';

describe('NewEntryFormComponent', () => {
  let component: NewEntryFormComponent;
  let fixture: ComponentFixture<NewEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
