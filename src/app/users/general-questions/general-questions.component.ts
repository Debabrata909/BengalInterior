import { Component, OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular'; 
import { Toast } from '@ionic-native/toast/ngx';
@Component({
  selector: 'app-general-questions',
  templateUrl: './general-questions.component.html',
  styleUrls: ['./general-questions.component.scss'],
})
export class GeneralQuestionsComponent implements OnInit {
  @Input() name: string;
  selectedImage: any; 
  img1:any = undefined;
  img2:any = undefined;
  img3:any = undefined;
  SelectedImageArr:any = [];
  objgenquestions : genquestions = new genquestions();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private camera: Camera,
    private platform :Platform,
    private toast: Toast
  ) { 
    this.route.queryParams.subscribe(params => {
    console.log(params);
    this.objgenquestions.area = params.area;
    this.objgenquestions.cabin = params.cabin;
    this.objgenquestions.cubicle = params.cubicle;
    this.objgenquestions.name = params.name;
    this.objgenquestions.workstation = params.workstation;
     })
  }

  ngOnInit() {}
  picture() {
    if(this.SelectedImageArr.length === 4) {
      return false;
    }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 800,
    }
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.selectedImage =  (<any>window).Ionic.WebView.convertFileSrc(imageData);
    this.SelectedImageArr.push(this.selectedImage);
   console.log(this.SelectedImageArr );
    // alert(base64Image);
    }, (err) => {
     // Handle error
    });
     }
  })
  }
  RemoveImage(i) {
    this.SelectedImageArr.splice(i,1);
  }
 
  genQuestionsSubmit(){
    // this.router.navigateByUrl('ContactInfo');
    this.objgenquestions.img = this.SelectedImageArr;
    console.log(this.objgenquestions);
    var itemsLength = Object.keys(this.objgenquestions).length;
    if(itemsLength === 9){
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['registration'], {queryParams: this.objgenquestions}
        )
      );
    }
    else {
      this.toast.show(`Fill All Required Fields`, '4000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }
}
class genquestions{
  planning:any;
  budget:number;
  delivered:any;
  img:any= [];
  area: any;
  cabin: any;
  cubicle: any;
  name: any;
  workstation: any;
}