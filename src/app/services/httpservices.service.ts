import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {ToastController, LoadingController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {
    userEmail: any;
    UserInfo: any;
    topData: any;
    msglistCache: any;
    getmsg: any;
    chartSpeakerCache = new Object();
    eventBadge;
    cartBadge: any = '';
    rtn: any;
    private dest = [];
    shuzhu = [];
    private dest1 = [];
    shuzhu1 = [];
    gongxiang_cart: any;
    gongxiang_xjcart: any;
    shuaxindizhi = false; // 改地址是否刷新数据
    shuaxindizhilist = false; // 改地址刷新地址列表数据
    shouhuolist = [];
    allCategory; // 全局总分类
  constructor(
      public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
  ) { }
    // 公共信息存储
    xinxi(sid, lan, tk, cod, cty) {
        if (sid !== undefined && sid !== 'undefined') {
            localStorage.setItem('_sid', sid);
        }
        if (lan !== undefined && lan !== 'undefined') {
            switch (lan) {
                case 'zh-CN':
                    localStorage.setItem('_lan', 'zh');
                    break;
                case 'in':
                    localStorage.setItem('_lan', 'en');
                    break;
                default:
                    localStorage.setItem('_lan', lan);
            }
        }
        if (tk !== undefined && tk !== 'undefined') {
            localStorage.setItem('_tk', tk);
        }
        if (cod !== undefined && cod !== 'undefined') {
            localStorage.setItem('_cod', cod);
        }
        if (cty !== undefined && cty !== 'undefined') {
            localStorage.setItem('_cty', cty);
        }
    }
    getcanshu() {
        const publiccanshu = {
            sid: localStorage.getItem('_sid'),
            lan: localStorage.getItem('_lan'),
            tk: localStorage.getItem('_tk'),
            stp: 1,
            Version: localStorage.getItem('Version'),
            platform: localStorage.getItem('platform'),
            cty: localStorage.getItem('_cty'),
            cod: localStorage.getItem('_cod')
        };
        return publiccanshu;
    }
    // 登录
    login(email, pwd) {
        return new Promise((resolve, reject) => {
            const body = {
                cmd: 'user/login',
                data: '{"UserName":"' + email + '","Password":"' + pwd + '"}',
                lan: localStorage.getItem('_lan'),
                stp: 1,
                Version: localStorage.getItem('Version'),
                platform: localStorage.getItem('platform'),
                cty: localStorage.getItem('_cty'),
                cod: localStorage.getItem('_cod')
            };
            this.http.post('', body).subscribe((res: any) => {
                this.topData = res.data;
                this.rtn = 'Succeed';
                console.log(res, '登录');
                let idxinzi: any;
                idxinzi = res;
                this.xinxi(idxinzi.sid, idxinzi.lan, idxinzi.tk, idxinzi.cod, idxinzi.cty);
                resolve(this.topData);
            }, err => {
                reject(err);
            });
        });
    }
    // 分类
    AllCategorys() {
        return new Promise((resolve, reject) => {
            const body = {
                cmd: 'product/allcategorys',
                data: '{"ViewBy":"APP"}'
            };
            this.http.post('', Object.assign(body, this.getcanshu())).subscribe((res: any) => {
                if (res.rtn === 'Succeed') {
                    this.allCategory = res.data;
                }
                let idxinzi: any;
                idxinzi = res;
                this.xinxi(idxinzi.sid, idxinzi.lan, idxinzi.tk, idxinzi.cod, idxinzi.cty);
                resolve(this.allCategory);
            }, err => {
                reject(err);
            });
        });
    }
}
