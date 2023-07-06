import { Module } from '@nestjs/common'
import { SocketsGateway } from './sockets.gateway'
import { SocketsService } from './sockets.service'

@Module({
  providers: [SocketsGateway, SocketsService],
})
export class SocketsModule {}
