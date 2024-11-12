import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../../../service/agent.service';
import { DtoAgent } from '../../../interfaces/agent/dto-agent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html'
})
export class CreateAgentComponent {
  agentForm: FormGroup;

  constructor(
    private router: Router,
    private agentService: AgentService,
    private formBuilder: FormBuilder
  ) {
    this.agentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const newAgent: DtoAgent = {
        id: 1, // El id no se usa en la creación
        firstName: this.agentForm.value.firstName,
        lastName: this.agentForm.value.lastName,
        phone: this.agentForm.value.phone,
        address: this.agentForm.value.address,
        nit: this.agentForm.value.nit,
        email: this.agentForm.value.email,
        password: this.agentForm.value.password
      };

      this.agentService.createAgent(newAgent).subscribe(
        (response) => {
          console.log('Agente creado exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al crear el agente', error);
        }
      );
    }
  }
}
