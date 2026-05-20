import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { ScanDto } from './dto/scan.dto';

@Injectable()
export class ScanService {
    constructor(private prisma: PrismaService) { }

    async scan(dto: ScanDto) {
        const student = await this.prisma.student.findUnique({
            where: {
                qrCode: dto.qrCode,
            },
        });

        if (!student) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        if (!student.isActive) {
            throw new BadRequestException('El estudiante está inactivo');
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const existingAccess = await this.prisma.accessLog.findFirst({
            where: {
                studentId: student.id,
                serviceType: dto.serviceType,

                createdAt: {
                    gte: today,
                },
            },
        });

        if (existingAccess) {
            throw new BadRequestException(
                `El estudiante ya reclamo ${dto.serviceType.toLowerCase()} hoy`,
            );
        }

        await this.prisma.accessLog.create({
            data: {
                studentId: student.id,
                serviceType: dto.serviceType,
            },
        });

        return {
            success: true,

            message: `${dto.serviceType} registered successfully`,

            student,
        };
    }
}