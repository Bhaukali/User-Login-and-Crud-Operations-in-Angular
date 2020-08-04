/* Calling different methods to do the CRUD operations */

import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allEmployee: Object;
  isEdit = false;
  employeeObj={
    name:'',
    enumber:'',
    mno:'',
    forte:'',
    id:''
  }

  constructor(private commonService:CommonService){}

  ngOnInit(){
   this.getLatestEmployee();
  }

  addEmployee(formObj){
    this.commonService.createEmployee(formObj).subscribe((response)=>{
      this.getLatestEmployee();
      console.log(formObj);
    })
  }

  getLatestEmployee(){
    this.commonService.getAllEmployee().subscribe((response)=>{
    this.allEmployee = response;
    })
  }

  editEmployee(employee){
    this.isEdit = true;
    this.employeeObj = employee;
  }

  deleteEmployee(employee){
    this.commonService.deleteEmployee(employee).subscribe(()=>{
      this.getLatestEmployee(); 
    })
  }

  updateEmployee(){
    this.isEdit = !this.isEdit;
    this.commonService.updateEmployee(this.employeeObj).subscribe(()=>{
      this.getLatestEmployee();
    })
  }
}
