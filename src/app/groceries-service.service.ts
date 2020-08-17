import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,Subject} from 'rxjs';
import {map,catchError} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: any = [];
  
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http:HttpClient) { 
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
  

  getItems(): Observable<object[]>{
    return this.http.get(`${this.baseURL}/api/groceries`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData (res:Response){
    let body =res;
    return (body || {}) as object[];
  }

  private handleError (error:Response | any ) {
    let errMsg:string;
    if (error instanceof Response){
      const err = error || '';
      errMsg =`${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg =error.message ? error.message : error.toString();
    }
    console.error (errMsg);
    return Observable.throw(errMsg);
  }

  
  removeItem(item) {
    console.log ("### Remove Item - Id = ", item)
    this.http.delete (`${this.baseURL}/api/groceries/${item._id}`).subscribe(res => {
      this.items =res;
      this.dataChangeSubject.next(true);
    });
    
  }

  addItem(item,) {
    console.log("Adding Item :: ", item.name)
    this.http.post(`${this.baseURL}/api/groceries/`,item).subscribe(res=>{
      this.items=res;
      this.dataChangeSubject.next(true);
    });
  
  }

  editItem(item,index) {
    console.log("Editing item = ", index, item);
    this.http.put(`${this.baseURL}/api/groceries/${item._id}`, item).subscribe(res=>{
      this.items = res;
      this.dataChangeSubject.next(true);
  });

}
}