import { Component, OnInit, HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAuthUrl } from '../../app.config';

@Component({
  selector: 'app-layout',
  standalone: false,
  
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  headerTitle: string = '';
  dropdownVisible = false;
  userName: any;
  imageUrl = CurrentAuthUrl + '/storage/';
  userImg: any;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) 
  {

  }

  ngOnInit() {
    this.userName = localStorage.getItem('name');
    this.userImg = localStorage.getItem('profile_img');
    this.updateHeaderTitle();
    this.router.events.subscribe(() => {
      this.updateHeaderTitle();
    });
  }

  private updateHeaderTitle() {
    // Get the current route from the router
    const currentRoute = this.router.url;

    // Update the header title based on the route
    if (currentRoute.includes('dashboard')) {
      this.headerTitle = 'Dashboard Overview';
    } else if (currentRoute.includes('users')) {
      this.headerTitle = 'User Management';
    } else if (currentRoute.includes('groups')) {
      this.headerTitle = 'Group Management';
    }else if (currentRoute.includes('settings')) {
      this.headerTitle = 'Settings';
    } else {
      this.headerTitle = 'Dashboard Overview'; // Set a default title or handle other cases
    }
  }


  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent event from bubbling up
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Close the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as Element;  // Type assertion to `Element`

    // Check if the target is not inside the profile_item
    if (target && !target.closest('.profile_item')) {
      this.dropdownVisible = false;
    }
  }
  // Navigate to settings
  goToSettings() {
    this.router.navigate(['/admin/settings']);
    this.dropdownVisible = false;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('profile_img');
    this.router.navigate(['/login']);
    this.dropdownVisible = false;
  }

}
