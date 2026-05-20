import { IsEnum, IsString } from 'class-validator';

export enum ServiceTypeDto {
  LUNCH = 'LUNCH',
  SNACK = 'SNACK',
}

export class ScanDto {
  @IsString()
  qrCode!: string;

  @IsEnum(ServiceTypeDto)
  serviceType!: ServiceTypeDto;
}