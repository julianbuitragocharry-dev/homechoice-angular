import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { DtoUser } from '../../../interfaces/user/dto-user';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './edit.component.html'
})
export class EditUserComponent {
//#region variables
  userForm: FormGroup;
  userId!: number;
  selectedRoles: string[] = [];
  rolesList: {id: number, rol: string}[] = [];
  //#endregion

  //#region form
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.value;
      if (!password) { return null; }
      const valid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_\.]).{8,}$/.test(password);
      return valid ? null : { passwordInvalid: true };
    };
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private languageService: LanguageService
  ) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{2}\s\d{4}\s\d{3}$/)]],
      address: ['', Validators.required],
      nit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.passwordValidator()],
      roles: [[], [Validators.required, Validators.minLength(1)]]
    });
  }
  //#endregion

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      if (id) {
        this.userId = +id;
        this.loadUser(this.userId);
        this.loadRolesList();
      }
    });
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

      this.userService.updateUser(this.userId, updatedUser).subscribe({
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
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
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
      },
      error: () => {
        this.router.navigate(['/crash']);
      }
    });
  }

  loadRolesList(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.rolesList = data;
      },
      error: (error) => {
        console.error('Error fetching concept list:', error);
      }
    });
  }
  //#endregion
}
