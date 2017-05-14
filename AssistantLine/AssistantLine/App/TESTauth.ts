import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ConnectionBackend, RequestOptionsArgs, Request, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

//#
const conf_auth = {
    client_id: '',
    resource_servers: [''],
    auth_server: '',
    localStorageName: ''
};

function get_conf_auth() {
    return conf_auth;
};

function set_conf_auth(client_id: string, resource_servers: string[], auth_server: string, localStorageName: string): void {
    conf_auth.client_id = client_id;
    conf_auth.resource_servers = resource_servers;
    conf_auth.auth_server = auth_server;
    conf_auth.localStorageName = localStorageName;
};

//#
const auth_data = {
    access_token: '',
    refresh_token: '',
    grant_type: ''
};

function get_auth_data() {
    return auth_data;
}

function set_auth_data(access_token: string, refresh_token: string, grant_type: string): void {
    auth_data.access_token = access_token;
    auth_data.refresh_token = refresh_token;
    auth_data.grant_type = grant_type;
}

//#
@Injectable()
export class buicomAuthSrv {
    constructor(
        private location: Location,
        private http: Http
    ) {

    }
    //NEED SET CONFIG FIRST
    setconfig(client_id: string, resource_servers: string[], auth_server: string, localStorageName: string): void {
        set_conf_auth(client_id, resource_servers, auth_server, localStorageName);
    }

    weblogin(username: string, password: string, grant_type: string) {
        set_auth_data(get_auth_data().access_token, get_auth_data().refresh_token, grant_type);
        let url = get_conf_auth().auth_server;
        let data = "?grant_type=" + grant_type +
            "&username=" + username +
            "&password=" + password +
            "&client_id=" + get_conf_auth().client_id;
        let apiroot = url + data;
        let body = new URLSearchParams(url);
        body.set("grant_type", grant_type);
        body.set("username", username);
        body.set("password", password);
        body.set("client_id", get_conf_auth().client_id);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(apiroot, body, options).map(res => res.json());
    }

    login() {
        this.logOut();
        var obj = {
            redirectURI: encodeURIComponent(window.location.origin + this.location.prepareExternalUrl(this.location.path())),
            client_id: get_conf_auth().client_id
        };
        var jsonObject = JSON.stringify(obj);
        window.open('https://comauthapp.com/#/login?params=' + jsonObject, '_self');
    }

    logOut() {
        window.localStorage.removeItem(get_conf_auth().localStorageName);
        location.reload(true);
    }

    getCurrentUser() {
        var authData = window.localStorage.getItem(get_conf_auth().localStorageName);
        if (authData) {
            return authData;
        } else {
            return null;
        }
    }

    getUserProfile() {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let apiroot = 'https://comresserver.com/api/profile/get';
        return this.http.get(apiroot, options).map(res => res.json());
    }
}

@Injectable()
export class authInterceptorService extends Http {
    constructor(
        private backend: ConnectionBackend,
        private defaultOptions: RequestOptions
    ) {
        super(backend, defaultOptions);
    }
    private tempLastActivity = {
        url: '',
        options: null as any,
        body: null as any
    }

    post(url: string, body: string | URLSearchParams, options?: RequestOptionsArgs): Observable<Response> {
        let authorizationData: any = JSON.parse(window.localStorage.getItem(get_conf_auth().localStorageName));
        if (authorizationData !== null || authorizationData !== undefined) {
            set_auth_data(authorizationData.access_token, authorizationData.refresh_token, get_auth_data().grant_type);
            let usingBuicomAuthToken = false;
            for (var i = 0; i < get_conf_auth().resource_servers.length; i++) {
                let resourceServers = get_conf_auth().resource_servers[i];
                let requestServer = url.split('/')[2];
                let testurl002 = url;
                if (requestServer === resourceServers) {
                    usingBuicomAuthToken = true;
                }
            }
            if (url.toString().split('/')[2] === "comauthserver.com") {
                if (get_auth_data().grant_type == 'refresh_token') {
                    //<=it's  refresh tokens
                    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    options = new RequestOptions({ headers: headers });
                    body = new URLSearchParams(get_conf_auth().auth_server);
                    body.set('client_id', get_conf_auth().client_id);
                    body.set('grant_type', get_auth_data().grant_type);
                    body.set('refresh_token', get_auth_data().refresh_token);
                    url = get_conf_auth().auth_server +
                        '?refresh_token=' + get_auth_data().refresh_token +
                        "&client_id=" + get_conf_auth().client_id +
                        "&grant_type=" + get_auth_data().grant_type;
                }
                else if (get_auth_data().grant_type == 'password') {
                    //<=it's  login

                } else {
                    throw 'grant_type wrong';
                }
            } else if (usingBuicomAuthToken) {
                let head = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                head.set('Authorization', `Bearer ${get_auth_data().access_token}`);
                options = new RequestOptions({ headers: head });

                this.tempLastActivity.body = body;
                this.tempLastActivity.url = url;
                this.tempLastActivity.options = options;
            }
            return super.post(url, body, options).catch((error) => this.catchAuthError(error));
        }
        else {
            throw "not authenticated";
        }
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    private catchAuthError(res: Response): Observable<Response> {
        let authData: any = window.localStorage.getItem(get_conf_auth().localStorageName);
        if (res.status === 401 || res.status === 403) {
            if (authData !== null) {
                var usingBuicomAuthToken = false;
                for (var i = 0; i < get_conf_auth().resource_servers.length; i++) {
                    if (res.url.split('/')[2] === get_conf_auth().resource_servers[i]) {
                        usingBuicomAuthToken = true;
                    }
                }
                if (usingBuicomAuthToken) {
                    return this.requestAccessToken().
                        flatMap((datas) => {
                            window.localStorage.setItem(get_conf_auth().localStorageName, JSON.stringify({
                                access_token: datas.access_token,
                                refresh_token: datas.refresh_token
                            }));
                            set_auth_data(datas.access_token, datas.refresh_token, get_auth_data().grant_type);
                            let head = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                            head.set('Authorization', `Bearer ${get_auth_data().access_token}`);
                            this.tempLastActivity.options = new RequestOptions({ headers: head });
                            return super.post(
                                this.tempLastActivity.url,
                                this.tempLastActivity.body,
                                this.tempLastActivity.options
                            ).catch((error) => this.catchAuthError(error)).map(res => res);
                        })
                }
            }
            else {
                location.reload(true);
                return Observable.throw(res);
            }
        }
    }

    private requestAccessToken() {
        set_auth_data(get_auth_data().access_token, get_auth_data().refresh_token, 'refresh_token');
        return this.post(get_conf_auth().auth_server, null, null).map(res => res.json());
    }
}