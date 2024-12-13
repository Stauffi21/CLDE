import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentsApiService {
  private apiKey = 'o8_xrzoRzYwcaUCFGZfZQfxlZ3KttcjBbqCzitqMj6ilbQ1I'; // API-Schlüssel
  private baseUrl = 'https://api.currentsapi.services/v1/';
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
      data
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  // Neueste Nachrichten mit Cache-Logik abrufen
  getLatestNews(category: string = '', language: string = 'en'): Observable<any> {
    const cacheKey = `currentsLatestNews_${category}_${language}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData); // Rückgabe der zwischengespeicherten Daten
    }

    const url = `${this.baseUrl}latest-news`;
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('language', language);

    if (category) {
      params = params.set('category', category);
    }

    return new Observable(observer => {
      this.http.get<any>(url, { params }).subscribe(response => {
        // Überprüfen Sie die Struktur des response-Objekts
        const newsData = response.news || response; // Verwenden Sie das richtige Feld für die Artikel
        this.setCacheData(cacheKey, newsData); // Speichern der gesamten Antwort oder nur `news`
        observer.next(newsData); // Senden Sie die richtige Struktur weiter
        observer.complete();
      });
    });
  }

  // Nachrichten nach Stichwort suchen mit Cache-Logik
  searchNews(query: string): Observable<any> {
    const cacheKey = `currentsSearchNews_${query}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData); // Rückgabe der zwischengespeicherten Daten
    }

    const url = `${this.baseUrl}search`;
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('keywords', query);

    return new Observable(observer => {
      this.http.get<any>(url, { params }).subscribe(response => {
        // Überprüfen Sie die Struktur des response-Objekts
        const newsData = response.news || response; // Verwenden Sie das richtige Feld für die Artikel
        this.setCacheData(cacheKey, newsData); // Speichern der gesamten Antwort oder nur `news`
        observer.next(newsData); // Senden Sie die richtige Struktur weiter
        observer.complete();
      });
    });
  }
}
