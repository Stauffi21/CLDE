import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Allow custom HTML elements
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test for component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for white background
  it('should have a white background', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Find the header element
    const headerElement = compiled.querySelector('header');
    expect(headerElement).toBeTruthy();

    // Get the computed styles of the header
    const headerStyle = getComputedStyle(headerElement!);

    // Assert the background color is white
    expect(headerStyle.backgroundColor).toBe('rgb(255, 255, 255)');
  });


  // Test for the presence of the random article button
  it('should have a random Wikipedia article button with correct text', () => {
    const button = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement;

    // Check if the button exists
    expect(button).toBeTruthy();

    // Verify button text
    expect(button.textContent).toContain('Zufallsartikel von Wikipedia');
  });

  // Test button click functionality
  it('should open a random Wikipedia page when the button is clicked', () => {
    spyOn(window, 'open');
    const button = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement;

    // Simulate button click
    button.click();

    // Assert the window.open method was called with the correct URL
    expect(window.open).toHaveBeenCalledWith('https://de.wikipedia.org/wiki/Special:Random', '_blank');
  });
});