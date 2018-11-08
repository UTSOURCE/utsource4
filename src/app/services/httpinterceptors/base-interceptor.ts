import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';

/*设置请求的基地址，方便替换*/
const baseurl = '';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req, next: HttpHandler) {
        console.log(req.hadBaseurl);
        console.log(req.url);
        const newReq = req.clone({url: req.hadBaseurl ? `${req.url}` : `${baseurl}${req.url}`});
        /*此处设置额外的头部，token常用于登陆令牌*/
        if (!req.cancelToken) {
            /*token数据来源自己设置，我常用localStorage存取相关数据*/
            newReq.headers =
                // newReq.headers.set('token', 'my-new-auth-token'),
                newReq.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        // 将带有标头的克隆请求发送到下一个处理程序
        return next.handle(newReq)
            .pipe(
                /*失败时重试2次，可自由设置*/
                retry(2),
                /*捕获响应错误*/
                catchError(this.handleError)
            );
    }
    private handleError(err: HttpErrorResponse) {
        // if (error.error instanceof ErrorEvent) {
        //     // 发生客户端或网络错误。 相应地处理它。
        //     console.error('An error occurred:', error.error.message);
        // } else {
        //     // 后端返回了一个不成功的响应代码。
        //     // 响应机构可能包含出错的线索，
        //     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        // }
        // // return an observable with a user-facing error message返回带有面向用户的错误消息的observable
        // return throwError('Something bad happened; please try again later.');
        if (err instanceof HttpErrorResponse && err.status === 0) {
            console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
            // auth.setToken(null);
            // this.router.navigate(['/', 'login']);
        }
        return throwError(err);
    }
}
