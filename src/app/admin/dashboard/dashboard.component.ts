import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  users:any;
  groups:any;

constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    ) 
  {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.userService.getStats().subscribe((data) => {
      this.users = data['users'];
      this.groups = data['groups'];
      this.spinner.hide();
    });
  }

}
