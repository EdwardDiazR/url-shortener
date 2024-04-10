import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinkPageComponent } from './new-link-page.component';

describe('NewLinkPageComponent', () => {
  let component: NewLinkPageComponent;
  let fixture: ComponentFixture<NewLinkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLinkPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
