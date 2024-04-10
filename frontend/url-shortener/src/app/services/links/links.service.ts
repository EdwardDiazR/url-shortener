import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devenvironment } from '../../../environments/environment.development';
import { CreateLinkDto, Link } from '../../Models/link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private _http: HttpClient) {}

  baseUrl = `${devenvironment.API_BASE}/shortener`;

  getUserLinks(userId: number) {
    const parametros: HttpParams = new HttpParams({
      fromObject: { username: userId },
    });

    return this._http.get<Link[]>(this.baseUrl + '/urls', {
      params: parametros,
    });
  }

  createNewLink(linkDto:CreateLinkDto){
    return this._http.post<Link>(`${this.baseUrl}/create-short-url`,linkDto)
  }

  deleteLinkById(id: number) {
    const parametros: HttpParams = new HttpParams({
      fromObject: {
        UrlId: id,
        UserId: 1,
      },
    });
    return this._http.delete(`${this.baseUrl}/delete`, {
      params: parametros,
    });
  }
}
