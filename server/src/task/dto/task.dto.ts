export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly status: string;
}

export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly status?: string;
}
