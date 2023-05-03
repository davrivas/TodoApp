import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { TodoItemDto, TodoService } from '@proxy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todoItems: TodoItemDto[];
  newTodoText: string;
  isEditing: boolean = false;
  itemToEdit: string;

  constructor(
      private todoService: TodoService,
      private toasterService: ToasterService)
  { }

  ngOnInit(): void {
    this.todoService.getList().subscribe(response => {
      this.todoItems = response;
    });
  }
  
  submit(): void {
    if (this.isEditing) {
      this.todoService.update(this.itemToEdit, this.newTodoText).subscribe((result) => {
        this.todoItems.forEach(item => {
          if (item.id === this.itemToEdit) {
            item.text = this.newTodoText;
          }
        });

        this.cancelEdit();
        this.toasterService.info('Edited the todo item.');
      })
    } else {
      this.todoService.create(this.newTodoText).subscribe((result) => {
        this.todoItems = this.todoItems.concat(result);
        this.newTodoText = null;
        this.toasterService.info('Created the todo item.');
      });
    }
  }

  delete(id: string): void {
    this.todoService.delete(id).subscribe(() => {
      this.todoItems = this.todoItems.filter(item => item.id !== id);
      this.toasterService.info('Deleted the todo item.');
    });
  } 

  edit(id: string) {
    this.isEditing = true;
    this.itemToEdit = id;
    this.newTodoText = this.todoItems.find(item => item.id === id).text;
  }

  cancelEdit() {
    this.isEditing = false;
    this.itemToEdit = null;
    this.newTodoText = null;
  }
}

