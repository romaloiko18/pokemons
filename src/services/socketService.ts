import * as io from 'socket.io-client';
import { authService } from './auth';

class SocketService {
  private socket: io.Socket | null = null;

  public connect() {
    if (!this.socket) {
      this.socket = io.connect('http://localhost:8080', {
        auth: {
          token: authService.getToken()
        }
      });
    }
  }
}

export const socketService = new SocketService();
