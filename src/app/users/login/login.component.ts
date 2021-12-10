import { Component, OnInit,Input,HostListener} from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { StorageServiceService } from 'src/app/appservice/storage-service.service';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() phnumber: any;
  LoginForm: FormGroup;
  saveItem = [];
  constructor(public StoreService : StorageServiceService,
    public UserStore : Storage,
    private router: Router,
    private route: ActivatedRoute,
    private _router: Router,
    private $http: HttpClient,
    public formBuilder: FormBuilder,
    public localStore: StorageServiceService,
    public toastController: ToastController,
    private nativeStorage: NativeStorage,
    private platform :Platform
  ) {
    this.StoreService.status.subscribe((res:any) => {
      console.log('login',res);
      if(res) {
       
      }       
    });

    this.route.queryParams.subscribe(params => {
     
      })
    //   this.platform.ready().then(() => {
    //     if(this.platform.is('cordova')){
    //       this.nativeStorage.setItem('myitem',"")
    //       .then(
    //         (data:any) => {
    //           console.log(data)
              
    //         });
        
    //    }
    // })
   }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required]],
    })
  }
   digitValidate = function(ele){
    console.log(ele.value);
    ele.value = ele.value.replace(/[^0-9]/g,'');
  }
  
   tabChange = function(val){
      let ele = document.querySelectorAll('input');
      if(ele[val-1].value != ''){
        ele[val].focus()
      }else if(ele[val-1].value == ''){
        ele[val-2].focus()
      }   
   }
   loginForm(){
    if (!this.LoginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.LoginForm.value);
     this.saveItem = [{
        "Email":this.LoginForm.value.email,
        "Password" :this.LoginForm.value.pass
      }]
     this.saveData(this.saveItem);
     console.log("this.formValue",this.saveItem);
     }
   }
   saveData(ionicForm){
    // this.UserStore.remove('RegData');
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.$http.post("https://tutopiacallaz.azurewebsites.net/api/Mobile_Func_Adv?code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg==&Report_Name=Login_RH_Registration&Sp_Name=SP_RH_Registration",JSON.stringify(ionicForm), {headers: headers}).subscribe((res: any) => {
      console.log(res);
      if(res.message){
        const checkreturn = JSON.parse(res.message);     
         if(checkreturn[0].Column1){
            console.log("error",checkreturn[0].Column1);
            this.presentToast(checkreturn[0].Column1);
         }
         else {
          this.localStore.changeData(checkreturn[0]);
          this.savetoStorage(checkreturn[0]);
          this.router.navigateByUrl('/');
         }
      }
      });
  }
  savetoStorage(obj) {
    this.nativeStorage.setItem('myitem', obj)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  
}
