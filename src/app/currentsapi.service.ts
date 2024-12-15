import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentsApiService {
  private apiKey = 'o8_xrzoRzYwcaUCFGZfZQfxlZ3KttcjBbqCzitqMj6ilbQ1I'; // API-Schlüssel
  private baseUrl = 'https://api.currentsapi.services/v1/';
  private cacheExpiration = 5 * 60 * 1000; // 5 Minuten in Millisekunden

  constructor(private http: HttpClient) {}

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
    console.log('Speichere im Cache:', key, data); // Debug: Überprüfen der Cache-Daten
    const cacheData = {
      timestamp: new Date().getTime(),
      data
    };
    localStorage.setItem(key, JSON.stringify(cacheData)); // Speichern der Daten im Cache
  }
  

  // Fetch durchführen falls Cache leer ist
  getLatestNews(category: string = '', language: string = 'en'): Observable<any> {
    const cacheKey = `currentsLatestNews_${category}_${language}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData); // Rückgabe der zwischengespeicherten Daten
    }

    // Parameter für den Fetch
    const url = `${this.baseUrl}latest-news`;
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('language', language);

    if (category) {
      params = params.set('category', category); // Fügt die Kategorie hinzu, wenn sie definiert ist
    }

    // Führt eine HTTP-GET-Anfrage mit den angegebenen URL-Parametern aus
    return new Observable(observer => {
      this.http.get<any>(url, { params }).subscribe(response => {
        const newsData = response.articles || response.news || []; // Extrahiert die Artikel aus der API-Antwort
        this.setCacheData(cacheKey, newsData); // Speichert die abgerufenen Artikel im Cache
        observer.next(newsData); // Sendet die extrahierten Artikel an den Beobachter (Observer)
        observer.complete();
      },
      error => {
        console.error('Fehler bei der API-Anfrage:', error); // Fehler in der Konsole ausgeben
        observer.error(error);
      }
    );
  });
  }
}
