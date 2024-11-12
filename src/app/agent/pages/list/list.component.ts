import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from '../../../shared/components/scroll-top/scroll-top.component';
import { AgentService } from '../../../service/agent.service';
import { DTOAgentResponse } from '../../../interfaces/agent/dto-agent-response';
import { DtoUserResponse } from '../../../interfaces/user/dto-user-response';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    NgxPaginationModule, 
    ReactiveFormsModule, 
    RouterLink, 
    ScrollTopComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: '../../../shared/styles/pagination.css'
})
export class ListAgentsComponent implements OnInit {
  //#region variables
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  agents: DtoUserResponse[] = [];
  
  pageValue: number = 1;
  sizeValue: number = 12;
  totalData: number = 0;

  filters = {
    nit: ''
  };
  filterForm: FormGroup;
  
  showDeleteModal: boolean = false;
  agentToDelete: number | null = null;
  //#endregion

  constructor(
    private agentService: AgentService, 
    private fb: FormBuilder, 
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      nit: ['']
    });    
  }

  ngOnInit(): void {
    this.loadAgents();
  }
  
  //#region methods
  onSubmit(): void {
    this.filters = {
      nit: this.filterForm.get('nit')?.value || ''
    };
    this.loadAgents();
  }

  onPageChange(page: number): void {
    this.pageValue = page;
    this.loadAgents();
  }

  onEdit(agent: DtoUserResponse): void {
    this.router.navigate([`/dashboard/edit-agent/${agent.id}`]);
  }

  confirmDelete(agent: DtoUserResponse): void {
    this.agentToDelete = agent.id;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showDeleteModal = false;
    this.agentToDelete = null;
  }
  
  deleteAgent(): void {
    if (this.agentToDelete) {
      this.agentService.deleteAgent(this.agentToDelete).subscribe({
        next: () => {
          this.agents = this.agents.filter(a => a.id !== this.agentToDelete);
          this.closeModal();
          this.loadAgents();
        },
        error: (error) => {
          console.error('Error deleting agent:', error);
          this.closeModal();
        }
      });
    }
  }
  //#endregion

  //#region api calls
  loadAgents(): void {
    this.agentService.getAllAgents(
      this.filters.nit,
      this.pageValue - 1,
      this.sizeValue
    ).subscribe(
      (data) => {
        console.log(data);
        this.agents = data.content;
        this.pageValue = data.pageable.pageNumber + 1;
        this.totalData = data.length;
      },
      (error) => {
        console.error('Error fetching agents:', error);
      }
    );
  }
  //#endregion
}
