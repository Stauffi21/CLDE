import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../newsapi.service';
import { CurrentsApiService } from '../currentsapi.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  selectedApi: string = 'currentsapi';
  selectedCategory: string = 'general';
  selectedLanguage: string = 'de';
  articles: any[] = [];
  showSettings = false;
  private fetchSubject = new Subject<void>();
  isFetching = false;

  // Kategorien, die in den Tabs angezeigt werden
  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  selectedTabIndex = 2; // Standardtab-Index (entspricht der Kategorie "general")

  // Sprachen für die APIs
  private currentsLanguages = ['de', 'en'];
  private newsApiLanguages = ['en'];

  constructor(
    private newsApiService: NewsApiService,
    private currentsApiService: CurrentsApiService
  ) {}

  ngOnInit(): void {
    this.fetchSubject
      .pipe(
        debounceTime(300),
        switchMap(() => {
          this.isFetching = true;
          return this.selectedApi === 'newsapi'
            ? this.newsApiService.getTopHeadlines(this.selectedCategory, this.selectedLanguage)
            : this.currentsApiService.getLatestNews(this.selectedCategory, this.selectedLanguage);
        })
      )
      .subscribe(
        (articles) => {
          this.articles = articles || [];
          this.isFetching = false;
        },
        (error) => {
          console.error('Fehler beim Abrufen der Nachrichten:', error);
          this.isFetching = false;
        }
      );

    this.fetchNews();
  }

  // Dynamically get language options based on the selected API
  get languageOptions(): string[] {
    return this.selectedApi === 'newsapi' ? this.newsApiLanguages : this.currentsLanguages;
  }

  // Handle API selection
  onApiChange(): void {
    if (this.selectedApi === 'newsapi' && this.selectedLanguage !== 'en') {
      this.selectedLanguage = 'en'; // Automatically set to English
    }
    this.fetchNews(); // Fetch news whenever API changes
  }

  fetchNews(): void {
    if (!this.isFetching) {
      this.fetchSubject.next();
    }
  }

  onTabChange(index: number): void {
    this.selectedCategory = this.categories[index];
    this.fetchNews();
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  setPlaceholderImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (!imgElement.getAttribute('data-fallback')) {
      imgElement.src = 'news-placeholder.png';
      imgElement.setAttribute('data-fallback', 'true');
    }
  }
}
