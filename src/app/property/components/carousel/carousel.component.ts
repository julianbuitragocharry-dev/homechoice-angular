import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() imageUrls: string[] = [];
  @Input() autoPlay: boolean = true;
  @Input() slideInterval: number = 5000;
  
  currentSlide = 0;
  private autoSlideInterval: any;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.imageUrls.length;
    this.resetAutoSlide();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.imageUrls.length) % this.imageUrls.length;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  @HostListener('touchend')
  onTouchEnd() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) >= minSwipeDistance) {
      if (swipeDistance > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private resetAutoSlide() {
    if (this.autoPlay) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }
}