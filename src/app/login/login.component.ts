import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  valid: boolean= true;
  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router){

  }
//   ngOnInit(): void {
// this.loginForm = this.formBuilder.group({
//   email:[''],
//   password:['']
// })
//   }

ngOnInit(): void {
  this.loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])
  })
}

  login(){
    console.log("thisss",this.loginForm)
    if(this.loginForm.valid){
      this.http.get<any>("http://localhost:3000/signupusers")
      .subscribe(res=>{
       const user = res.find((a:any)=>{
         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
       });
       if(user){
         alert("Login Success!");
         this.loginForm.reset();
         this.router.navigate(['home']);
       }else{
         alert("user not found!")
       }
      },err=>{
       alert("Something went wrong!")
      })
    }else{
      alert("Some fields are missing")
     }
    }
  
}
