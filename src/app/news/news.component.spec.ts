import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsApiService } from '../newsapi.service';
import { CurrentsApiService } from '../currentsapi.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let mockNewsApiService: jasmine.SpyObj<NewsApiService>;
  let mockCurrentsApiService: jasmine.SpyObj<CurrentsApiService>;

  beforeEach(async () => {
    mockNewsApiService = jasmine.createSpyObj('NewsApiService', ['getTopHeadlines']);
    mockCurrentsApiService = jasmine.createSpyObj('CurrentsApiService', ['getLatestNews']);

    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [
        { provide: NewsApiService, useValue: mockNewsApiService },
        { provide: CurrentsApiService, useValue: mockCurrentsApiService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements in the template
    }).compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy(); // Cleanup after each test
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show "No articles found" message if there are no articles', () => {
    // Mock API Response with no articles
    mockCurrentsApiService.getLatestNews.and.returnValue(of([]));

    // Trigger the fetch
    component.fetchNews();
    fixture.detectChanges(); // Apply changes to the template

    // Check for "No articles found" message
    const noArticlesMessage = fixture.nativeElement.querySelector('.text-center p')?.textContent;
    expect(noArticlesMessage).toContain('Keine Nachrichten gefunden');
  });
});