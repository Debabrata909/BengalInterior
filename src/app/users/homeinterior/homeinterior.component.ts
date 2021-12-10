import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-homeinterior',
  templateUrl: './homeinterior.component.html',
  styleUrls: ['./homeinterior.component.scss'],
})
export class HomeinteriorComponent implements OnInit {
  ResidentialList = [];
  test = [];
  constructor(
    private $http: HttpClient
  ) { }

  ngOnInit() {
    this.getResidentialList();
  }
getResidentialList(){
  this.ResidentialList = [];
  const obj = JSON.stringify({"file_type": "RESIDENTIAL"});
  const UrlAddress = "https://bengalint.azurewebsites.net/api/Mobile_Func_Adv?code=3zNmEN611FZ3ua4y0qn5V71guUpJrReJ6CBnvaOb37JdadxYTmrO2w==&Report_Name=Get_Image&Sp_Name=SP_Bengal_Int_Common";
  this.$http.post(UrlAddress, obj).subscribe((data: any) => {
    console.log(data);
  
  setTimeout(() => {
    this.ResidentialList = data.message ? JSON.parse(data.message) : [];
  },2000);
  })
}
}
