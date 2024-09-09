import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Post('/void')
  postVoidRequest(@Body() requestBody) {
    console.log(requestBody);
    return this.appService.postVoidRequest(requestBody);
  }
}
