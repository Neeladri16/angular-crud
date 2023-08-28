import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router){

  }

  // ngOnInit(): void {
  //   this.signupForm = this.formBuilder.group({
  //     fullname:[''],
  //     email:[''],
  //     password:[''],
  //     mobile:['']
  //   })
  // }

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      fullname: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
      mobile: new FormControl(null,[Validators.required])
    })
  }
signUp(){
  if(this.signupForm.valid){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
.subscribe(res=>{
  alert("Signup Successfull");
  this.signupForm.reset();
  this.router.navigate(['login']);
},err=>{
  alert("Something went wrong!")
})
  }else{
  alert("some fields are missing");
  }

}
}
