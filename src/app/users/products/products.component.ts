import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productList = [];
  productType = "";
  pageType = "";
  returnPage = ""
  constructor(
    private route: ActivatedRoute,
    private _router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.productType = params.type,
      this.pageType = params.page
      this.returnPage = params.backURL
      })
  }
  offchair =[
    {
    id:1,
    name:"Name",
    src:"assets/sofa.jpeg"
  },
  {
    id:2,
    name:"Name",
    src:"assets/sofa2.jpeg"
  },
] 
offtable =[
  {
  id:1,
  name:"Name",
  src:"assets/table1.jpg"
},
{
  id:2,
  name:"Name",
  src:"assets/table2.jpeg"
},
] 

homeDressingTables =[
  {
      id:1,
      name:"Name",
      src:"assets/1-catalog2.jpg"
    },
    {
      id:2,
      name:"Name",
      src:"assets/1-catalog3.jpg"
    }
]
homeDressingBed =[
  {
      id:1,
      name:"Name",
      src:"assets/2-bd.jpg"
    },
    {
      id:2,
      name:"Name",
      src:"assets/3-bd.jpg"
    }
]
  ngOnInit() {
    if( this.pageType === "Commercial" && this.productType === "Sofa"){
      this.productList = this.offchair;
    }
    else if (this.pageType === "Commercial" && this.productType === "TABLE" ){
        this.productList = this.offtable;
    }
    else if (this.pageType === "HOME" && this.productType === "Dressing Tables" ){
      this.productList = this.homeDressingTables;
  }
  else if (this.pageType === "HOME" && this.productType === "Beds" ){
    this.productList = this.homeDressingBed;
}
  }
  
}
