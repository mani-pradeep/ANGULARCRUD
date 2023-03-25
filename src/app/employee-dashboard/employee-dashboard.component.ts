import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../employee.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  employeeData!: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();
  employeesData!: any;
  showAdd: boolean = true;
  showUpdate: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.employeeData = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      mobileNo: [''],
    });

    this.getAllEmployees();
  }

  onAddEmployee() {
    this.employeeData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addEmployeeDetails() {
    this.employeeObj.firstName = this.employeeData.value.firstName;
    this.employeeObj.lastName = this.employeeData.value.lastName;
    this.employeeObj.emailId = this.employeeData.value.emailId;
    this.employeeObj.mobileNo = this.employeeData.value.mobileNo;

    this.api.addEmployee(this.employeeObj).subscribe(
      (data) => {
        console.log(data);
        alert('Employee added successfully!');
        let elementRef = document.getElementById('cancel');
        elementRef?.click();
        this.employeeData.reset();
        this.getAllEmployees();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe(
      (res) => {
        this.employeesData = res;
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  deleteEmployee(emp: EmployeeModel) {
    this.api.deleteEmployee(emp.id).subscribe(
      (res) => {
        alert(
          'Employee: ' +
            emp.firstName +
            ' ' +
            emp.lastName +
            ' was removed from the database!'
        );
        this.getAllEmployees();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  updateEmployee(emp: EmployeeModel) {
    this.employeeObj.id = emp.id;
    this.employeeData.controls['firstName'].setValue(emp.firstName);
    this.employeeData.controls['lastName'].setValue(emp.lastName);
    this.employeeData.controls['emailId'].setValue(emp.emailId);
    this.employeeData.controls['mobileNo'].setValue(emp.mobileNo);

    this.showAdd = false;
    this.showUpdate = true;
  }

  updateEmployeeDetails() {
    this.employeeObj.firstName = this.employeeData.value.firstName;
    this.employeeObj.lastName = this.employeeData.value.lastName;
    this.employeeObj.emailId = this.employeeData.value.emailId;
    this.employeeObj.mobileNo = this.employeeData.value.mobileNo;

    this.api.updateEmployee(this.employeeObj, this.employeeObj.id).subscribe(
      (res) => {
        alert('Employee Details updated successfully!');
        let elementRef = document.getElementById('cancel');
        elementRef?.click();
        this.employeeData.reset();
        this.getAllEmployees();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }
}
