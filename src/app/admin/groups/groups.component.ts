import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups',
  standalone: false,
  
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {

  groups: any[] = [];

  constructor(
    private groupService: GroupService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    ) 
  {

  }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.spinner.show();
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data;
      this.spinner.hide();
    });
  }

  toggleStatus(group: any) {
    this.spinner.show();
    this.groupService.toggleGroupStatus(group.id).subscribe((response) => {
      group.status = response.status; // Update the local group status
      this.toastr.success('Success', 'Group status updated successfully', { closeButton: true, });
      this.spinner.hide();
    });
  }


}
