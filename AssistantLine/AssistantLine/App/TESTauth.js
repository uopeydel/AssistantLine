"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var common_1 = require("@angular/common");
require("rxjs/add/operator/share");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
//#
var conf_auth = {
    client_id: '',
    resource_servers: [''],
    auth_server: '',
    localStorageName: ''
};
function get_conf_auth() {
    return conf_auth;
}
;
function set_conf_auth(client_id, resource_servers, auth_server, localStorageName) {
    conf_auth.client_id = client_id;
    conf_auth.resource_servers = resource_servers;
    conf_auth.auth_server = auth_server;
    conf_auth.localStorageName = localStorageName;
}
;
//#
var auth_data = {
    access_token: '',
    refresh_token: '',
    grant_type: ''
};
function get_auth_data() {
    return auth_data;
}
function set_auth_data(access_token, refresh_token, grant_type) {
    auth_data.access_token = access_token;
    auth_data.refresh_token = refresh_token;
    auth_data.grant_type = grant_type;
}
//#
var buicomAuthSrv = (function () {
    function buicomAuthSrv(location, http) {
        this.location = location;
        this.http = http;
    }
    //NEED SET CONFIG FIRST
    buicomAuthSrv.prototype.setconfig = function (client_id, resource_servers, auth_server, localStorageName) {
        set_conf_auth(client_id, resource_servers, auth_server, localStorageName);
    };
    buicomAuthSrv.prototype.weblogin = function (username, password, grant_type) {
        set_auth_data(get_auth_data().access_token, get_auth_data().refresh_token, grant_type);
        var url = get_conf_auth().auth_server;
        var data = "?grant_type=" + grant_type +
            "&username=" + username +
            "&password=" + password +
            "&client_id=" + get_conf_auth().client_id;
        var apiroot = url + data;
        var body = new http_1.URLSearchParams(url);
        body.set("grant_type", grant_type);
        body.set("username", username);
        body.set("password", password);
        body.set("client_id", get_conf_auth().client_id);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(apiroot, body, options).map(function (res) { return res.json(); });
    };
    buicomAuthSrv.prototype.login = function () {
        this.logOut();
        var obj = {
            redirectURI: encodeURIComponent(window.location.origin + this.location.prepareExternalUrl(this.location.path())),
            client_id: get_conf_auth().client_id
        };
        var jsonObject = JSON.stringify(obj);
        window.open('https://comauthapp.com/#/login?params=' + jsonObject, '_self');
    };
    buicomAuthSrv.prototype.logOut = function () {
        window.localStorage.removeItem(get_conf_auth().localStorageName);
        location.reload(true);
    };
    buicomAuthSrv.prototype.getCurrentUser = function () {
        var authData = window.localStorage.getItem(get_conf_auth().localStorageName);
        if (authData) {
            return authData;
        }
        else {
            return null;
        }
    };
    buicomAuthSrv.prototype.getUserProfile = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var apiroot = 'https://comresserver.com/api/profile/get';
        return this.http.get(apiroot, options).map(function (res) { return res.json(); });
    };
    return buicomAuthSrv;
}());
buicomAuthSrv = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common_1.Location,
        http_1.Http])
], buicomAuthSrv);
exports.buicomAuthSrv = buicomAuthSrv;
var authInterceptorService = (function (_super) {
    __extends(authInterceptorService, _super);
    function authInterceptorService(backend, defaultOptions) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.backend = backend;
        _this.defaultOptions = defaultOptions;
        _this.tempLastActivity = {
            url: '',
            options: null,
            body: null
        };
        return _this;
    }
    authInterceptorService.prototype.post = function (url, body, options) {
        var _this = this;
        var authorizationData = JSON.parse(window.localStorage.getItem(get_conf_auth().localStorageName));
        if (authorizationData !== null || authorizationData !== undefined) {
            set_auth_data(authorizationData.access_token, authorizationData.refresh_token, get_auth_data().grant_type);
            var usingBuicomAuthToken = false;
            for (var i = 0; i < get_conf_auth().resource_servers.length; i++) {
                var resourceServers = get_conf_auth().resource_servers[i];
                var requestServer = url.split('/')[2];
                var testurl002 = url;
                if (requestServer === resourceServers) {
                    usingBuicomAuthToken = true;
                }
            }
            if (url.toString().split('/')[2] === "comauthserver.com") {
                if (get_auth_data().grant_type == 'refresh_token') {
                    //<=it's  refresh tokens
                    var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    options = new http_1.RequestOptions({ headers: headers });
                    body = new http_1.URLSearchParams(get_conf_auth().auth_server);
                    body.set('client_id', get_conf_auth().client_id);
                    body.set('grant_type', get_auth_data().grant_type);
                    body.set('refresh_token', get_auth_data().refresh_token);
                    url = get_conf_auth().auth_server +
                        '?refresh_token=' + get_auth_data().refresh_token +
                        "&client_id=" + get_conf_auth().client_id +
                        "&grant_type=" + get_auth_data().grant_type;
                }
                else if (get_auth_data().grant_type == 'password') {
                }
                else {
                    throw 'grant_type wrong';
                }
            }
            else if (usingBuicomAuthToken) {
                var head = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                head.set('Authorization', "Bearer " + get_auth_data().access_token);
                options = new http_1.RequestOptions({ headers: head });
                this.tempLastActivity.body = body;
                this.tempLastActivity.url = url;
                this.tempLastActivity.options = options;
            }
            return _super.prototype.post.call(this, url, body, options).catch(function (error) { return _this.catchAuthError(error); });
        }
        else {
            throw "not authenticated";
        }
    };
    authInterceptorService.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    authInterceptorService.prototype.catchAuthError = function (res) {
        var _this = this;
        var authData = window.localStorage.getItem(get_conf_auth().localStorageName);
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
                        flatMap(function (datas) {
                        window.localStorage.setItem(get_conf_auth().localStorageName, JSON.stringify({
                            access_token: datas.access_token,
                            refresh_token: datas.refresh_token
                        }));
                        set_auth_data(datas.access_token, datas.refresh_token, get_auth_data().grant_type);
                        var head = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                        head.set('Authorization', "Bearer " + get_auth_data().access_token);
                        _this.tempLastActivity.options = new http_1.RequestOptions({ headers: head });
                        return _super.prototype.post.call(_this, _this.tempLastActivity.url, _this.tempLastActivity.body, _this.tempLastActivity.options).catch(function (error) { return _this.catchAuthError(error); }).map(function (res) { return res; });
                    });
                }
            }
            else {
                location.reload(true);
                return Observable_1.Observable.throw(res);
            }
        }
    };
    authInterceptorService.prototype.requestAccessToken = function () {
        set_auth_data(get_auth_data().access_token, get_auth_data().refresh_token, 'refresh_token');
        return this.post(get_conf_auth().auth_server, null, null).map(function (res) { return res.json(); });
    };
    return authInterceptorService;
}(http_1.Http));
authInterceptorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.ConnectionBackend,
        http_1.RequestOptions])
], authInterceptorService);
exports.authInterceptorService = authInterceptorService;
//# sourceMappingURL=TESTauth.js.map