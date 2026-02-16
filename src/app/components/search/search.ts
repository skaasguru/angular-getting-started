import { Component, EventEmitter, input, InputSignal, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  // @Input({ required: true })
  // keyword!: string;

  keyword: InputSignal<string> = input.required();

  // @Output()
  // keywordChange = new EventEmitter<string>();

  keywordChange = output<string>()

  notifyChange(value: string) {
    console.log(value);
    this.keywordChange.emit(value);
    // this.keywordChange.emit(value);
  }
}

