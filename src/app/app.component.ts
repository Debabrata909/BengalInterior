import { Component , OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { StorageServiceService } from './appservice/storage-service.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login = false;
  loginData:any = [];
  public appPages = [
    { title: 'Home', url: 'Home', icon: 'home' },
    { title: 'Home Interior', url: 'homeinterior', icon: 'storefront' },
    { title: 'Office Interior', url: 'office', icon: 'business' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  appPages1 = [ ];
  
  UserData:any = {}
  constructor(public StoreService : StorageServiceService,
              public UserStore : Storage,
              private router: Router,
              private route: ActivatedRoute,
              private _router: Router,
              private nativeStorage: NativeStorage,
              private platform :Platform
  ) {
   
      this.appPages1 = [];
      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          this.nativeStorage.getItem('myitem')
          .then(
            (data:any) => {
              this.loginData = data;
              console.log("login data app",data);
              if(data){
                this.appPages1 = [
                  { title: 'Log Out', url: 'login', icon: 'person-remove' }
                 ];
                this.UserData = this.loginData;
              } else {
                this.appPages1 = [
                  { title: 'Registration', url: 'registration', icon: 'person-add' }, 
                    { title: 'login', url: 'login', icon: 'person' }
                 ];
              }
            },
            error => console.error(error)
          );
         
       }
    })
    
     
   
    
    this.route.queryParams.subscribe(params => {
    this.login = params.log;
    
    })
  }
  ngOnInit() {
  
    // if(this.login){
       
    // }
    // else {
    //   this.appPages1 = [];
    // }
  }
}
