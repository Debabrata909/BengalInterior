import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { HomeComponent } from './users/home/home.component'
import { RegistrationComponent } from './users/registration/registration.component'
import { CameraComponent } from './users/camera/camera.component'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { LoginComponent } from './users/login/login.component';
import { OtpverificationComponent } from './users/otpverification/otpverification.component';
import { OfficeinteriorComponent } from './users/officeinterior/officeinterior.component';
import { ProductsComponent } from './users/products/products.component';
import { HomeinteriorComponent } from './users/homeinterior/homeinterior.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageServiceService } from './appservice/storage-service.service'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';

import { GeneralQuestionsComponent } from './users/general-questions/general-questions.component';
import { NeedHelpComponent } from './users/need-help/need-help.component';
import { RegistrationQuestionsComponent } from './users/registration-questions/registration-questions.component';
import { Toast } from '@ionic-native/toast/ngx'
import { ProfileComponent } from './users/profile/profile.component';
@NgModule({
  declarations: [AppComponent,
                 HomeComponent,
                 RegistrationComponent,
                 CameraComponent,
                 LoginComponent,
                 OtpverificationComponent,
                 OfficeinteriorComponent,
                 ProductsComponent,
                 GeneralQuestionsComponent,
                 NeedHelpComponent,
                 RegistrationQuestionsComponent,
                 ProfileComponent,
                 HomeinteriorComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    MatExpansionModule,
    NgbModule,
    NgOtpInputModule,
    CommonModule],
  providers: [Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },StorageServiceService,NativeStorage,Toast],
  bootstrap: [AppComponent],
})
export class AppModule {}
