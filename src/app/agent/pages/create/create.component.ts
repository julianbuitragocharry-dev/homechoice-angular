import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../../../service/agent.service';
import { DtoAgent } from '../../../interfaces/agent/dto-agent';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './create.component.html'
})
export class CreateAgentComponent {
  agentForm: FormGroup;

  constructor(
    private router: Router,
    private agentService: AgentService,
    private formBuilder: FormBuilder,
    private languageService: LanguageService
  ) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);

    this.agentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{2}\s\d{4}\s\d{3}$/)]],
      address: ['', Validators.required],
      nit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_\.]).{8,}$/)]]
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const newAgent: DtoAgent = {
        id: 1, // id unused
        firstName: this.agentForm.value.firstName,
        lastName: this.agentForm.value.lastName,
        phone: this.agentForm.value.phone,
        address: this.agentForm.value.address,
        nit: this.agentForm.value.nit,
        email: this.agentForm.value.email,
        password: this.agentForm.value.password
      };

      this.agentService.createAgent(newAgent).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.router.navigate(['/crash']);
        }
      });
    }
  }
}
