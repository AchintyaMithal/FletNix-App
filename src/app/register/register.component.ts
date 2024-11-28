// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';  // Import ApiService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private apiService: ApiService,  // Inject ApiService
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.registerForm.invalid) {
      this.toastr.error('Please provide valid details.');
      return;
    }

    const formData = this.registerForm.value;

    this.apiService.register(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.toastr.success('Account created successfully!');
          setTimeout(() => this.router.navigate(['/']));
        } else {
          this.toastr.error(response.message);
        }
      },
      () => {
        this.toastr.error('An error occurred. Please try again later.');
      }
    );
  } 
}
