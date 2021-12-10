import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from 'src/app/appservice/storage-service.service';
import { IonRouterOutlet, ModalController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Plugin } from '@ionic-native/core';
declare var $: any;
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { PopoverController } from '@ionic/angular';
import {NeedHelpComponent} from '../need-help/need-help.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonName = {
    button: 'Sing Up ',
    url: "/login"
  };
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
    autoplay: {
          delay: 4000
    }
  };
  slidefar = {
    initialSlide: 1,
    speed: 500,
    loop: true,
    autoplay: {
          delay: 3000
    },
    pagination: false,
    
  };
  clientLogoList = [];
  UserData = {};
  bannerList = [];
  homeProductList = [];
  constructor(public StoreService : StorageServiceService,
    public UserStore : Storage,
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    private $http: HttpClient,
    private popupComponent:PopoverController ) {
      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          this.nativeStorage.getItem('myitem')
          .then(
            data =>{
              
              if(data){
                console.log(data);
              }
            },
            error => console.error(error)
          );
        }
      })
    
    // this.StoreService.status.subscribe((res:any) => {
    //   if(res){
    //     console.log(JSON.parse(res));
    //   this.UserData = JSON.parse(res)[0];
    //   }
      
    // });   
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   console.log('Handler was called!');
    // }); 
   }

  ngOnInit() {
    this.GetsingleProduct();
    this.Getbanner();
    this.GetClientLogo();
    console.log(this.buttonName);
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popupComponent.create({
      component: NeedHelpComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        onClick: () => {
          popover.dismiss();
        },
      },
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  slideChanged(){}
  // needHelp(){
  //   this.router.navigateByUrl('help');
  // }
  public needHelp(){
    this.router.navigateByUrl('help');
  }
  public profile(){
    this.router.navigateByUrl('profile');
  }
 public GetsingleProduct() {
    this.homeProductList = [];
      const obj = JSON.stringify({"file_type": "SINGLE"});
      const UrlAddress = "https://bengalint.azurewebsites.net/api/Mobile_Func_Adv?code=3zNmEN611FZ3ua4y0qn5V71guUpJrReJ6CBnvaOb37JdadxYTmrO2w==&Report_Name=Get_Image&Sp_Name=SP_Bengal_Int_Common";
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      this.homeProductList = data.message ? JSON.parse(data.message) : [];
      })
  }
 public Getbanner(){
  this.bannerList = [];
  const obj = JSON.stringify({"file_type": "BANNER"});
  const UrlAddress = "https://bengalint.azurewebsites.net/api/Mobile_Func_Adv?code=3zNmEN611FZ3ua4y0qn5V71guUpJrReJ6CBnvaOb37JdadxYTmrO2w==&Report_Name=Get_Image&Sp_Name=SP_Bengal_Int_Common";
  this.$http.post(UrlAddress, obj).subscribe((data: any) => {
  this.bannerList = data.message ? JSON.parse(data.message) : [];
  console.log(this.bannerList);
  })
 }
 public GetClientLogo(){
  this.clientLogoList = [];
  const obj = JSON.stringify({"file_type": "LOGO"});
  const UrlAddress = "https://bengalint.azurewebsites.net/api/Mobile_Func_Adv?code=3zNmEN611FZ3ua4y0qn5V71guUpJrReJ6CBnvaOb37JdadxYTmrO2w==&Report_Name=Get_Image&Sp_Name=SP_Bengal_Int_Common";
  this.$http.post(UrlAddress, obj).subscribe((data: any) => {
  this.clientLogoList = data.message ? JSON.parse(data.message) : [];
  console.log(this.bannerList);
  $(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
  })
 }
}
