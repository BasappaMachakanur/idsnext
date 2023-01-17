import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
    this.getData()
  }
  public userForm: FormGroup;
  Alldata: any = [];
  id:any="";
  name: string = "";
  designation: string = "";
  salary: any = "";

  empEdit : (null | number) = null; 
  formData: any = []


  constructor(private fb: FormBuilder) {
    // Form element defined below
    this.userForm = this.fb.group({
      name: '',
      designation: "",
      salary: "",

    });
  }
  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  reset() {
    this.userForm.reset();
  }

  getData() {

    let data: any = localStorage.getItem('task') ? localStorage.getItem("task") : "[]";
    this.Alldata = JSON.parse(data);


  }

  setValue() {
    let emp = {
    name : this.userForm.get('name')?.value,
    designation : this.userForm.get('designation')?.value,
    salary : this.userForm.get('salary')?.value // input value retrieved
    }
    let arr = [...this.Alldata];
    if(this.empEdit !== null) {
      arr[this.empEdit] = emp;
      this.empEdit = null;
    } else {
      arr = [...arr,emp];
    }
    this.Alldata = arr;
    this.saveData("task", arr );
    console.log(this.userForm.value)


  }

  deleteemployee(index: number) {
    console.log(index);
    let arr: any = [...this.Alldata];
    // this.Alldata.filter((value: any) => {
    //   if (value.name !==a.name && value.salary===a.salary ) {
    //   arr.push(value)
    //   }
    // })
    arr.splice(index,1);
    this.Alldata = arr;
    localStorage.setItem("task", JSON.stringify(arr));
    this.getData();
    console.log(arr)
  }

  showForm(data: any) {
    this.formData = data;
    this.userForm.patchValue({
          id: data.id,
          name: data.name,
          salary: data.salary,
          designation: data.designation

    });
    let arr: any = [];

    this.Alldata.filter((value: any) => {
      if (value.name !== data.name) {
        arr.push(value)
      }
    })
    localStorage.setItem("task", JSON.stringify(arr));
    this.getData();
    console.log(arr)

  }
  onEdit(index : number) : void {
    this.empEdit = index;
    let emp = this.Alldata[index];
    this.userForm = this.fb.group({
      name: emp.name,
      designation: emp.designation,
      salary: emp.salary,

    })
  }


}
