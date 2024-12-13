import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiKey = '4cbae97b2cf84264915bbebb661733d2'; // Ersetzen Sie "YOUR_API_KEY" mit Ihrem News API-Schlüssel
  private baseUrl = 'https://newsapi.org/v2/';
  private cacheExpiration = 15 * 60 * 1000; // 15 Minuten in Millisekunden

  constructor(private http: HttpClient) {}

  // Hilfsfunktion zum Zwischenspeichern
  private getCachedData(key: string): any {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      const now = new Date().getTime();
      if (now - parsed.timestamp < this.cacheExpiration) {
        return parsed.data; // Rückgabe der zwischengespeicherten Daten
      }
    }
    return null;
  }

  private setCacheData(key: string, data: any): void {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: Array.isArray(data) ? data : [] // Sicherstellen, dass nur Arrays gespeichert werden
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  // Top Headlines mit Cache-Logik abrufen
  getTopHeadlines(category: string = '', country: string = '', language: string = 'en'): Observable<any> {
    const cacheKey = `topHeadlines_${category}_${country}_${language}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData); // Rückgabe der zwischengespeicherten Daten
    }

    const url = `${this.baseUrl}top-headlines`;
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('language', language);

    if (country) {
      params = params.set('country', country);
    }
    if (category) {
      params = params.set('category', category);
    }

    return new Observable(observer => {
      this.http.get<any>(url, { params }).subscribe(response => {
        const articles = response.articles || []; // Sicherstellen, dass `articles` ein Array ist
        this.setCacheData(cacheKey, articles); // Speichern der Antwort im Cache
        observer.next(articles);
        observer.complete();
      });
    });
  }

  // Nachrichten nach Stichwort suchen mit Cache-Logik
  searchNews(query: string): Observable<any> {
    const cacheKey = `searchNews_${query}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData); // Rückgabe der zwischengespeicherten Daten
    }

    const url = `${this.baseUrl}everything`;
    let params = new HttpParams()
      .set('q', query)
      .set('apiKey', this.apiKey);

    return new Observable(observer => {
      this.http.get<any>(url, { params }).subscribe(response => {
        const articles = response.articles || []; // Sicherstellen, dass `articles` ein Array ist
        this.setCacheData(cacheKey, articles); // Speichern der Antwort im Cache
        observer.next(articles);
        observer.complete();
      });
    });
  }
}
