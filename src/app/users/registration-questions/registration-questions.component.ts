import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
@Component({
  selector: 'app-registration-questions',
  templateUrl: './registration-questions.component.html',
  styleUrls: ['./registration-questions.component.scss'],
})
export class RegistrationQuestionsComponent implements OnInit {
  prj:any = []
  headername = undefined;
  objqueries : queries = new queries();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: Toast
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.objqueries.name = params.need
      this.headername = params.need
     })
   }

  ngOnInit() {}
  
  GenQuestions(){
    console.log(this.objqueries);
    var itemsLength = Object.keys(this.objqueries).length;
    if(this.headername === "Commercial Designs"){
    if(itemsLength === 5){
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['genQuestion'], {queryParams: this.objqueries}
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
  else if(this.headername === "Residential Projects"){
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['genQuestion'], {queryParams: this.objqueries}
      )
    );
  }
  }
}
class queries {
  area:number;
  cubicle:number;
  cabin:number;
  workstation:number;
  name:any;
}
