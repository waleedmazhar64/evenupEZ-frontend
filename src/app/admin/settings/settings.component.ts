import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CurrentAuthUrl } from '../../app.config';

@Component({
  selector: 'app-settings',
  standalone: false,
  
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  users: any[] = [];
  profileImage: string | null = null;
  imageUrl = CurrentAuthUrl + '/storage/';
  user:any = { name: '', user_name: '', email: '', phone: '', profile_img: null };
  passwordData = { current_password: '', new_password: '', new_password_confirmation: '' };
  newUser = { name: '', user_name: '', email: '', password: '' };
  notificationSettings = {
    email_notification: true,
    sms_notification: false,
    push_notification: true,
    notification_frequency: 'weekly',
  };

  passwordVisibility = {
    current: false,
    new: false,
    confirm: false,
  };
  validationErrors: any = {};

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
    this.loadProfile();
    this.loadNotificationSettings();
    this.fetchAdminUsers();
  }

  loadProfile() {
    this.spinner.show();
    this.userService.getProfile().subscribe((data) => {
      this.user = data;
      this.spinner.hide();
    });
  }

  fetchAdminUsers() {
    this.spinner.show();
    this.userService.getAdminUsers().subscribe((data) => {
      this.users = data;
      this.spinner.hide();
    });
  }

  loadNotificationSettings(): void {
    this.userService.getNotificationSettings().subscribe({
      next: (settings) => {
        // Map 'Yes' and 'No' to boolean values
        this.notificationSettings = {
          email_notification: settings.email_notification === 'Yes',
          sms_notification: settings.sms_notification === 'Yes',
          push_notification: settings.push_notification === 'Yes',
          notification_frequency: settings.notification_frequency || 'weekly',
        };
      },
      error: (err) => {
        console.error('Failed to load notification settings', err);
      },
    });
  }

  updateProfile() {
    this.spinner.show();
    const formData = new FormData();

    // Append scalar values
    formData.append('name', this.user.name);
    formData.append('user_name', this.user.user_name);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone || ''); // Handle null/undefined values

    // Append file (check if profile_img is a file)
    if (this.user.profile_img instanceof File) {
      formData.append('profile_img', this.user.profile_img);
    } else {
      console.warn('Profile image is not a valid file object');
    }
    
    this.userService.updateProfile(formData).subscribe((response) => {
      localStorage.setItem('profile_img', response.user.profile_img);
      this.toastr.success('Success', 'Profile updated successfully', { closeButton: true, });
      this.spinner.hide();
    });
    
  }

    changePassword() {
      this.userService.changePassword(this.passwordData).subscribe({
        next: (response) => {
          this.toastr.success('Password updated successfully', 'Success');
          this.passwordData = { current_password: '', new_password: '', new_password_confirmation: '' }; // Reset form
          this.validationErrors = {}; // Clear validation errors
        },
        error: (error) => {
          if (error.status === 422) {
            this.toastr.error('Validation failed', 'Error');
            this.validationErrors = error.error.errors || {}; // Assign validation errors from Laravel
          }
          else if (error.status === 400) {
            this.toastr.error('Current Password does not matched', 'Error');
            this.validationErrors = error.error.errors || {}; // Assign validation errors from Laravel
          } else {
            this.toastr.error('An unexpected error occurred', 'Error');
          }
        },
      });
    }

  // Toggle Password Visibility
  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }

  addUser(form: any) {
    if (form.invalid) {
      return;
    }

    this.userService.addUser(this.newUser).subscribe({
      next: (response) => {
        this.toastr.success('New user added successfully!', 'Success');
        this.newUser = { name: '', user_name: '', email: '', password: '' }; // Reset form
        const modal = document.getElementById('updateModal') as any;
        if (modal) {
          modal.classList.remove('show'); // Close modal
          document.body.classList.remove('modal-open');
          document.querySelector('.modal-backdrop')?.remove();
        }
        this.fetchAdminUsers();
      },
      error: (error) => {
        this.toastr.error('Failed to add new user', 'Error');
        console.error(error);
      },
    });
  }

  updateNotificationSettings(): void {

    const payload = {
      email_notification: this.notificationSettings.email_notification ? 'Yes' : 'No',
      sms_notification: this.notificationSettings.sms_notification ? 'Yes' : 'No',
      push_notification: this.notificationSettings.push_notification ? 'Yes' : 'No',
      notification_frequency: this.notificationSettings.notification_frequency || 'weekly',
    };

    this.userService.updateNotifications(payload).subscribe({
      next: () => {
        this.toastr.success('Notification settings updated successfully!', 'Success');
      },
      error: (err) => {
        this.toastr.error('Failed to update notification settings', 'Error');
        console.error(err);
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.user.profile_img = file; // Assign the file to `profile_img`

      // Create a preview using FileReader
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // Set base64 preview
      };
      reader.readAsDataURL(file); // Convert file to base64 string

      console.log('Selected File:', file); // Debugging
    }
  }

  getProfileImage(): string {
    if (this.user.profile_img instanceof File && this.profileImage) {
      return this.profileImage; // Show base64 preview if a new file is selected
    } else if (this.user.profile_img) {
      return this.imageUrl + this.user.profile_img; // Show server-provided image
    } else {
      return 'assets/images/avatar.png'; // Default image
    }
  }


}
