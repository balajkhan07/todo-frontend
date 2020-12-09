import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  serviceUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(`${this.serviceUrl}/get-todos`);
  }

  addTodo(data: Todo) {
    return this.http.post(`${this.serviceUrl}/post-todo`, data);
  }

  updateTodos(data: Todo) {
    return this.http.put(`${this.serviceUrl}/put-todo`, data);
  }

  removeTodo(data: Todo) {
    return this.http.delete(`${this.serviceUrl}/delete-todo/${data._id}`);
  }

}
