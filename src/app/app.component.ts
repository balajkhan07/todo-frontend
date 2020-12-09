import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todo: Todo = {};
  todos: Todo[] = [];
  displayedColumns: string[] = ['title', 'description', 'actions'];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }


  getTodos() {
    return this.todoService.getTodos()
      .subscribe((res: any) => {
        this.todos = res
      });
  }

  addTodo() {
    return this.todoService.addTodo(this.todo).subscribe(res => {
      this.getTodos();
      this.todo = {};
    });
  }

  updateTodos(todo: Todo) {
    return this.todoService.updateTodos(todo);
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo).pipe(first()).toPromise().then(() => {
      this.getTodos();
    });
  }

}
