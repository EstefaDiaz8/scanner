import { Body, Controller, Post } from '@nestjs/common';

import { ScanService } from './scan.service';

import { ScanDto } from './dto/scan.dto';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  scan(@Body() dto: ScanDto) {
    return this.scanService.scan(dto);
  }
}