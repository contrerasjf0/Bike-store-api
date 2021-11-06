import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  
  constructor(@Inject('API_KEY') private apiKey: string, @Inject('TASKS') private tasks: any[]) {}

  getHello(): string {
    console.log(this.tasks);
    return `Inject value with useValue ${this.apiKey}`;
  }
}
