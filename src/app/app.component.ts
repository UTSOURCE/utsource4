import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nSwitcherService } from './services/i18n-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
    private i18nSubscription: Subscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private i18nSwitcherProvider: I18nSwitcherService
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
      this.initTranslate();
  }
    initTranslate() {
        this.translate.setDefaultLang('en');
        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en');
        }
        this.i18nSubscription = this.i18nSwitcherProvider.watch().subscribe((lang: string) => {
            this.translate.use(lang); // 语言改变的时候调用
        });
    }
    ngDestory() {
        if (this.i18nSubscription != null) {
            this.i18nSubscription.unsubscribe();
        }
    }
}
