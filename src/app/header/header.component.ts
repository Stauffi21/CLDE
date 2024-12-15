import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  // Random button welcher eine zufällige Page von Wikipedia öffnet
  loadRandomPage(): void {
    const randomUrl = 'https://de.wikipedia.org/wiki/Special:Random';
    window.open(randomUrl, '_blank');
  }
}

