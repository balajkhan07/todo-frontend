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

  todo: Todo = { title: '', description: '' };
  todos: Todo[] = [];
  displayedColumns: string[] = ['title', 'description', 'actions'];
  isEdit: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }


  getTodos() {
    return this.todoService.getTodos()
      .subscribe((res: any) => {
        this.todos = res;
      });
  }

  addTodo(todo: Todo) {
    return this.todoService.addTodo(todo)
      .subscribe(() => {
        this.getTodos();
        this.todo = {};
      });
  }

  updateTodos(todo: Todo) {
    this.todo = JSON.parse(JSON.stringify(todo));
    this.isEdit = true;
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo).pipe(first()).toPromise()
      .then(() => {
        this.getTodos();
      });
  }


  saveEdit(todo: Todo) {
    return this.todoService.updateTodos(todo).subscribe(res => {
      this.getTodos();
      this.todo = {};
      this.isEdit = false;
    });
  }

}
