import { Component, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from './components/search/search';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  searchKeyword = signal('Github')

  logKeywordChange(data: string) {
    console.log('From App Component', data);
    
  }
}
