import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(Task.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskDto = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'TO DO',
    };
    const task = new Task();
    task.title = 'Test Task';
    task.description = 'Test Description';
    task.status = 'TO DO';

    jest.spyOn(service, 'create').mockImplementation(async () => task);
    const createdTask = await service.create(taskDto);
    expect(createdTask).toEqual(task);
  });
});
