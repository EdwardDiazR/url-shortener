import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Renderer2 } from '@angular/core';
import { devenvironment } from '../../../environments/environment.development';
import { CreateLinkDto, Link, UrlApiResponse } from '../../Models/link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private _http: HttpClient) {}

  baseUrl = `${devenvironment.API_BASE}/shortener`;

  getUserLinks(userId: string) {
    const parametros: HttpParams = new HttpParams({
      fromObject: { username: userId },
    });

    return this._http.get<Link[]>(this.baseUrl + '/urls', {
      params: parametros,
    });
  }

  getLinkByUrlId(id: string) {
    const parametros: HttpParams = new HttpParams({
      fromObject: {
        Url: id,
      },
    });

    return this._http.get<UrlApiResponse>(this.baseUrl + '/get-full-url', {
      params: parametros,
    });
  }

  visitLink(url: string) {
    const parametros: HttpParams = new HttpParams({
      fromObject: {
        Url: url,
      },
    });

    this._http
      .get<UrlApiResponse>(this.baseUrl + '/get-full-url', {
        params: parametros,
      })
      .subscribe({
        next: (res) => {
          console.log(res);

          console.log(res.url);
          this.redirectToUrl(res.url);
        },
        error: (e) => {
          return e.error;
        },
      });
  }

  redirectToUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  createNewLink(linkDto: CreateLinkDto) {
    return this._http.post<Link>(`${this.baseUrl}/create-short-url`, linkDto);
  }

  deleteLinkById(id: number, userId: number) {
    const parametros: HttpParams = new HttpParams({
      fromObject: {
        UrlId: id,
        UserId: userId,
      },
    });
    return this._http.delete(`${this.baseUrl}/delete`, {
      params: parametros,
    });
  }
}
