import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private baseUrl = '/api/news'; // Neue Basis-URL zeigt auf die Proxy-Route deines Servers
  private cacheExpiration = 5 * 60 * 1000; // 5 Minuten in Millisekunden

  constructor(private http: HttpClient) {}

    // Fetch durchführen falls Cache leer ist
    getTopHeadlines(category: string = '', language: string = 'en'): Observable<any> {
      const cacheKey = `topHeadlines_${category}_${language}`;
      const cachedData = this.getCachedData(cacheKey);
  
      if (cachedData) {
        return of(cachedData); // Rückgabe der zwischengespeicherten Daten
      }
  
      // Parameter für den Fetch
      let params = new HttpParams().set('language', language);
      if (category) {
        params = params.set('category', category); // Kategorie hinzufügen
      }
  
      return new Observable(observer => {
        this.http.get<any>(this.baseUrl, { params }).subscribe(response => {
          const articles = response.articles || response; // Extrahiert die Artikel
          this.setCacheData(cacheKey, articles); // Speichert die Artikel im Cache
          observer.next(articles); // Sendet die Artikel an den Observer
          observer.complete();
        },
        error => {
          console.error('Fehler bei der API-Anfrage:', error);
          observer.error(error);
        });
      });
    }

 // Hilfsfunktion: Cache-Daten abrufen
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

  // Speichert die Daten in den Cache
  private setCacheData(key: string, data: any): void {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: Array.isArray(data) ? data : [] // Sicherstellen, dass nur Arrays gespeichert werden
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }
}