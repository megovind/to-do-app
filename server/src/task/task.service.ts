import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { UserDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, user: UserDto): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      ...{ userId: user.userId },
    });
    return createdTask.save();
  }

  async findAll(user: UserDto): Promise<Task[]> {
    return this.taskModel
      .find({ userId: user.userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
