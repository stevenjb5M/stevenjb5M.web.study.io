// New-Testameant-Study/src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { BibleService } from './services/bible.service';
import { Book } from './models/bible.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'New-Testameant-Study';
  book: Book | undefined;
  books: { [key: string]: Book | undefined } = {
    Acts: undefined,
    Galatians: undefined,
    Thessalonians1: undefined,
    Thessalonians2: undefined,
    Corinthians1: undefined,
    Corinthians2: undefined,
    Colossians: undefined,
    Ephesians: undefined,
    Philippians: undefined,
    Philemon: undefined,
    Timothy1: undefined,
    Timothy2: undefined,
    Titus: undefined,
    Hebrews: undefined,
    Peter2: undefined,
    John1: undefined,
    John2: undefined,
    John3: undefined,
    James: undefined,
    Jude: undefined,
    Revelations: undefined
  };

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {

    console.log("books" + this.books);
    
    Object.keys(this.books).forEach(key => {
      const book = this.books[key];
      if (book) {
        let lookupName = book.name;
        if (book && /\d$/.test(book.name)) {
            const numberAtEnd = book.name.match(/\d$/)?.[0];
            if (numberAtEnd) {
            lookupName = `${numberAtEnd} ${book.name.split(/\d/)[0]}`;
            }

            const json = this.bibleService.getBookJson(lookupName);

            console.log(json);
            
          }
      }
    });
  }
}