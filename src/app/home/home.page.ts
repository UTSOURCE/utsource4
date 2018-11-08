import { Component } from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { I18nSwitcherService } from '../services/i18n-switcher.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    lang: string;
    constructor(
        public translate: TranslateService,
        public i18nSwitcher: I18nSwitcherService
    ) {
        this.lang = 'en';
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            console.log(event);
        });
    }
    switchLanguage(lang) {
        this.lang = lang;
        this.i18nSwitcher.switchLang(lang);
        console.log(`translate: `, this.translate.currentLang);
    }

}
