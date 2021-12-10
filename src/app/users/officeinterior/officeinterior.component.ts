import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officeinterior',
  templateUrl: './officeinterior.component.html',
  styleUrls: ['./officeinterior.component.scss'],
})
export class OfficeinteriorComponent implements OnInit {
  CommercialList = [];
  constructor(
    private $http: HttpClient
  ) { }

  ngOnInit() {
    this.getCommercial()
  }
  getCommercial(){
    this.CommercialList = [];
    const obj = JSON.stringify({"file_type": "COMMERCIAL"});
    const UrlAddress = "https://bengalint.azurewebsites.net/api/Mobile_Func_Adv?code=3zNmEN611FZ3ua4y0qn5V71guUpJrReJ6CBnvaOb37JdadxYTmrO2w==&Report_Name=Get_Image&Sp_Name=SP_Bengal_Int_Common";
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data);
    
    setTimeout(() => {
      this.CommercialList = data.message ? JSON.parse(data.message) : [];
    },2000);
    })
  }
}
