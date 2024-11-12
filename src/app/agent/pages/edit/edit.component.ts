import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../../../service/agent.service';
import { DtoAgent } from '../../../interfaces/agent/dto-agent';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html'
})
export class EditAgentComponent {
  //#region variables
  agentForm: FormGroup;
  agentId!: number;
  //#endregion

  //#region form
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.agentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
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

      this.agentService.updateAgent(this.agentId, updatedAgent).subscribe(
        (response) => {
          console.log('Agente actualizado exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al actualizar el agente', error);
        }
      );
    }
  }
  //#endregion

  //#region api calls
  loadAgent(id: number): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.agentForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          nit: data.nit,
          email: data.email
        });
      }
    );
  }
  //#endregion
}
