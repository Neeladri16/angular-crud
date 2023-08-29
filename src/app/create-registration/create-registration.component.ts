import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
import {NgToastService} from 'ng-angular-popup'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
   public showCancel:boolean= false;
   public packages: string[] =["Monthly","Quarterly","Yearly"];
   public genders: string[] = ["Male","Female"];  
   public importantList : string[]=[
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
   ];

   public registerForm! : FormGroup
   public userIdToUpdate! :number
   public isUpdateActive: boolean =false

   constructor(private fb: FormBuilder,
    private api: ApiService,
     private toastService: NgToastService,
     private activateRoute:ActivatedRoute,
     private router: Router){

   }
  // ngOnInit(): void {
  //   this.registerForm = this.fb.group({
  //     firstName: [''],
  //     lastName: [''],
  //     email: [''],
  //     mobile: [''],
  //     weight: [''],
  //     height: [''],
  //     bmi: [''],
  //     bmiResult: [''],
  //     gender: [''],
  //     requireTrainer: [''],
  //     package: [''],
  //     important: [''],
  //     haveGymBefore: [''],
  //     enquiryDate: ['']
  //   });

    ngOnInit(): void {
      // console.log("urll",this.router.url.includes("update"));
      if(this.router.url.includes("update")){
        this.showCancel= this.router.url.includes("update")
        // console.log("showCancel",this.showCancel)
      }else{
        this.showCancel= this.router.url.includes("update")
      }
      this.registerForm = new FormGroup({
  
        firstName: new FormControl(null,[Validators.required]),
        lastName: new FormControl(null,[Validators.required]),
        email: new FormControl(null,[Validators.required]),
        mobile: new FormControl(null,[Validators.required]),
        weight: new FormControl(null,[Validators.required]),
        height: new FormControl(null,[Validators.required]),
        bmi: new FormControl(null,[Validators.required]),
        bmiResult: new FormControl(null,[Validators.required]),
        gender: new FormControl(null,[Validators.required]),
        requireTrainer: new FormControl(null,[Validators.required]),
        package: new FormControl(null,[Validators.required]),
        important: new FormControl(null,[Validators.required]),
        haveGymBefore: new FormControl(null,[Validators.required]),
        enquiryDate: new FormControl(null,[Validators.required])
      });

    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res)
    });

    this.activateRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res=>{
          this.isUpdateActive = true
          this.fillFormToUpdate(res)
      })
    })
  }
submit(){
  console.log(this.registerForm)
   this.api.postRegistration(this.registerForm.value)
   .subscribe(res=>{
       this.toastService.success({detail:"SUCCESS", summary:"Enquiry Added", duration:3000});
       this.registerForm.reset();
   })
}

update(){
  this.api.updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
  .subscribe(res=>{
      this.toastService.success({detail:"SUCCESS", summary:"Enquiry Updated", duration:3000});
      this.registerForm.reset();
      this.router.navigate(['list'])
  })
}

calculateBmi(heightValue: number){
const weight = this.registerForm.value.height;
const height = heightValue
const bmi = weight/(height*height)
this.registerForm.controls['bmi'].patchValue(bmi);

switch(true){
  case bmi < 18.5:
    this.registerForm.controls['bmiResult'].patchValue("Underweight")
    break;
  case (bmi >= 18.5 && bmi < 25):
    this.registerForm.controls['bmiResult'].patchValue("Normal")
    break;
  case (bmi >= 25 && bmi < 30):
    this.registerForm.controls['bmiResult'].patchValue("Overweight")
    break;
  default:
    this.registerForm.controls['bmiResult'].patchValue("Obese")
    break;
   }
}


fillFormToUpdate(user: User){
this.registerForm.setValue({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  mobile: user.mobile,
  weight: user.weight,
  height: user.height,
  bmi: user.bmi,
  bmiResult: user.bmiResult,
  gender: user.gender,
  requireTrainer: user.requireTrainer,
  package: user.package,
  important: user.important,
  haveGymBefore: user.haveGymBefore,
  enquiryDate: user.enquiryDate
})
}

}
