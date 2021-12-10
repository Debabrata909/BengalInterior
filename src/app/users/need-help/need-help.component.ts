import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss'],
})
export class NeedHelpComponent implements OnInit {
  Commercial = false;
  Residential = false;
  HelpTitleList = [ {
    'name' : 'Commercial Designs',
    'selected' :false
  },{
    'name' : 'Residential Projects',
    'selected' :false
  }]
  @Input() onClick;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
  public closeModal(){

  }
  checkboxChenges(e){
    console.log("value",e);
    
  }
  SelectHelpTitle(i) {
    this.HelpTitleList.forEach((e,ind)=>{
      this.HelpTitleList[ind].selected = i === ind ? true : false;
    })
    
  }
   RegQuestions(name){
    let tempSendObj:any = [];
    
    this.onClick();
   // const validFlag = this.HelpTitleList.filter(e => e.selected);
    
     tempSendObj = {
       need:name
     }
      this.router.navigateByUrl(this.router.createUrlTree(
        ['Questions'], {queryParams: tempSendObj}
      ));
    
  }
}
