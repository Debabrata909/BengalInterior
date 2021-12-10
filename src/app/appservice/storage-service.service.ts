import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  
public status: BehaviorSubject<boolean> = new BehaviorSubject<any>({});

changeData(value: any) {
  this.status.next(value);
}
}
class user {
  Registration_ID:Number;
  Name:String;
  Mobile:String;
  Email:String;
  DOB:String;
  Password:String;
}