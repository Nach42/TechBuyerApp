define(['jquery','mcs'], function ($, mcs) {
    //define MCS mobile backend connection details
    console.log(mcs);
     var mcs_config = {
        "logLevel": mcs.logLevelInfo,
        "mobileBackends": {
            "FORTE_ND": {
                "default": true,
                "baseUrl": "https://BD37CD2DDD894061970D1F97DD100965.mobile.ocp.oraclecloud.com:443",
                "applicationKey": "0fc655f4-5ebb-4876-b9e4-352be9a2f491",
                "authorization": {
                    "basicAuth": {
                        "backendId": "d703d9b2-47f1-49de-a781-15ff61439241",
                        "anonymousToken": "QkQzN0NEMkRERDg5NDA2MTk3MEQxRjk3REQxMDA5NjVfTW9iaWxlQW5vbnltb3VzX0FQUElEOmNmMzdlZWMzLTJhZmMtNDUxYi04YmRkLWUyOWQ2ZmM4ZDBjOQ=="
                    },
                    "oAuth": {
                        "clientId": "2fc80bee2f834e2897b5f42d7844fe04",
                        "clientSecret": "c9d4ab1d-04c1-460c-afad-04f6ceb15694",
                        "tokenEndpoint": "https://idcs-188833f670f149a3ac2892ac9359b66e.identity.oraclecloud.com/oauth2/v1/token"
                    }

                }
            }
        }
    };

    function MobileBackend() {
        var self = this;
        self.mobileBackend;      
        function init() {
            mcs.mobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is JETSample. 
            
            self.mobileBackend = mcs.mobileBackendManager.getMobileBackend('FORTE_ND');
            self.mobileBackend.setAuthenticationType("basicAuth");            
        }

        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here. 
        self.authAnonymous = function () {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                function (response, data) {                        
                    console.log("Success authenticating against mobile backend");
                },
                function (statusCode, data) {
                    console.log("Failure authenticating against mobile backend");
                }
            );
        };

        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (successCallback, failureCallback) {
            var username = "ignacio.dones@avanttic.com";
            var password = "";
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };

        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };
       
        init();
    }

    return new MobileBackend();
});