import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  logout() {
    localStorage.clear();
    this.router.navigate(['/home/login']);
  }
}
