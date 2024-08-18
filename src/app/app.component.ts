import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { BookClass } from './interfaces/book.interface';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [BookService],
})
export class AppComponent implements OnInit {
  public books: BookClass[] = [];
  public readingBooks: BookClass[] = [];

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.bookService.getBooks().subscribe((library) => {
      this.books = library.map((item) => item.book);
    });
  }

  availableBooks() {
    return this.readingBooks.length === 0
      ? 'Sin libros en la lista de lectura'
      : 'Con libros en la lista de lectura';
  }

  drop(event: CdkDragDrop<BookClass[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
