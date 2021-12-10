import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.scss'],
})
export class OtpverificationComponent implements OnInit {
  ionicOTPForm :FormGroup;
  regOTP:string = undefined;
  maxTime: any=30
  TimerLabel:any;
  TimerInterval:any;

  constructor(public formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
                this.route.queryParams.subscribe(params => {
                  console.log("login",params.otp);
                  this.regOTP = params.otp;
                  })
               }

  ngOnInit() {
    this.ionicOTPForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
     })
     this.StartTimer();
  }
  
  StartTimer(){
    var timeleft = 90;
    const ctrl = this;
    this.TimerInterval = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(ctrl.TimerInterval);
        ctrl.TimerLabel = "Finished";
      } else {
        ctrl.TimerLabel = timeleft + " seconds remaining";
      }
      //console.log(ctrl.TimerLabel)
      timeleft -= 1;
    }, 1000);
  }
  get errorControl() {
    return this.ionicOTPForm.controls;
  }
  submitForm() {
    if (!this.ionicOTPForm.valid) {
      console.log('Please provide all the required values!')
    }
    else {
      console.log(this.ionicOTPForm.value);
      let tempvalue = this.ionicOTPForm.value
      if(tempvalue.otp === this.regOTP){
        console.log("true");
        this.openDetailsWithQueryParams()
      }
      else {
        console.log("False");
      }
    }
  } 
  onOtpChange(e){
  console.log(e);
  }
  openDetailsWithQueryParams() {  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        log: false
      }
    };
    this.router.navigate(['/'], navigationExtras);
  }
  ResendOtp(){
    clearInterval(this.TimerInterval);
    this.TimerLabel = undefined;
    this.StartTimer();
  }
}
