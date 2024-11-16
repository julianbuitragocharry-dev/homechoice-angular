import { Component, OnInit } from '@angular/core';
import { DtoUserResponse } from '../../../interfaces/user/dto-user-response';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from '../../../shared/components/scroll-top/scroll-top.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    NgxPaginationModule, 
    ReactiveFormsModule,
    ScrollTopComponent,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrl: '../../../shared/styles/pagination.css'
})
export class ListUsersComponent implements OnInit {
  //#region variables
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  users: DtoUserResponse[] = [];
  
  pageValue: number = 1;
  sizeValue: number = 20;
  totalData: number = 0;

  filters = {
    nit: ''
  };
  filterForm: FormGroup;
  
  showDeleteModal: boolean = false;
  userToDelete: number | null = null;
  //#endregion

  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private router: Router,
    private translateService: TranslateService
  ) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);

    this.filterForm = this.fb.group({
      nit: ['']
    });    
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  
  //#region methods
  onSubmit(): void {
    this.filters = {
      nit: this.filterForm.get('nit')?.value || ''
    };
    this.loadUsers();
  }

  onPageChange(page: number): void {
    this.pageValue = page;
    this.loadUsers();
  }

  onEdit(user: DtoUserResponse): void {
    this.router.navigate([`/dashboard/edit-user/${user.id}`]);
  }

  confirmDelete(user: DtoUserResponse): void {
    this.userToDelete = user.id;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }
  
  deleteUser(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.userToDelete);
          this.closeModal();
          this.loadUsers();
        },
        error: () => {
          this.closeModal();
        }
      });
    }
  }
  //#endregion

  //#region api calls
  loadUsers(): void {
    this.userService.getAllUsers(
      this.filters.nit,
      this.pageValue - 1,
      this.sizeValue
    ).subscribe({
      next: (data) => {
        this.users = data.content;
        this.pageValue = data.pageable.pageNumber + 1;
        this.totalData = data.totalElements;
      },
      error: () => {
        this.router.navigate(['/crash']);
      }
    });
  }
  //#endregion
}
