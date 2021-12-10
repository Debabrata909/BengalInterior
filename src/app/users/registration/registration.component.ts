import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from 'src/app/appservice/storage-service.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  data: any;
 formValue:any = [];
constructor(public formBuilder: FormBuilder,
            public UserStore : Storage,
            private router: Router,
            private $http: HttpClient,
            private  localStore: StorageServiceService,
            public toastController: ToastController,
            private route: ActivatedRoute,) {
              this.route.queryParams.subscribe(params => {
                console.log("All Data",params);
              })
             }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(10)]]
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  RedirectOtp() {
     this.router.navigateByUrl('/otp');
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value);
      this.formValue = this.ionicForm.value;
      this.formValue = {
        "Name" : this.ionicForm.value.name,
        "Mobile": this.ionicForm.value.mobile,
        "Email": this.ionicForm.value.email,
        "DOB": this.ionicForm.value.dob,
        "Password" : this.makeRandom()
      }
     this.saveData(this.formValue);
     console.log("this.formValue",this.formValue);
     }
  }
  saveData(ionicForm){
    //this.UserStore.remove('RegData');
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.$http.post("https://tutopiacallaz.azurewebsites.net/api/Mobile_Func_Adv?code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg==&Report_Name=Save_RH_Registration&Sp_Name=SP_RH_Registration",JSON.stringify(ionicForm), {headers: headers}).subscribe((res: any) => {
      console.log(res);
    if(res.message){
      const checkreturn = JSON.parse(res.message);     
       if(checkreturn[0].Column1){
          console.log("error",checkreturn[0].Column1);
          this.presentToast(checkreturn[0].Column1);
       }
       else {
        this.localStore.changeData(checkreturn[0]);
       // this.router.navigateByUrl('/');
       }
    }
    
     // this.CampaignList = res.length ? res : [];
    });
  }
  makeRandom() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

