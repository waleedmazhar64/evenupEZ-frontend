import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any[] = [];

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
    this.fetchUsers();
  }

  fetchUsers() {
    this.spinner.show();
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.spinner.hide();
    });
  }

  toggleStatus(user: any) {
    this.spinner.show();
    this.userService.toggleStatus(user.id).subscribe((response) => {
      user.status = response.status;
      this.toastr.success('Success', 'User status updated successfully', { closeButton: true, });
      this.spinner.hide();
    });
  }

}
