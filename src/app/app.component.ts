import { Component, OnInit } from '@angular/core'; // Importiert OnInit für den Lebenszyklus
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importiert NgbModal für Modalfunktionen

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Newsaggregator'; // Titel der Anwendung

  constructor(private modalService: NgbModal) {} // NgbModal in den Konstruktor injizieren

  ngOnInit() {
  }
}
