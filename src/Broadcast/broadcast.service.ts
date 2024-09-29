import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class BroadcastService {
  constructor() {
    console.log('BroadcastService');
  }
  @WebSocketServer()
  server: Server;

  sendToClients(content) {
    console.log(
      'sendToClients----------------------------------------------------------------',
    );
    this.server.emit('newContent', content);
  }
}
