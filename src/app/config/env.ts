export class AppConfig {
    public static postUrl() {
        // return "http://test-m.utsource.net.cn/api/req";
        return 'https://m.utsource.net/api/req';
        // return "/api/req";//ceshi
        //   return "http://220.231.155.34:98/api/req";
        // return "/cheshi";

    }
    // 支付使用
    public static zhifuUrl() {
        switch (this.postUrl()) {
            case 'http://test-m.utsource.net.cn/api/req':
                return 'http://test-m.utsource.net.cn';
            case 'http://220.231.155.34:98/api/req':
                return  'http://220.231.155.34:98';
            default:
                return 'https://m.utsource.net';
        }
    }
}
