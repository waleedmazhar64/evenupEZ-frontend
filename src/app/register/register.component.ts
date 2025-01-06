import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  onSubmit() {
    this.spinner.show();
    this.authService.register(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name);
        this.router.navigate(['/admin/dashboard']);
        this.toastr.success('Success', 'User registered successfully', { closeButton: true, });
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('Error', 'Registration failed. Please try again.', { closeButton: true, });
        this.spinner.hide();
      }
    );
  }
}
