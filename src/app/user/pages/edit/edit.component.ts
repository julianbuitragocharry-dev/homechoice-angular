import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { DtoUser } from '../../../interfaces/user/dto-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html'
})
export class EditUserComponent {
//#region variables
  userForm: FormGroup;
  userId!: number;
  selectedRoles: string[] = [];
  
  rolesList: string[] = [
    'ADMIN',
    'AGENT'
  ];
  //#endregion

  //#region constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      roles: [[], Validators.required]
    });
  }
  //#endregion

  //#region lifecycle hooks
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      if (id) {
        this.userId = +id;
        this.loadUser(this.userId);
      }
    });
  }
  //#endregion

  //#region methods
  onRoleChange(event: any, role: string): void {
    if (event.target.checked) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    }
    this.userForm.patchValue({
      roles: this.selectedRoles
    });
  }

  isRoleSelected(role: string): boolean {
    return this.selectedRoles.includes(role);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: DtoUser = {
        id: this.userId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        phone: this.userForm.value.phone,
        address: this.userForm.value.address,
        nit: this.userForm.value.nit,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        roles: this.selectedRoles
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    }
  }
  //#endregion

  //#region api calls
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.userForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          nit: data.nit,
          email: data.email,
          roles: data.roles
        });
        this.selectedRoles = data.roles;
      }
    );
  }
  //#endregion
}
