export interface NotaDTO {
    id: number;
    userId: number;
    bookId: number;
    calificacion: number;
    comentario: string;
    fecha: string; // formato ISO 8601
    usuarioNombre: string;
    libroTitulo: string;
  }
  