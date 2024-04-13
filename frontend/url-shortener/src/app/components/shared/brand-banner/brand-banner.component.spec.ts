import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBannerComponent } from './brand-banner.component';

describe('BrandBannerComponent', () => {
  let component: BrandBannerComponent;
  let fixture: ComponentFixture<BrandBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
