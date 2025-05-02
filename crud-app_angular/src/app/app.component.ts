import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmplyeeModel } from './model/Emplyee';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj:EmplyeeModel = new EmplyeeModel();
  employeeList: EmplyeeModel[] = [];

  constructor() {
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }
  createForm() {
      this.employeeForm = new FormGroup({
        empId: new FormControl(this.employeeObj.empId),
        name: new FormControl(this.employeeObj.name,[Validators.required]),
        city: new FormControl(this.employeeObj.city),
        state: new FormControl(this.employeeObj.state),
        emailId: new FormControl(this.employeeObj.emailId),
        contactNo: new FormControl(this.employeeObj.contactNo),
        adress: new FormControl(this.employeeObj.adress),
        pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(6)]),
        
      })
  }
  onSave()
  {
     const oldData = localStorage.getItem("EmpData");
     debugger;
     if (oldData !== null) {
      const parseData= JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
     }
      else {
        
        this.employeeList.unshift(this.employeeForm.value);
        
      }   
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }
  onEdit(item: EmplyeeModel)
  {
    this.employeeObj = item;
    this.createForm();
  }
onUpdate()
{
    const record = this.employeeList.find(m=> m.empId == this.employeeForm.controls['empId'].value);
    if (record != undefined)
      {
        record.name = this.employeeForm.controls['name'].value;
        record.contactNo = this.employeeForm.controls['contactNo'].value;
        record.adress = this.employeeForm.controls['adress'].value;
      }
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      this.employeeObj = new EmplyeeModel();
      this.createForm();
}
onDelete(id: number)
{
  const isDelete = confirm("Are you sure want to Delete?");
  if (isDelete) {
    const index = this.employeeList.findIndex(m => m.empId == id);
    
      this.employeeList.splice(index, 1);
    
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }
}
onReset()
{
  this.employeeObj = new EmplyeeModel();
      this.createForm();
}
   
}
