import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {}
  signin(){
    const obj={
      login: true
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['registration'], {queryParams: obj}
      )
    );
  }
}
