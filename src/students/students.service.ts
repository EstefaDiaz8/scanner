import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { randomUUID } from 'crypto'

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        qrCode: randomUUID(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        document: dto.document,
        grade: dto.grade,
        isActive: dto.isActive ?? true,
      },
    })
  }

  async findAll() {
    return this.prisma.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}