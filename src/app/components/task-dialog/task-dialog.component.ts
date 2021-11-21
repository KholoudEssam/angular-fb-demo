import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Task = { ...this.data.task };

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.id = this.backupTask.id;
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.state = this.backupTask.state;
    this.dialogRef.close(this.data.task);
  }
}

export interface TaskDialogData {
  task: Task;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
