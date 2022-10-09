import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
  ];
  isCollapsed = true;

  constructor(private translate: TranslateService) { }

  useLanguage(lang: string): void {
    this.translate.use(lang);
    sessionStorage.setItem('locale', lang);
  }

  get currentLang() {
    return sessionStorage.getItem('locale') || 'en' ;
  }

  ngOnInit(): void {
  }

}
