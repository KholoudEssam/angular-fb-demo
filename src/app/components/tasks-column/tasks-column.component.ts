import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodosService } from 'src/app/services/todos.service';
import {
  TaskDialogComponent,
  TaskDialogResult,
} from '../task-dialog/task-dialog.component';

import { Task } from 'src/app/components/task/task';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-column',
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.css'],
})
export class TasksColumnComponent implements OnInit {
  constructor(private dialog: MatDialog, private todosService: TodosService) {}

  todo$ = this.todosService.todo$;
  inProgress$ = this.todosService.inProgress$;
  done$ = this.todosService.done$;

  ngOnInit(): void {}

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      console.log(result);
      if (!result.task) return;

      if (result.delete) this.todosService.deleteTodo(result.task.id);
      else this.todosService.editTodo(result.task.id, result.task);
    });
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    if (event.previousContainer === event.container) return;

    if (!event.container.data || !event.previousContainer.data) return;

    const item = event.previousContainer.data[event.previousIndex];

    this.todosService.editTodo(item.id, { state: event.container.id });
  }
}
