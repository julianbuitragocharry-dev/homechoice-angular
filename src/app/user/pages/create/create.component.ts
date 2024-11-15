import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { DtoUser } from '../../../interfaces/user/dto-user';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html'
})
export class CreateUserComponent {
  //#region variables
  userForm: FormGroup;
  selectedRoles: string[] = [];
  rolesList: {id: number, rol: string}[] = [];
  //#endregion

  //#region form
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{2}\s\d{4}\s\d{3}$/)]],
      address: ['', Validators.required],
      nit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_\.]).{8,}$/)]],
      roles: [[], [Validators.required, Validators.minLength(1)]]
    });
  }
  //#endregion

  ngOnInit(): void {
    this.loadRolesList();
  }

  //#region methods
  onRoleChange(event: any, rol: string): void {
    if (event.target.checked) {
        this.selectedRoles.push(rol);
    } else {
        if (this.selectedRoles.length > 1) {
            this.selectedRoles = this.selectedRoles.filter(r => r !== rol);
        } else {
            event.target.checked = true;
            return;
        }
    }
    this.userForm.patchValue({
        roles: this.selectedRoles
    });
  }

  isRoleSelected(rol: string): boolean {
    return this.selectedRoles.includes(rol);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: DtoUser = {
        id: 1, // id unused
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        phone: this.userForm.value.phone,
        address: this.userForm.value.address,
        nit: this.userForm.value.nit,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        roles: this.selectedRoles
      };

      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.router.navigate(['/crash']);
        }
      });
    }
  }
  //#endregion

  //#region api calls
  loadRolesList(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.rolesList = data;
      },
      error: (error) => {
        console.error('Error fetching roles list:', error);
      }
    });
  }
  //#endregion
}
