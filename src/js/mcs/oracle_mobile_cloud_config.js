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
  },
  // "sync": {
  //   "periodicRefreshPolicy": "PERIODIC_REFRESH_POLICY_REFRESH_NONE",
  //   "policies": [
  //     {
  //       "path": '/mobile/custom/firstApi/tasks',
  //       "fetchPolicy": 'FETCH_FROM_SERVICE_ON_CACHE_MISS'
  //     },
  //     {
  //       "path": '/mobile/custom/secondApi/tasks',
  //     }
  //   ]
  // },
  "syncExpress": {
    "handler": "OracleRestHandler",
    "policies": [
      {
        "path": '/mobile/custom/firstApi/tasks/:id(\\d+)?',
      },
      {
        "path": '/mobile/custom/secondApi/tasks/:id(\\d+)?',
      }
    ]
  }
};
