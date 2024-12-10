import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, Chapter, Verse } from '../models/bible.model';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  constructor(private http: HttpClient) {}

  convertJsonToBook(json: any): Book {
    const chapters: Chapter[] = json.chapters.map((chapter: any) => {
      const verses: Verse[] = chapter.verses.map((verse: any, index: number) => new Verse(index + 1, verse));
      return new Chapter(chapter.number, verses);
    });
    return new Book(json.name, chapters);
  }

  getBookJson(bookName: string): Observable<any[]> {
    const folderPath = `assets/bible/json/${bookName}`;
    return this.http.get<any[]>(`${folderPath}/index.json`).pipe(
      mergeMap((files: string[]) => {
        const requests = files.map(file => this.http.get<any>(`${folderPath}/${file}`));
        return forkJoin(requests);
      })
    );
  }
}