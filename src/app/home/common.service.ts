/* Calling of services to do the CRUD operations */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) { }

  createEmployee(employee){
    return this._http.post("http://localhost:3000/Employees", employee);
  }
  getAllEmployee(){
    return this._http.get("http://localhost:3000/Employees");
  }
  updateEmployee(employee){
    return this._http.put("http://localhost:3000/Employees/" + employee.id, employee);
  }
  deleteEmployee(employee){
    return this._http.delete("http://localhost:3000/Employees/" + employee.id);   
  }
}
