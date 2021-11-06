import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  
  constructor(@Inject('API_KEY') private apiKey: string) {}

  getHello(): string {
    return `Inject value with useValue ${this.apiKey}`;
  }
}
