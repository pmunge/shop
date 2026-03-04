import { Component,   ElementRef, ViewChild, AfterViewInit,  OnDestroy , Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule , NgOptimizedImage],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  
})
export class CategoryComponent implements AfterViewInit, OnDestroy{
  categories = [
    {
      name: 'Herbs',
      image: 'assets/images/herbs.jpg'
    },
    {
      name: 'Suppliments',
      image: 'assets/images/supplements.jpg'
    },
    {
      name: 'Essential Oils',
      image: 'assets/images/essential.jpg'
    },
    {
      name: 'Beauty & Skin Care',
      image: 'assets/images/beauty.jpg'
    },
    {
      name: 'Hair Care',
      image: 'assets/images/hair.jpg'
    }
  ];
  isBrowser = false;
  infiniteCategories: any[] = [];
  currentIndex = 0;
  cardWidth = 240;
  intervalId!: any

  @ViewChild('track') track! : ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  ngAfterViewInit(){
     if (this.isBrowser) {
     this.infiniteCategories = [...this.categories, ...this.categories];

     this.startAutoSlide();
  }
  }
  startAutoSlide(){
    this.intervalId= setInterval(() =>{
      this.nextSlide();
    }, 5000);
  }

  nextSlide(){
    this.currentIndex++;
    this.updateTransform();

    if (this.currentIndex >= this.categories.length) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.track.nativeElement.style.transition = 'none';
        this.updateTransform();
        // restore smooth transition
        requestAnimationFrame(() => {
          this.track.nativeElement.style.transition = 'transform 0.5s ease-in-out';
        });
      }, 500);
    }
  }
  prevSlide(){
    this.currentIndex--;
    this.updateTransform();

    if (this.currentIndex < 0) {
      this.currentIndex = this.categories.length - 1;
      this.track.nativeElement.style.transition = 'none';
      this.updateTransform();
      requestAnimationFrame(() => {
        this.track.nativeElement.style.transition = 'transform 0.5s ease-in-out';
      });
    }
       
  }
  updateTransform() {
    this.track.nativeElement.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
  }

  ngOnDestroy(){
    clearInterval(this.intervalId)
  }

}
