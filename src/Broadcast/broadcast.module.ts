import { Module } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';

@Module({
  providers: [BroadcastService],
  exports: [BroadcastService], // Exporting service for use in other modules
})
export class BroadcastModule {}
