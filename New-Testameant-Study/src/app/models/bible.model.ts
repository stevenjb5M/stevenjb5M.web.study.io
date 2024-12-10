export class Verse {
  constructor(public number: number, public text: string) {}
}

export class Chapter {
  constructor(public number: number, public verses: Verse[]) {}
}

export class Book {
  constructor(public name: string, public chapters: Chapter[]) {}
}