import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './users/camera/camera.component';
import { HomeComponent } from './users/home/home.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component'
import { OtpverificationComponent } from './users/otpverification/otpverification.component'
import { OfficeinteriorComponent } from './users/officeinterior/officeinterior.component'
import { ProductsComponent } from './users/products/products.component'
import { HomeinteriorComponent } from './users/homeinterior/homeinterior.component'
import { NeedHelpComponent } from './users/need-help/need-help.component';
import { RegistrationQuestionsComponent } from './users/registration-questions/registration-questions.component';
import { GeneralQuestionsComponent } from './users/general-questions/general-questions.component';
import { ContactInfoComponent } from './users/contact-info/contact-info.component';
import { ProfileComponent } from './users/profile/profile.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'camera',
    component: CameraComponent,
    pathMatch: 'full'
  },
  {
    path: 'otp',
    component: OtpverificationComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'office',
    component: OfficeinteriorComponent,
    pathMatch: 'full'
  },
  {
    path: 'Product',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'homeinterior',
    component: HomeinteriorComponent,
    pathMatch: 'full'
  },
  {
    path: 'help',
    component: NeedHelpComponent,
    pathMatch: 'full'
  },
  {
    path: 'genQuestion',
    component: GeneralQuestionsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Questions',
    component: RegistrationQuestionsComponent,
    pathMatch: 'full'
  },
  {
    path: 'ContactInfo',
    component: ContactInfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
