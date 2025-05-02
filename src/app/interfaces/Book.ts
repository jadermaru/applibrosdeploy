export interface Book {
    "bookId": number,
    "title": string,
    "author": string,
    "categoryId": number,
    "summary": string,
    details: string,
    category: {
      categoryId: number,
      name: string
    }
}