import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
          console.log(res.url);
          this.redirectToUrl(res.url);
        },
      });
  }

  private redirectToUrl(url: string) {
    const externalUrl = url; // Replace with the desired external URL
    const anchor = document.createElement('a');
    anchor.href = externalUrl;
    anchor.target = '_blank'; // Optional: Opens the URL in a new tab
    anchor.rel = 'noreferrer'; // Sets the noreferrer attribute
    anchor.click();
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
