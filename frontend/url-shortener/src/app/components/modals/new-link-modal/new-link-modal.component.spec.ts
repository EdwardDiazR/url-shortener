import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinkModalComponent } from './new-link-modal.component';

describe('NewLinkModalComponent', () => {
  let component: NewLinkModalComponent;
  let fixture: ComponentFixture<NewLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLinkModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
