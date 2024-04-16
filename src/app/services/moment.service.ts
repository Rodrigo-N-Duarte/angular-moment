import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Moment} from "../interfaces/Moment";
import {environment} from "../../environments/environment";
import {Response} from "../interfaces/Response";
@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseUrl: string = environment.baseApiUrl
  private apiUrl: string = this.baseUrl + "/moments"

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
      return this.http.post<FormData>(this.apiUrl, formData)
  }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMomentById(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Moment>>(url)
  }

  removeMomentById(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Response<Moment>>(url)
  }

  updateMomentById(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }
}
