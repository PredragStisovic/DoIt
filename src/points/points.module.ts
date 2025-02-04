import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Points } from './entities/points.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Points])],
  providers: [PointsService],
  controllers: [PointsController],
  exports : [PointsService]
})
export class PointsModule {}
