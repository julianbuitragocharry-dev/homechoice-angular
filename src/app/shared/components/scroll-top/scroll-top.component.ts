import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ArrowUp, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button 
      *ngIf="showButton"
      (click)="scrollToTop()"
      class="fixed bottom-4 right-4 bg-blue-200 hover:bg-blue-300 text-white p-4 rounded-full">
      <i-lucide [img]="ArrowUp" class="my-icon" [strokeWidth]="2.5"></i-lucide>
    </button>
  `
})
export class ScrollTopComponent {
  readonly ArrowUp = ArrowUp;
  showButton = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showButton = window.scrollY > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
