import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateStudentDto {
  @IsString()
  firstName!: string

  @IsString()
  lastName!: string

  @IsString()
  document!: string

  @IsString()
  grade!: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}