import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  loadRandomPage(): void {
    const randomUrl = 'https://de.wikipedia.org/wiki/Special:Random';
    window.open(randomUrl, '_blank');
  }
}

