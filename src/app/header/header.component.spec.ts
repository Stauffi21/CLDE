import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a black bottom border and be the last element in the <div> container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
  
    // Locating <hr> element
    const hrElement = compiled.querySelector('hr'); 
  
    expect(hrElement).toBeTruthy();
  
    // Locate the parent element containing the <hr>
    const containerElement = compiled.querySelector('.col-12'); // Adjust the query selector to match your structure
  
    // Ensuring the container element exists
    expect(containerElement).toBeTruthy(); 
  
    // Ensuring <hr> is the last child of the container element
    expect(containerElement!.lastElementChild).toBe(hrElement);
  
    // Checking CSS properties of the <hr> element
    const hrStyle = getComputedStyle(hrElement!);
    expect(hrStyle.borderBottomColor).toBe('rgb(0, 0, 0)'); // Ensure the border-bottom-color is black
  });

  it('should have a white background', () => {
    const compiled = fixture.nativeElement as HTMLElement;
  
    // Das Header-Element Finden
    const headerElement = compiled.querySelector('header');
  
    // Sicherstellen, dass das Header-Element vorhanden ist
    expect(headerElement).toBeTruthy();
  
    // Berechnete CSS-Eigenschaften des Headers abrufen
    const headerStyle = getComputedStyle(headerElement!);
  
      // Überprüfen, ob der Hintergrund weiß oder transparent ist
  const backgroundColor = headerStyle.backgroundColor;
  const isWhiteOrTransparent = backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'rgba(0, 0, 0, 0)';

  expect(isWhiteOrTransparent).toBeTrue(); // Test if the background is either white or transparent
  });


  it('should position the logo on the right side',() => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Suche das <img> Element im Header
    const logoElement = compiled.querySelector('a.navbar-brand img');

    // Sicherstellen, dass das Logo existiert
    expect(logoElement).toBeTruthy();

    // Suche das <nav> Element, das das Logo enthält
    const navElement = compiled.querySelector('nav');

    // Sicherstellen, dass das nav-Element die Klasse justify-content-end enthält
    expect(navElement).toHaveClass('justify-content-end');
  });
});
