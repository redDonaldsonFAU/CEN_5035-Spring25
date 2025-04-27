import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydashComponent } from './companydash.component';

describe('CompanydashComponent', () => {
  let component: CompanydashComponent;
  let fixture: ComponentFixture<CompanydashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanydashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
