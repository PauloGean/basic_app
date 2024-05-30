import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from './paginated-result.model';


export class BaseService<T>  {

  protected protocol: string = location.protocol;
  protected hostname: string = location.hostname;
  public httpOptions: any;
  public baseUrl='';
  protected parameters: HttpParams=new HttpParams();
  protected headers = new Headers(
    {
      'Content-Type': 'application/json',
    }
  );
  constructor(protected http: HttpClient, path: string) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.baseUrl=`${this.getUrlApi()}${path}`;
  }

  public getUrlApi(): string {
    return this.protocol.concat('//').concat(this.hostname).concat(environment.apiUrl);
  }
  
  public clearParameter(): void {
    this.parameters = new HttpParams();
  }

  public addParameter(key: string, value: string): void {
    this.parameters = this.parameters.set(key, value);
  }

  public appendParameter(key: string, value: string): void {
    this.parameters = this.parameters.append(key, value);
  }

  public getAll(): Observable<Array<T>> {
    const params = this.parameters;
    return this.http.get<Array<T>> (this.baseUrl,  {params});
  }

  public getPaginated():Observable<PaginatedResult<T>> {
    const params = this.parameters;
    return this.http.get<PaginatedResult<T>>(this.baseUrl,{params});
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl.concat(String(id) + '/'));
  }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    return this.http.post<T>(this.baseUrl, entity);
  }
  
  public delete(id: number): any {
    this.clearParameter();
    return this.http.delete(this.baseUrl.concat(String(id) + '/'));
  }

  public update(id: number, body: any): Observable<T> {
    this.clearParameter();
    return this.http.patch<T>(this.baseUrl.concat(String(id) + '/'), body);
  }
 
}
