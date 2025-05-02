import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import { NotaService } from '../../services/nota.service';
import { ResponseBook } from '../../interfaces/ResponseBook';
import { NotaDTO } from '../../interfaces/Nota';
import { CreateNota } from '../../interfaces/CreateNota';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,    
    FormsModule
  ],
  templateUrl: './bookDetail.component.html',
  styleUrls: ['./bookDetail.component.css']
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private notaService = inject(NotaService);
  private authService = inject(AuthService); 
  private router = inject(Router); 

  public book?: ResponseBook;
  public notas: NotaDTO[] = [];
  public newNota: CreateNota = {
    userId: 0,
    bookId: 0,
    calificacion: 0,
    comentario: ''
  };

  showCreateNotaForm = false;

  ngOnInit(): void {
    const user = this.authService.getUserId();
    if (user) {
      this.newNota.userId = user;
    } else {
      alert('No estás logueado');
    }

    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.bookService.getBook(id);
        })
      )
      .subscribe({
        next: b => {
          this.book = b;
          if (b.bookId) {
            this.newNota.bookId = b.bookId;
            this.loadNotas(b.bookId);
          }
        },
        error: _ => alert('No se encontró el libro')
      });
  }

  loadNotas(bookId: number): void {
    this.notaService.getNotasPorLibro(bookId).subscribe({
      next: notas => {
        this.notas = notas.sort((a, b) => {
          const dateA = new Date(a.fecha); 
          const dateB = new Date(b.fecha);
          return dateB.getTime() - dateA.getTime();
        });
      }
    });
  }

  toggleCreateNotaForm() {
    this.showCreateNotaForm = !this.showCreateNotaForm;
  }

  crearNota(): void {
    this.notaService.crearNota(this.newNota).subscribe({
      next: (success) => {
        if (success) {
          this.loadNotas(this.book?.bookId!);
          this.showCreateNotaForm = false; 
        } else {
          alert('Error al crear la nota');
        }
      },
      error: () => alert('Error al crear la nota')
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([]);
  }
}
