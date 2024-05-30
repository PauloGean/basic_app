import * as Rx from 'rxjs';
import {environment} from "../../../environments/environment";



export class WebsocketService {

  public  API = environment.apiWebSockerUrl;

  constructor() {}

  private subject: Rx.Subject<MessageEvent>;

  public connect(path): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(this.API.concat(path));
      console.log('Successfully connected: ' + this.API.concat(path));
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      next: (data) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log("DATA:"+data);
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

}
