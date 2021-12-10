import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular'; //import Platform

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Input() name: string;
  selectedImage: any; 
  constructor(private camera: Camera,private platform :Platform) { }

  ngOnInit() {
    this.selectedImage = 'assets/img_avatar.png'
  }
  picture() {
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
  
   //console.log(this.selectedImage );
    // alert(base64Image);
    }, (err) => {
     // Handle error
    });
     }
  })
  }
}
