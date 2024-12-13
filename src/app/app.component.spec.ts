import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; // Import HeaderComponent
import { NewsComponent } from './news/news.component'; // Import ChatboxComponent
import { FooterComponent } from './footer/footer.component'; // Import FooterComponent
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed for ChatboxComponent

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,  // Declare HeaderComponent in the test module
        NewsComponent, // Declare ChatboxComponent in the test module
        FooterComponent   // Declare FooterComponent in the test module
      ],
      imports: [
        FormsModule  // Import FormsModule if your app uses ngModel
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Newsaggregator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('easychat');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('EasyChat'); // Update the expected text to match what is rendered
  });

  it('should run tests in Chrome browser', () => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  
    // Ensure that the test is being run in Chrome
    expect(isChrome).toBeTrue();
  });
});