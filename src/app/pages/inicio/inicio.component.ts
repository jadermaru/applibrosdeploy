import { Component, inject, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { BookService } from '../../services/book.service';
import { ResponseBook } from '../../interfaces/ResponseBook';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource }  from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,RouterModule,  
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

   private bookService = inject(BookService)

   public dataSource = new MatTableDataSource<ResponseBook>([]);
   public displayedColumns:string[]=['title','author','category','view']
   private router=inject(Router)
   private authService = inject(AuthService); 

   ngOnInit(): void {
    this.bookService.lista().subscribe({
      next: (data: ResponseBook[]) => {
        this.dataSource.data = Array.isArray(data) ? data : [];
        this.dataSource.filterPredicate = (book, filter) => {
          const term = filter.trim().toLowerCase();
          return book.title.toLowerCase().includes(term)
              || book.author.toLowerCase().includes(term)
              || book.category.name.toLowerCase().includes(term);
        };
      },
      error: () => {
      }
    });
  }

  applyFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input;
  }

  GoDetailBook(bookId: number) {
    this.router.navigate(['book', bookId]);
  }
  
  logout(): void {
    this.authService.logout(); 
    this.router.navigate([""])
  }
}
