export interface ResponseBook{
    bookId: number;
    title: string;
    author: string;
    categoryId: number;
    summary: string;
    details: string;
    category: Category;
}

export interface Category {
    categoryId: number;
    name: string;
    books: string[];
  }