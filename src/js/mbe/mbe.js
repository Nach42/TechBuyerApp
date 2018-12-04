define(['appController', 'jquery','mcs/mcs'], function (app, $, mcs) {
    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        self.init = function(){
            var mcs_config = {
                "logLevel": mcs.LOG_LEVEL.INFO,
                "logHTTP": true,
                "oAuthTokenEndPoint": "https://idcs-188833f670f149a3ac2892ac9359b66e.identity.oraclecloud.com/oauth2/v1/token",
                "mobileBackend": {
                    "name": "FORTE_ND",
                    "baseUrl": "https://BD37CD2DDD894061970D1F97DD100965.mobile.ocp.oraclecloud.com:443",
                    "authentication": {
                        "type": mcs.AUTHENTICATION_TYPES.basic,
                        "basic": {
                            "mobileBackendId": "d703d9b2-47f1-49de-a781-15ff61439241",
                            "anonymousKey": "QkQzN0NEMkRERDg5NDA2MTk3MEQxRjk3REQxMDA5NjVfTW9iaWxlQW5vbnltb3VzX0FQUElEOmNmMzdlZWMzLTJhZmMtNDUxYi04YmRkLWUyOWQ2ZmM4ZDBjOQ=="
                        },
                        "oauth": {
                            "clientId": "2fc80bee2f834e2897b5f42d7844fe04",
                            "clientSecret": "c9d4ab1d-04c1-460c-afad-04f6ceb15694"
                        },
                        "token":{
                            "mobileBackendId": "d703d9b2-47f1-49de-a781-15ff61439241",
                            "anonymousKey": "QkQzN0NEMkRERDg5NDA2MTk3MEQxRjk3REQxMDA5NjVfTW9iaWxlQW5vbnltb3VzX0FQUElEOmNmMzdlZWMzLTJhZmMtNDUxYi04YmRkLWUyOWQ2ZmM4ZDBjOQ=="
                        }
                    }
                }
            };
            mcs.init(mcs_config);
        }

        self.authenticate = function (callback, errorCallback) {
            mcs.mobileBackend.authorization.authenticateAnonymous().then(callback).catch(errorCallback);
            //mcs.mobileBackend.authorization.authenticate(username, password).then(callback).catch(errorCallback);
        };

        //this handles success and failure callbacks using parameters
        // self.logout = function (callback, errorCallback) {
        //     mcs.mobileBackend.Authorization.logout().then(callback).catch(errorCallback);
        // };

        self.sql = function(data, callback, errorCallback){
            mcs.mobileBackend.authorization.authenticateAnonymous().then(function(){
                var endpoint = "apidb_nd/sql";
                mcs.mobileBackend.customCode.invokeCustomCodeJSONRequest(endpoint , "POST" , data)
                    .then(callback)
                    .catch(errorCallback);
            }).catch(function(){
                console.log('Error al conectar');
            });
        }
    }

    return new MobileBackend();
});