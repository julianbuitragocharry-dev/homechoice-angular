import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('es');
  currentLanguage = this.currentLanguageSubject.asObservable();

  private readonly LOCAL_STORAGE_LANGUAGE = 'language';

  constructor(private translateService: TranslateService) {
    const savedLang = localStorage.getItem(this.LOCAL_STORAGE_LANGUAGE) || 'es';
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLang);
    this.translateService.use(savedLang);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLanguageSubject.next(lang);
    localStorage.setItem(this.LOCAL_STORAGE_LANGUAGE, lang); 
  }

  getCurrentLanguage() {
    return this.currentLanguageSubject.value;
  }
}
