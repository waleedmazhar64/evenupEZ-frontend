import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    ) 
  {

  }

  onSubmit() {
    this.spinner.show();
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name);
        localStorage.setItem('profile_img', response.profile_img);
        this.toastr.success('Success', 'User logged in successfully', { closeButton: true, });

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.router.navigate([returnUrl]);
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('Error', 'Login failed. Please check your credentials.', { closeButton: true, });
        this.spinner.hide();
      }
    );
  }
}
