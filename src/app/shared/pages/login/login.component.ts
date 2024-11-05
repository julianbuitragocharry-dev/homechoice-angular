import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../../auth/jwt';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private loginService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.loginError = null;
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        complete: () => {
          console.info("Login completado!!");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        },
        error: () => {
          this.loginError = 'Clave inválida. Por favor, verifique sus credenciales.';
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
