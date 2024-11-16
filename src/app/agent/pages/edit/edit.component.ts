import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../../../service/agent.service';
import { DtoAgent } from '../../../interfaces/agent/dto-agent';
import { UserService } from '../../../service/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './edit.component.html'
})
export class EditAgentComponent {
  //#region variables
  agentForm: FormGroup;
  agentId!: number;
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
    private agentService: AgentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);

    this.agentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{2}\s\d{4}\s\d{3}$/)]],
      address: ['', Validators.required],
      nit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.passwordValidator()]
    });
  }
  //#endregion

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      if (id) {
        this.agentId = +id;
        this.loadAgent(this.agentId);
      }
    });
  }

  //#region methods
  onSubmit(): void {
    if (this.agentForm.valid) {
      const updatedAgent: DtoAgent = {
        id: this.agentId,
        firstName: this.agentForm.value.firstName,
        lastName: this.agentForm.value.lastName,
        phone: this.agentForm.value.phone,
        address: this.agentForm.value.address,
        nit: this.agentForm.value.nit,
        email: this.agentForm.value.email,
        password: this.agentForm.value.password
      };

      this.agentService.updateAgent(this.agentId, updatedAgent).subscribe({
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
  loadAgent(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.agentForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          nit: data.nit,
          email: data.email
        });
      },
      error: () => {
        this.router.navigate(['/crash']);
      }
    });
  }
  //#endregion
}
