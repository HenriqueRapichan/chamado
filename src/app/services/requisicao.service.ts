import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoService {
  
  private urlPadrao = environment.url;

  constructor(private http: HttpClient) {}

  async get(url: string): Promise<Observable<any>> {
    let urlMontada = this.urlPadrao + url;
    return this.http.get(urlMontada);
  }
  async post(url: string, body: any): Promise<Observable<any>> {
    let urlMontada = this.urlPadrao + url;
    return this.http.post(urlMontada, body);
  }
}
