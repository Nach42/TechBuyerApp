/**
* Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * Oracle Mobile Cloud Enterprise JavaScript SDK for Cordova, Release: 18.2.1.0, E95445-01
*/





(function(_module, _exports, _define, _window, _global, _self, _this){

var cxa;
var exportMCS = null, s = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 */
// TODO: uncomment to return cxa
//    * @deprecated Use CxA analytics instead
/**
 * @classdesc Class that holds an analytics event.
 * This class accessible by [mcs.AnalyticsEvent]{@link mcs.AnalyticsEvent} method.
 * @class
 * @global
 */
var AnalyticsEvent =
// TODO: uncomment to return cxa
//    * @deprecated Use CxA analytics instead
/**
 * @classdesc Class that holds an analytics event.
 * This class constructor accessible by [mcs.AnalyticsEvent]{@link mcs.AnalyticsEvent} method.
 * @param {string} name - event name
 * @constructor
 * @class
 * @global
 */
function AnalyticsEvent(name) {
  _classCallCheck(this, AnalyticsEvent);

  /**
   * The name of the event.
   * @type {String}
   * @name AnalyticsEvent#name
   */
  this.name = null;
  /**
   * The timestamp of the event. The system will populate with the current time by default.
   * @type {String}
   * @name AnalyticsEvent#timestamp
   */
  this.timestamp = new Date().toISOString();
  /**
   * The ID of the current session.
   * @type {String}
   * @name AnalyticsEvent#sessionID
   */
  this.sessionID = null;
  /**
   * Custom caller specifiable properties as key/value strings.
   * @type {Object}
   * @name AnalyticsEvent#properties
   */
  this.properties = {};
  this.name = name;
};

exports.AnalyticsEvent = AnalyticsEvent;


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Analytics = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _analyticsEvent = require("./analytics-event");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// * @deprecated Use CxA analytics instead: [cxaAnalytics]{@link mcs#cxaAnalytics} property.
/**
 * @classdesc Class that provides analytics capabilities. Callers should use
 * MobileBackend's [analytics]{@link MobileBackend#analytics} property.
 * @class
 * @global
 * @hideconstructor
 */
var Analytics = function () {
    function Analytics(backend, platform, utils) {
        _classCallCheck(this, Analytics);

        this.backend = backend;
        this.platform = platform;
        this.utils = utils;
        this.events = [];
        this.logger = new _logger.Logger('Analytics');
    }
    // * @deprecated Use CxA analytics instead
    /**
     * Returns session ID for current session.
     * @returns {String}
     * @function
     * @name Analytics#getSessionId
     */


    _createClass(Analytics, [{
        key: "getSessionId",
        value: function getSessionId() {
            return this.sessionId;
        }
        //   * @deprecated Use CxA analytics instead
        /**
         * Starts a new session. If one is in progress, then a new session will not be created.
         * @function
         * @name Analytics#startSession
         */

    }, {
        key: "startSession",
        value: function startSession() {
            if (!this.sessionId) {
                this.sessionId = this.utils.uuid();
                this.logNamedEvent('sessionStart').type = 'system';
            }
        }
        //   * @deprecated Use CxA analytics instead
        /**
         * Ends a session if one exists.
         * @return {Promise<Undefined|NetworkResponse>}
         * @function
         * @name Analytics#endSession
         */

    }, {
        key: "endSession",
        value: function endSession() {
            if (!!this.sessionId) {
                this.logNamedEvent("sessionEnd").type = "system";
                this.logger.debug('Deactivate a default session');
                return this.flush().then(flushSuccess.bind(this));
            } else {
                return Promise.reject(new _networkResponse.NetworkResponse(500, 'Session ID is null'));
            }
            function flushSuccess(response) {
                this.sessionId = undefined;
                return response;
            }
        }
        // * @deprecated Use CxA analytics instead
        /**
         * Creates a new analytics event with the given name.
         * @param name {String} The name of the event.
         * @returns {AnalyticsEvent} The [AnalyticsEvent]{@link AnalyticsEvent} instance that was logged.
         * @function
         * @name Analytics#logNamedEvent
         */

    }, {
        key: "logNamedEvent",
        value: function logNamedEvent(name) {
            var event = new _analyticsEvent.AnalyticsEvent(name);
            this.logEvent(event);
            return event;
        }
        // * @deprecated Use CxA analytics instead
        /**
         * Writes out an analytics event. It will implicitly call startSession(),
         * which will add a new event to the list of events for Oracle Mobile Cloud Enterprise to consume
         * @param event {AnalyticsEvent} The event to log.
         * @example event: "GettingStartedJSEvent"
         * @returns {AnalyticsEvent} The [AnalyticsEvent]{@link AnalyticsEvent} instance that was logged.
         * @function
         * @name Analytics#logEvent
         */

    }, {
        key: "logEvent",
        value: function logEvent(event) {
            if (this.events.length === 0) {
                this.events[0] = this._createContextEvent();
            }
            this.startSession();
            this.events[this.events.length] = event;
            event.sessionID = this.sessionId;
            return event;
        }
        // * @deprecated Use CxA analytics instead
        /**
         * Uploads all events to the service if the device is online or caches them locally until the device goes online, at
         * which point they will be uploaded. If a session is in progress it will end.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name Analytics#flush
         */

    }, {
        key: "flush",
        value: function flush() {
            for (var i = 0; i < this.events.length; i++) {
                var enableLocation = true; //this.config.analytics ? this.config.analytics.location : true;
                if (enableLocation && this.events[i].name == "context") {
                    var gpsLocation = this.platform.getGPSLocation();
                    if (gpsLocation != null && gpsLocation.latitude != null) {
                        this.events[i].properties.latitude = gpsLocation.latitude;
                    }
                    if (gpsLocation != null && gpsLocation.longitude != null) {
                        this.events[i].properties.longitude = gpsLocation.longitude;
                    }
                }
            }
            var eventsString = JSON.stringify(this.events);
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.POST,
                url: this.backend.getPlatformUrl("analytics/events"),
                headers: headers,
                data: eventsString,
                module: _types.MODULE_NAMES.MCS_ANALYTICS
            }).then(invokeServiceSuccess.bind(this), invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this.logger.debug('Analytics events flushed.');
                this.events = [];
                return response;
            }
            function invokeServiceError(response) {
                this.logger.error('Failed to flush analytics events.');
                return Promise.reject(response);
            }
        }
    }, {
        key: "_createContextEvent",
        value: function _createContextEvent() {
            var contextEvent = new _analyticsEvent.AnalyticsEvent("context");
            contextEvent.type = "system";
            contextEvent.sessionID = this.sessionId;
            contextEvent.properties.timezone = "" + new Date().getTimezoneOffset() * 60;
            var deviceInformation = this.platform.getDeviceInformation();
            contextEvent.properties.model = deviceInformation.model;
            contextEvent.properties.manufacturer = deviceInformation.manufacturer;
            contextEvent.properties.osName = deviceInformation.osName;
            contextEvent.properties.osVersion = deviceInformation.osVersion;
            contextEvent.properties.osBuild = deviceInformation.osBuild;
            contextEvent.properties.carrier = deviceInformation.carrier;
            return contextEvent;
        }
    }, {
        key: "_getEvents",
        value: function _getEvents() {
            return this.events;
        }
    }]);

    return Analytics;
}();

exports.Analytics = Analytics;


},{"../logger":13,"../responses/network-response":21,"../types":41,"./analytics-event":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Authorization = exports.AuthenticationResponse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Authentication response
 * @private
 */
var AuthenticationResponse = exports.AuthenticationResponse = function (_NetworkResponse) {
    _inherits(AuthenticationResponse, _NetworkResponse);

    function AuthenticationResponse(response, accessToken) {
        _classCallCheck(this, AuthenticationResponse);

        var _this = _possibleConstructorReturn(this, (AuthenticationResponse.__proto__ || Object.getPrototypeOf(AuthenticationResponse)).call(this, response.statusCode, response.data, response.headers));

        _this.accessToken = accessToken;
        return _this;
    }

    return AuthenticationResponse;
}(_networkResponse.NetworkResponse);
/**
 * @class
 * @global
 * @classdesc Class used to authorize a mobile user against Oracle Mobile Cloud Enterprise.
 * Callers should use MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @abstract
 * @hideconstructor
 */


var Authorization = function () {
    function Authorization(utils, platform) {
        _classCallCheck(this, Authorization);

        this.utils = utils;
        this.platform = platform;
        this._onAuthenticationCallbacks = [];
        this.logger = new _logger.Logger('Authorization');
    }
    /**
     * Returns true if a user has been authorized, false otherwise. A user can be authorized by calling authenticate() or authenticateAnonymous().
     * @type {Boolean}
     * @name Authorization#isAuthorized
     */


    _createClass(Authorization, [{
        key: "getAccessToken",

        /**
         * Returns the current access token from user credentials.
         * @returns {String} current access token from user credentials.
         * @function
         * @name Authorization#getAccessToken
         */
        value: function getAccessToken() {
            return this._accessToken;
        }
    }, {
        key: "_setAccessToken",
        value: function _setAccessToken(token) {
            this._accessToken = token;
        }
        /**
         * Get is anonymous
         * @return {boolean}
         * @private
         */

    }, {
        key: "_getIsAnonymous",
        value: function _getIsAnonymous() {
            return this._isAnonymous;
        }
        /**
         * Get is authorized
         * @return {boolean}
         * @private
         */

    }, {
        key: "_getIsAuthorized",
        value: function _getIsAuthorized() {
            return this._isAuthorized;
        }
        /**
         * Get anonymous access token
         * @return {string}
         * @private
         */

    }, {
        key: "_getAnonymousAccessToken",
        value: function _getAnonymousAccessToken() {
            return this._anonymousAccessToken;
        }
        /**
         * Authenticate anonymous
         * @param {IDictionary<Headers, string>} headers
         * @param {string} url
         * @param {HttpMethods} method
         * @param {boolean} withCredentials
         * @param data
         * @return {Promise<AuthenticationResponse>}
         * @private
         */

    }, {
        key: "_authenticateAnonymousInvoke",
        value: function _authenticateAnonymousInvoke(headers, url, method, withCredentials, data) {
            this.logout();
            headers = this._getHeaders(headers);
            headers = this._getAnonymousAuthorizationHeaders(headers);
            return this.platform.invokeService({
                url: url,
                method: method,
                headers: headers,
                withCredentials: withCredentials,
                data: data,
                module: _types.MODULE_NAMES.AUTHORIZATION
            }).then(function (response) {
                return new AuthenticationResponse(response, null);
            }).then(this._anonymousTokenResponseConverter.bind(this)).catch(invokeServiceError.bind(this)).then(this._authenticateAnonymousSuccess.bind(this));
            function invokeServiceError(response) {
                this.logger.error("Login failed with error: " + response.statusCode);
                this._clearState();
                return Promise.reject(response);
            }
        }
    }, {
        key: "_getHeaders",

        /**
         * Get headers
         * @param headers
         * @return {any}
         * @private
         */
        value: function _getHeaders(headers) {
            return headers;
        }
        /**
         * Authenticate anonymous success callback.
         * @param {AuthenticationResponse} response
         * @return {INetworkResponse}
         * @private
         */

    }, {
        key: "_authenticateAnonymousSuccess",
        value: function _authenticateAnonymousSuccess(response) {
            this.logger.info("User logged in anonymously " + response.statusCode);
            this._setAuthenticateAnonymousSuccess(response.accessToken);
            return response;
        }
    }, {
        key: "_setAuthenticateAnonymousSuccess",

        /**
         * Set authentication anonymous success callback.
         * @param {string} token
         * @private
         */
        value: function _setAuthenticateAnonymousSuccess(token) {
            this._isAnonymous = true;
            this._isAuthorized = true;
            this._anonymousAccessToken = token;
            for (var i = 0; i < this._onAuthenticationCallbacks.length; i++) {
                this._onAuthenticationCallbacks[i](token);
            }
        }
        /**
         * Authenticate error callback
         * @param {INetworkResponse} response
         * @private
         */

    }, {
        key: "_authenticateError",
        value: function _authenticateError(response) {
            this.logger.error("Login failed with error: " + response.statusCode);
            this._clearState();
        }
    }, {
        key: "_clearState",

        /**
         * Clear state after logout
         * @private
         */
        value: function _clearState() {
            this._accessToken = null;
            this._isAnonymous = false;
            this._anonymousAccessToken = null;
            this._isAuthorized = false;
        }
    }, {
        key: "onAuthentication",

        /**
         * The authentication callback.
         * This callback called when authentication happen.
         * @callback Authorization~OnAuthenticationCallback
         * @param token {String} The authentication token received from server.
         */
        /**
         * Subscribe for on authentication event
         * @param {Authorization~OnAuthenticationCallback} callback The callback that will be called when authentication happen.
         * @function
         * @name Authorization#onAuthentication
         */
        value: function onAuthentication(callback) {
            this._onAuthenticationCallbacks.push(callback);
        }
    }, {
        key: "isAuthorized",
        get: function get() {
            return this._isAuthorized;
        }
    }]);

    return Authorization;
}();

exports.Authorization = Authorization;


},{"../logger":13,"../responses/network-response":21,"../types":41}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicAuthorization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _authorization = require("./authorization");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _mcsAuthorization = require("./mcs-authorization");

var _types = require("../types");

var _dictionary = require("../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @class
 * @global
 * @classdesc Class used to authorize a mobile user against Oracle Mobile Cloud Enterprise with the Basic Authentication security schema. Callers should use
 * MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @extends MCSAuthorization
 * @hideconstructor
 */
var BasicAuthorization = function (_MCSAuthorization) {
    _inherits(BasicAuthorization, _MCSAuthorization);

    function BasicAuthorization(config, backend, utils, platform) {
        _classCallCheck(this, BasicAuthorization);

        var _this = _possibleConstructorReturn(this, (BasicAuthorization.__proto__ || Object.getPrototypeOf(BasicAuthorization)).call(this, backend, utils, platform));

        _this._logger = new _logger.Logger('BasicAuthorization');
        _this._backendId = utils.validateConfiguration(config.mobileBackendId);
        _this._anonymousToken = utils.validateConfiguration(config.anonymousKey);
        return _this;
    }
    /**
     * Returns the username of the current authorized user if any, null otherwise.
     * @return {String}
     * @function
     * @name BasicAuthorization#getAuthorizedUserName
     */


    _createClass(BasicAuthorization, [{
        key: "getAuthorizedUserName",
        value: function getAuthorizedUserName() {
            return this._authorizedUserName;
        }
    }, {
        key: "authenticate",

        /**
         * Authenticates a user with the given credentials against the service. The user remains logged in until logout() is called.
         * @param username {String} The username of the credentials.
         * @param password {String} The password of the credentials.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name BasicAuthorization#authenticate
         */
        value: function authenticate() {
            var username = arguments.length <= 0 ? undefined : arguments[0];
            var password = arguments.length <= 1 ? undefined : arguments[1];
            this.logout();
            if (!username || !password) {
                this._logger.error('Wrong username or password parameter');
                return Promise.reject(new _networkResponse.NetworkResponse(400, 'Bad Request'));
            }
            var authorizationToken = "Basic " + this.utils.encodeBase64(username + ":" + password);
            var headers = new _dictionary.Dictionary([]);
            headers.add(_types.HEADERS.AUTHORIZATION, authorizationToken);
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return this.platform.invokeService({
                url: this.backend.getPlatformUrl("users/login"),
                method: _types.HTTP_METHODS.GET,
                headers: headers,
                module: _types.MODULE_NAMES.AUTHORIZATION
            }).then(invokeServiceSuccess.bind(this)).catch(invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this._authenticateSuccess(response, authorizationToken);
                this._authorizedUserName = username;
                return response;
            }
            function invokeServiceError(response) {
                this._authenticateError(response);
                return Promise.reject(response);
            }
        }
        /**
         * Authenticates an anonymous user against the service. The user remains logged in until logout() is called.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name BasicAuthorization#authenticateAnonymous
         */

    }, {
        key: "authenticateAnonymous",
        value: function authenticateAnonymous() {
            return this._authenticateAnonymousInvoke(new _dictionary.Dictionary([]), this.backend.getPlatformUrl("users/login"), _types.HTTP_METHODS.GET);
        }
        /**
         * Get anonymous authorization headers
         * @param {IDictionary<Headers, string>} headers
         * @return {IDictionary<Headers, string>}
         * @private
         */

    }, {
        key: "_getAnonymousAuthorizationHeaders",
        value: function _getAnonymousAuthorizationHeaders(headers) {
            headers.add(_types.HEADERS.AUTHORIZATION, 'Basic ' + this._anonymousToken);
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
        /**
         * Checks to see if the authorization token is null, undefined, NaN,an empty string (""), 0, or false.
         * @returns {Boolean}
         * @function
         * @name BasicAuthorization#isTokenValid
         */

    }, {
        key: "isTokenValid",
        value: function isTokenValid() {
            if (this.getAccessToken() !== null && typeof this.getAccessToken() == 'string') {
                this._logger.info("Authorization token is not null or empty");
                return true;
            } else if (this.getAccessToken() == null && typeof this.getAccessToken() !== 'string') {
                this._logger.info("Authorization token is null and/or empty");
                return false;
            }
        }
    }, {
        key: "refreshToken",

        /**
         * For BasicAuth, there is no need to call this function, because the token never expires.
         * This function only exists here because it inherits from the Authorization object, which is also used for other types of authentication in which the token can expire.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name BasicAuthorization#refreshToken
         */
        value: function refreshToken() {
            if (!this._getIsAuthorized() && !this.isTokenValid()) {
                return Promise.reject(new _networkResponse.NetworkResponse(401, "Please use the authenticate with username/password combination or authenticateAnonymous function before using refreshToken."));
            } else if (this._getIsAuthorized() && this.isTokenValid()) {
                this._logger.debug("Authenticated token is valid, you do not need to refresh.");
                return Promise.resolve(new _networkResponse.NetworkResponse(200, this.getAccessToken()));
            }
        }
    }, {
        key: "logout",

        /**
         * Logs out the current user and clears credentials and tokens.
         * @function
         * @name BasicAuthorization#logout
         */
        value: function logout() {
            this._clearState();
        }
    }, {
        key: "_anonymousTokenResponseConverter",
        value: function _anonymousTokenResponseConverter(response) {
            return new _authorization.AuthenticationResponse(response, 'Basic ' + this._anonymousToken);
        }
    }, {
        key: "_getHttpHeaders",
        value: function _getHttpHeaders(headers) {
            if (this.getAccessToken() !== null && typeof this.getAccessToken() == "string") {
                headers.add(_types.HEADERS.AUTHORIZATION, this.getAccessToken());
            }
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
    }, {
        key: "_getAnonymousHttpHeaders",
        value: function _getAnonymousHttpHeaders(headers) {
            if (this._getAnonymousAccessToken() && typeof this._getAnonymousAccessToken() == "string") {
                headers.add(_types.HEADERS.AUTHORIZATION, this._getAnonymousAccessToken());
            }
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
    }, {
        key: "_clearState",
        value: function _clearState() {
            _get(BasicAuthorization.prototype.__proto__ || Object.getPrototypeOf(BasicAuthorization.prototype), "_clearState", this).call(this);
            this._authorizedUserName = null;
        }
    }]);

    return BasicAuthorization;
}(_mcsAuthorization.MCSAuthorization);

exports.BasicAuthorization = BasicAuthorization;


},{"../dictionary":12,"../logger":13,"../responses/network-response":21,"../types":41,"./authorization":3,"./mcs-authorization":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExternalTokenExchangeAuthorization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorization = require("./authorization");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _mcsAuthorization = require("./mcs-authorization");

var _types = require("../types");

var _dictionary = require("../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @class
 * @global
 * @classdesc Class used to authorize a mobile user against Oracle Mobile Cloud Enterprise with External Token Authentication security schema. Callers should use
 * MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @extends MCSAuthorization
 * @hideconstructor
 */
var ExternalTokenExchangeAuthorization = function (_MCSAuthorization) {
    _inherits(ExternalTokenExchangeAuthorization, _MCSAuthorization);

    function ExternalTokenExchangeAuthorization(config, backend, utils, platform) {
        _classCallCheck(this, ExternalTokenExchangeAuthorization);

        var _this = _possibleConstructorReturn(this, (ExternalTokenExchangeAuthorization.__proto__ || Object.getPrototypeOf(ExternalTokenExchangeAuthorization)).call(this, backend, utils, platform));

        _this.logger = new _logger.Logger('ExternalTokenExchangeAuthorization');
        _this._backendId = utils.validateConfiguration(config.mobileBackendId);
        _this._anonymousToken = utils.validateConfiguration(config.anonymousKey);
        return _this;
    }
    /**
     * Authenticates a user with the given external token. The user remains logged in until logout() is called.
     * @param token {String} The third party authentication token.
     * @return {Promise<NetworkResponse>}
     * @function
     * @name ExternalTokenExchangeAuthorization#authenticate
     */


    _createClass(ExternalTokenExchangeAuthorization, [{
        key: "authenticate",
        value: function authenticate() {
            var token = arguments.length <= 0 ? undefined : arguments[0];
            this.logout();
            this._redToken = token;
            if (!token) {
                this.logger.error('Wrong token parameter');
                return Promise.reject(new _networkResponse.NetworkResponse(400, 'Bad Request'));
            }
            var authorizationToken = "Bearer " + token;
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.AUTHORIZATION, authorizationToken);
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return this.platform.invokeService({
                url: this.backend.getPlatformUrl('sso/exchange-token?format=json'),
                method: _types.HTTP_METHODS.GET,
                headers: headers,
                module: _types.MODULE_NAMES.AUTHORIZATION
            }).then(invokeServiceSuccess.bind(this)).catch(invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this._tokenExpiredTime = Date.now() + response.data.expires_in * 1000;
                this._authenticateSuccess(response, response.data.access_token);
                return new _networkResponse.NetworkResponse(200, response.data);
            }
            function invokeServiceError(response) {
                this._authenticateError(response);
                return Promise.reject(response);
            }
        }
        /**
         * Authenticates an anonymous user against the service. The user remains logged in until logout() is called.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name ExternalTokenExchangeAuthorization#authenticateAnonymous
         */

    }, {
        key: "authenticateAnonymous",
        value: function authenticateAnonymous() {
            return this._authenticateAnonymousInvoke(new _dictionary.Dictionary([]), this.backend.getPlatformUrl("users/login"), _types.HTTP_METHODS.GET);
        }
    }, {
        key: "_getAnonymousAuthorizationHeaders",
        value: function _getAnonymousAuthorizationHeaders(headers) {
            headers.add(_types.HEADERS.AUTHORIZATION, 'Basic ' + this._anonymousToken);
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
        /**
         * Checks to see if the OAuth token is null,undefined,NaN,empty string (''),0,false and also checks the timestamp
         * of when the token was first retrieved to see if it was still valid.
         * @returns {Boolean}
         * @function
         * @name ExternalTokenExchangeAuthorization#isTokenValid
         */

    }, {
        key: "isTokenValid",
        value: function isTokenValid() {
            if (this.getAccessToken() || this._getAnonymousAccessToken()) {
                this.logger.debug('Token is not null or empty');
                var currentTime = Date.now();
                if (currentTime >= this._tokenExpiredTime) {
                    this.logger.info('Token has expired or user has not been authenticate with the service');
                    return false;
                } else {
                    this.logger.debug('Token is still valid');
                    return true;
                }
            } else {
                return false;
            }
        }
        /**
         * Logs out the current user and clears credentials and tokens and cookies.
         * @function
         * @name ExternalTokenExchangeAuthorization#logout
         */

    }, {
        key: "logout",
        value: function logout() {
            this._redToken = null;
            this._clearState();
        }
        /**
         * Refreshes the authentication token if it has expired. The authentication scheme should support refresh.
         * @return {Promise<String>}
         * @function
         * @name ExternalTokenExchangeAuthorization#refreshToken
         */

    }, {
        key: "refreshToken",
        value: function refreshToken() {
            var boolean = this.isTokenValid();
            if (boolean !== false) {
                if (this._accessToken == null && this._isAnonymous) {
                    this.logger.error('Anonymous token is valid, you do not need to refresh.');
                    return Promise.resolve(this._anonymousAccessToken);
                }
                if (!this._anonymousAccessToken && !this._isAnonymous) {
                    this.logger.error('Authenticated token is valid, you do not need to refresh.');
                    return Promise.resolve(this._accessToken);
                }
            } else {
                this.logger.error('Token is not valid and has expired, refreshing token from service.', this._redToken);
                return this.authenticate(this._redToken).then(function () {
                    return this._accessToken;
                });
            }
        }
    }, {
        key: "_getHttpHeaders",
        value: function _getHttpHeaders(headers) {
            if (this.getAccessToken() !== null && typeof this.getAccessToken() == 'string') {
                headers.add(_types.HEADERS.AUTHORIZATION, 'Bearer ' + this.getAccessToken());
            }
            return headers;
        }
    }, {
        key: "_getAnonymousHttpHeaders",
        value: function _getAnonymousHttpHeaders(headers) {
            if (this._getAnonymousAccessToken() && typeof this._getAnonymousAccessToken() == 'string') {
                headers.add(_types.HEADERS.AUTHORIZATION, 'Bearer ' + this._getAnonymousAccessToken());
            }
            return headers;
        }
    }, {
        key: "_anonymousTokenResponseConverter",
        value: function _anonymousTokenResponseConverter(response) {
            return new _authorization.AuthenticationResponse(response, response.data.access_token);
        }
    }]);

    return ExternalTokenExchangeAuthorization;
}(_mcsAuthorization.MCSAuthorization);

exports.ExternalTokenExchangeAuthorization = ExternalTokenExchangeAuthorization;


},{"../dictionary":12,"../logger":13,"../responses/network-response":21,"../types":41,"./authorization":3,"./mcs-authorization":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FacebookAuthorization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorization = require("./authorization");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _mcsAuthorization = require("./mcs-authorization");

var _dictionary = require("../dictionary");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @classdesc Class used to authorize a user against Facebook and use the OAuth token from Facebook
 * to authenicate against Oracle Mobile Cloud Enterprise. Callers should use
 * MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @class
 * @global
 * @extends MCSAuthorization
 * @hideconstructor
 */
var FacebookAuthorization = function (_MCSAuthorization) {
    _inherits(FacebookAuthorization, _MCSAuthorization);

    function FacebookAuthorization(config, backend, utils, platform) {
        _classCallCheck(this, FacebookAuthorization);

        var _this = _possibleConstructorReturn(this, (FacebookAuthorization.__proto__ || Object.getPrototypeOf(FacebookAuthorization)).call(this, backend, utils, platform));

        _this.expiredTime = null;
        _this.logger = new _logger.Logger('FacebookAuthorization');
        _this._backendId = utils.validateConfiguration(config.mobileBackendId);
        _this._anonymousToken = utils.validateConfiguration(config.anonymousKey);
        _this._facebookAppId = utils.validateConfiguration(config.appId);
        _this._scopes = utils.validateConfiguration(config.scopes);
        return _this;
    }
    /**
     * Returns the Facebook Application Id token for the current backend.
     * @return {String}
     * @function
     * @name FacebookAuthorization#getFacebookAppId
     */


    _createClass(FacebookAuthorization, [{
        key: "getFacebookAppId",
        value: function getFacebookAppId() {
            return this._facebookAppId;
        }
        /**
         * Authenticates a user against Facebook. The user remains logged in until logout() is called.
         * In the Facebook Developer console you must define the domain that the application will use.
         * in the Facebook Developer UI, When you add a platform for the application, you choose Website and set the site URL to http://localhost/.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name FacebookAuthorization#authenticate
         */

    }, {
        key: "authenticate",
        value: function authenticate() {
            this.logout();
            if (typeof cordova !== 'undefined') {
                var metadata = cordova.require('cordova/plugin_list').metadata;
                if (this.isInAppBrowserInstalled(metadata) !== true) {
                    return Promise.reject(new _networkResponse.NetworkResponse(100, 'Could not find InAppBrowser plugin, use command "cordova plugin add cordova-plugin-inappbrowser"'));
                } else {
                    return this.authenticateInvoke();
                }
            } else {
                return Promise.reject(new _networkResponse.NetworkResponse(400, 'Bad Request - This method require Cordova framework'));
            }
        }
    }, {
        key: "authenticateInvoke",
        value: function authenticateInvoke() {
            return new Promise(invoke.bind(this)).then(invokeSuccess.bind(this)).catch(invokeError.bind(this));
            function invoke(resolve, reject) {
                var _this2 = this;

                var clientId = this.getFacebookAppId();
                var redirect_uri = 'http://localhost/callback';
                var flowUrl = 'https://www.facebook.com/dialog/oauth?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&response_type=token&scope=' + this._scopes ? this.scopes : 'public_profile';
                var browserRef = window.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                browserRef.show();
                this.logger.info('Opening InAppBrowser to url: ' + flowUrl);
                browserRef.addEventListener('loadstart', function (event) {
                    if (event.url.indexOf(redirect_uri) === 0) {
                        browserRef.close();
                        var callbackResponse = event.url.split('#')[1];
                        var responseParameters = callbackResponse.split('&');
                        var social_token = {};
                        for (var i = 0; i < responseParameters.length; i++) {
                            social_token[responseParameters[i].split('=')[0]] = responseParameters[i].split('=')[1];
                        }
                        if (social_token.access_token) {
                            _this2.expiredTime = Date.now() + social_token.expires_in * 1000;
                            resolve(new _networkResponse.NetworkResponse(200, social_token));
                        } else {
                            if (event.url.indexOf('error_code=100') !== 0 && !_this2.isAuthorized) {
                                reject(new _networkResponse.NetworkResponse(100, 'Cannot authenticate via a web browser'));
                            }
                        }
                    }
                });
                browserRef.addEventListener('exit', function () {
                    if (!_this2._getIsAuthorized()) {
                        reject(new _networkResponse.NetworkResponse(100, 'Cannot authenticate via a web browser'));
                    }
                });
            }
            function invokeSuccess(response) {
                this._authenticateSuccess(response, response.data.access_token);
                this.expiredTime = Date.now() + response.data.expires_in * 1000;
                return response;
            }
            function invokeError(response) {
                this._authenticateError(response);
                return Promise.reject(response);
            }
        }
        /**
         * Authenticates an anonymous user against the service. The user remains logged in until logout() is called.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name FacebookAuthorization#authenticateAnonymous
         */

    }, {
        key: "authenticateAnonymous",
        value: function authenticateAnonymous() {
            return this._authenticateAnonymousInvoke(new _dictionary.Dictionary([]), this.backend.getPlatformUrl("users/login"), _types.HTTP_METHODS.GET);
        }
    }, {
        key: "_getAnonymousAuthorizationHeaders",
        value: function _getAnonymousAuthorizationHeaders(headers) {
            headers.add(_types.HEADERS.AUTHORIZATION, 'Basic ' + this._anonymousToken);
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
    }, {
        key: "_anonymousTokenResponseConverter",
        value: function _anonymousTokenResponseConverter(response) {
            return new _authorization.AuthenticationResponse(response, 'Basic ' + this._anonymousToken);
        }
        /**
         * Checks to see if the OAuth token is null, undefined, NaN, AN empty string (''), 0, or false. It also checks the timestamp
         * for when the token was first retrieved to see if it was still valid.
         * @returns {Boolean}
         * @function
         * @name FacebookAuthorization#isTokenValid
         */

    }, {
        key: "isTokenValid",
        value: function isTokenValid() {
            if (this.getAccessToken() || this._getAnonymousAccessToken()) {
                this.logger.debug('Token is not null or empty');
                var currentTime = Date.now();
                if (currentTime >= this.expiredTime) {
                    this.logger.info('Token has expired or user has not been authenticate with the service/Facebook');
                    return false;
                } else {
                    this.logger.debug('Token is still valid');
                    return true;
                }
            } else {
                return false;
            }
        }
        /**
         * Refreshes the authentication token if it has expired from Facebook. The authentication scheme should support refresh.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name FacebookAuthorization#refreshToken
         */

    }, {
        key: "refreshToken",
        value: function refreshToken() {
            var isTokenValid = this.isTokenValid();
            if (isTokenValid && this.getAccessToken() == null && this._getIsAnonymous()) {
                return Promise.resolve(new _networkResponse.NetworkResponse(200, this._getAnonymousAccessToken()));
            } else if (isTokenValid && this._getAnonymousAccessToken() && !this._getIsAnonymous()) {
                return Promise.resolve(new _networkResponse.NetworkResponse(200, this._getAnonymousAccessToken()));
            } else {
                this.logger.error('Token is not valid and has expired, refreshing token from Facebook.');
                return this.authenticate();
            }
        }
    }, {
        key: "logout",

        /**
         * Logs out the current user and clears credentials and tokens.
         * @function
         * @name FacebookAuthorization#logout
         */
        value: function logout() {
            this._clearState();
            this.expiredTime = Date.now() * 1000;
        }
    }, {
        key: "_getHttpHeaders",
        value: function _getHttpHeaders(headers) {
            if (this.getAccessToken() != null && typeof this.getAccessToken() == 'string') {
                headers.add(_types.HEADERS.AUTHORIZATION, 'Basic ' + this._anonymousToken);
                headers.add(_types.HEADERS.ORACLE_MOBILE_SOCIAL_ACCESS_TOKEN, this.getAccessToken());
                headers.add(_types.HEADERS.ORACLE_MOBILE_SOCIAL_IDENTITY_PROVIDER, 'facebook');
            }
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
    }, {
        key: "_getAnonymousHttpHeaders",
        value: function _getAnonymousHttpHeaders(headers) {
            if (this._getAnonymousAccessToken() && typeof this._getAnonymousAccessToken() == 'string') {
                headers.add(_types.HEADERS.AUTHORIZATION, this._getAnonymousAccessToken());
            }
            headers.add(_types.HEADERS.ORACLE_MOBILE_BACKEND_ID, this._backendId);
            return headers;
        }
        /**
         * Checks to see if the correct plugin is installed into the application.
         * @return {boolean}
         * @private
         */

    }, {
        key: "isInAppBrowserInstalled",
        value: function isInAppBrowserInstalled(metadata) {
            var inAppBrowserNames = ['cordova-plugin-inappbrowser', 'org.apache.cordova.inappbrowser'];
            return inAppBrowserNames.some(function (name) {
                return metadata.hasOwnProperty(name);
            });
        }
    }]);

    return FacebookAuthorization;
}(_mcsAuthorization.MCSAuthorization);

exports.FacebookAuthorization = FacebookAuthorization;


},{"../dictionary":12,"../logger":13,"../responses/network-response":21,"../types":41,"./authorization":3,"./mcs-authorization":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MCSAuthorization = exports.AuthenticationResponse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require("../logger");

var _user = require("./user");

var _networkResponse = require("../responses/network-response");

var _authorization = require("./authorization");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var AuthenticationResponse = exports.AuthenticationResponse = function (_NetworkResponse) {
    _inherits(AuthenticationResponse, _NetworkResponse);

    function AuthenticationResponse(response, anonymousAccessToken) {
        _classCallCheck(this, AuthenticationResponse);

        var _this = _possibleConstructorReturn(this, (AuthenticationResponse.__proto__ || Object.getPrototypeOf(AuthenticationResponse)).call(this, response.statusCode, response.data, response.headers));

        _this.accessToken = anonymousAccessToken;
        return _this;
    }

    return AuthenticationResponse;
}(_networkResponse.NetworkResponse);
/**
 * @class
 * @global
 * @classdesc Class used to authorize a mobile user against Oracle Mobile Cloud Enterprise.
 * Callers should use MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @abstract
 * @extends Authorization
 * @hideconstructor
 */


var MCSAuthorization = function (_Authorization) {
    _inherits(MCSAuthorization, _Authorization);

    function MCSAuthorization(backend, utils, platform) {
        _classCallCheck(this, MCSAuthorization);

        var _this2 = _possibleConstructorReturn(this, (MCSAuthorization.__proto__ || Object.getPrototypeOf(MCSAuthorization)).call(this, utils, platform));

        _this2.backend = backend;
        _this2.utils = utils;
        _this2.platform = platform;
        _this2.logger = new _logger.Logger('MCSAuthorization');
        return _this2;
    }
    /**
     * Object returned from getCurrentUser().
     * @typedef MCSAuthorization~CurrentUserData
     * @property statusCode {Number} Any HTTP status code returned from the server, if available.
     * @property user {User} The user resource returned by the service.
     */
    /**
     * Returns the user resource associated with the logged in user.
     * @return {Promise<MCSAuthorization~CurrentUserData|NetworkResponse>}
     * @function
     * @name MCSAuthorization#getCurrentUser
     * @example <caption>Example usage of mcs.mobileBackend.authorization.getCurrentUser()</caption>
     * mcs.mobileBackend.authorization.getCurrentUser().then(
     * function(data){
     * },
     * function(exception){
     * });
     * @example // Response example
     * {
     *     "id": "c9a5fdc5-737d-4e93-b292-d258ba334149",
     *     "username": "DwainDRob",
     *     "email": "js_sdk@mcs.com",
     *     "firstName": "Mobile",
     *     "lastName": "User",
     *     "properties": {}
     * }
     */


    _createClass(MCSAuthorization, [{
        key: "getCurrentUser",
        value: function getCurrentUser() {
            return this.platform.invokeService({
                method: 'GET',
                url: this.backend.getPlatformUrl("users/~"),
                headers: this.backend.getHttpHeaders(),
                module: _types.MODULE_NAMES.AUTHORIZATION
            }).then(invokeServiceSuccess.bind(this), invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                var user = !!response.data ? new _user.User(response.data) : null;
                return { statusCode: response.statusCode, user: user };
            }
            function invokeServiceError(response) {
                return Promise.reject(response);
            }
        }
    }, {
        key: "_authenticateSuccess",

        /**
         * Authenticate success callback
         * @param {INetworkResponse} response
         * @param {string} accessToken
         * @private
         */
        value: function _authenticateSuccess(response, accessToken) {
            this.logger.info("User logged in " + response.statusCode);
            this._isAnonymous = false;
            this._isAuthorized = true;
            this._accessToken = accessToken;
            for (var i = 0; i < this._onAuthenticationCallbacks.length; i++) {
                this._onAuthenticationCallbacks[i](accessToken);
            }
        }
    }, {
        key: "getAuthorizedUserName",

        /**
         * Returns the username of the current authorized user if any, null otherwise.
         * @function
         * @name MCSAuthorization#getAuthorizedUserName
         * @return {String}
         */
        value: function getAuthorizedUserName() {
            throw Error('THis method is not supported by this authorization method.');
        }
    }]);

    return MCSAuthorization;
}(_authorization.Authorization);

exports.MCSAuthorization = MCSAuthorization;


},{"../logger":13,"../responses/network-response":21,"../types":41,"./authorization":3,"./user":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OAuthAuthorization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _authorization = require("./authorization");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _mcsAuthorization = require("./mcs-authorization");

var _types = require("../types");

var _dictionary = require("../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ddrobins on 7/28/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @class
 * @global
 * @classdesc Class used to authorize a mobile user against Oracle Mobile Cloud Enterprise. Callers should use
 * MobileBackend's [authorization]{@link MobileBackend#authorization} property.
 * @extends MCSAuthorization
 * @hideconstructor
 */
var OAuthAuthorization = function (_MCSAuthorization) {
    _inherits(OAuthAuthorization, _MCSAuthorization);

    function OAuthAuthorization(oAuthTokenEndPoint, config, backend, tenantName, utils, platform) {
        _classCallCheck(this, OAuthAuthorization);

        var _this = _possibleConstructorReturn(this, (OAuthAuthorization.__proto__ || Object.getPrototypeOf(OAuthAuthorization)).call(this, backend, utils, platform));

        _this.oAuthTokenEndPoint = oAuthTokenEndPoint;
        _this.config = config;
        _this.logger = new _logger.Logger('OAuthAuthorization');
        _this._clientId = utils.validateConfiguration(config.clientId);
        _this._clientSecret = utils.validateConfiguration(config.clientSecret);
        _this._tenantName = utils.validateConfiguration(tenantName);
        return _this;
    }
    /**
     * Returns the username of the current authorized user if any, null otherwise.
     * @return {String}
     * @function
     * @name OAuthAuthorization#getAuthorizedUserName
     */


    _createClass(OAuthAuthorization, [{
        key: "getAuthorizedUserName",
        value: function getAuthorizedUserName() {
            return this._authorizedUserName;
        }
    }, {
        key: "getClientId",

        /**
         * Returns the client ID for the current backend.
         * @return {String}
         * @function
         * @name OAuthAuthorization#getClientId
         */
        value: function getClientId() {
            return this._clientId;
        }
    }, {
        key: "getTenantName",

        /**
         * Returns the tenant name for the current backend.
         * @private
         */
        value: function getTenantName() {
            return this._tenantName;
        }
    }, {
        key: "getClientSecret",

        /**
         * Returns the client secret for the current backend.
         * @return {String}
         * @function
         * @name OAuthAuthorization#getClientSecret
         */
        value: function getClientSecret() {
            return this._clientSecret;
        }
    }, {
        key: "authenticate",

        /**
         * Authenticates a user with the given credentials against the service.
         * The user remains logged in until logout() is called.
         * @param username {String} The username of the credentials.
         * @param password {String} The password of the credentials.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name OAuthAuthorization#authenticate
         */
        value: function authenticate() {
            var username = arguments.length <= 0 ? undefined : arguments[0];
            var password = arguments.length <= 1 ? undefined : arguments[1];
            this.logout();
            if (!username || !password) {
                this.logger.error("Wrong username or password parameter");
                return Promise.reject(new _networkResponse.NetworkResponse(400, 'Bad Request'));
            }
            var authorizationToken = "Basic " + this.utils.encodeBase64(this._clientId + ":" + this._clientSecret);
            var scope = this.config.scope || this.backend._baseUrl + 'urn:opc:resource:consumer::all';
            var requestBody = OAuthAuthorization.urlEncodeComponent(username, password, scope);
            var headers = new _dictionary.Dictionary([]);
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.X_WWW_FORM_FORM_URLENCODED);
            headers.add(_types.HEADERS.AUTHORIZATION, authorizationToken);
            if (typeof this._tenantName !== 'undefined') {
                headers.add(_types.HEADERS.X_RESOURCE_IDENTITY_DOMAIN_NAME, this._tenantName);
            }
            return this.platform.invokeService({
                url: this.getOAuthTokenUrl(),
                method: _types.HTTP_METHODS.POST,
                headers: headers,
                data: requestBody,
                withCredentials: false,
                module: _types.MODULE_NAMES.AUTHORIZATION
            }).then(invokeServiceSuccess.bind(this)).catch(invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this._authenticateSuccess(response, response.data.access_token);
                this._authorizedUserName = username;
                return response;
            }
            function invokeServiceError(response) {
                this._authenticateError(response);
                return Promise.reject(response);
            }
        }
    }, {
        key: "authenticateAnonymous",

        /**
         * Authenticates an anonymous user against the service. The user remains logged in until logout() is called.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name OAuthAuthorization#authenticateAnonymous
         */
        value: function authenticateAnonymous() {
            var headers = new _dictionary.Dictionary([]);
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.X_WWW_FORM_FORM_URLENCODED);
            if (typeof this._tenantName !== 'undefined') {
                headers.add(_types.HEADERS.X_USER_IDENTITY_DOMAIN_NAME, this._tenantName);
            }
            var scope = this.config.scope || this.backend._baseUrl + 'urn:opc:resource:consumer::all';
            var body = 'grant_type=client_credentials&scope=' + encodeURIComponent(scope);
            return this._authenticateAnonymousInvoke(headers, this.getOAuthTokenUrl(), _types.HTTP_METHODS.POST, false, body).then(invokeServiceSuccess.bind(this));
            function invokeServiceSuccess(response) {
                this._tokenExpiredTime = Date.now() + response.data.expires_in * 1000;
                return response;
            }
        }
    }, {
        key: "_getAnonymousAuthorizationHeaders",
        value: function _getAnonymousAuthorizationHeaders(headers) {
            headers.add(_types.HEADERS.AUTHORIZATION, 'Basic ' + this.utils.encodeBase64(this.getClientId() + ":" + this.getClientSecret()));
            return headers;
        }
        /**
         * Checks to see if the OAuth token is null, undefined, NaN,an empty string (""), 0,or false. It also checks the timestamp
         * for when the token was first retrieved to see if it was still valid.
         * @returns {Boolean}
         * @function
         * @name OAuthAuthorization#isTokenValid
         */

    }, {
        key: "isTokenValid",
        value: function isTokenValid() {
            if (this.getAccessToken() || this._getAnonymousAccessToken()) {
                this.logger.debug("Token is not null or empty");
                var currentTime = Date.now();
                if (currentTime >= this._tokenExpiredTime) {
                    this.logger.info("Token has expired");
                    return false;
                } else {
                    this.logger.debug("Token is still valid");
                    return true;
                }
            } else {
                return false;
            }
        }
    }, {
        key: "logout",

        /**
         * Logs out the current user and clears credentials and tokens.
         * @function
         * @name OAuthAuthorization#logout
         */
        value: function logout() {
            this._clearState();
        }
    }, {
        key: "refreshToken",

        /**
         * For OAuth, the SDK can not refresh because it does not persist client credentials.
         * This function only exists here because it inherits from the Authorization object, which is also used for other types of authentication in which the token can expire.
         * @return {Promise<NetworkResponse>}
         * @function
         * @name OAuthAuthorization#refreshToken
         */
        value: function refreshToken() {
            var isTokenValid = this.isTokenValid();
            if (isTokenValid && !this.getAccessToken() && this._getIsAnonymous()) {
                return Promise.resolve(new _networkResponse.NetworkResponse(200, this._getAnonymousAccessToken()));
            } else if (isTokenValid && !this._getAnonymousAccessToken() && !this._getIsAnonymous()) {
                return Promise.resolve(new _networkResponse.NetworkResponse(200, this._getAnonymousAccessToken()));
            } else {
                this.logger.error("Token has expired or user has not been authenticate with the service.");
                return Promise.resolve(new _networkResponse.NetworkResponse(401, "Please use the authenticate with username/password combination or authenticateAnonymous function before using refreshToken."));
            }
        }
    }, {
        key: "_anonymousTokenResponseConverter",
        value: function _anonymousTokenResponseConverter(response) {
            return new _authorization.AuthenticationResponse(response, response.data.access_token);
        }
    }, {
        key: "_clearState",
        value: function _clearState() {
            _get(OAuthAuthorization.prototype.__proto__ || Object.getPrototypeOf(OAuthAuthorization.prototype), "_clearState", this).call(this);
            this._authorizedUserName = null;
            this._tokenExpiredTime = Date.now() * 1000;
        }
    }, {
        key: "_getHttpHeaders",
        value: function _getHttpHeaders(headers) {
            if (this.getAccessToken() !== null && typeof this.getAccessToken() == "string") {
                headers.add(_types.HEADERS.AUTHORIZATION, "Bearer " + this.getAccessToken());
            }
            return headers;
        }
    }, {
        key: "_getAnonymousHttpHeaders",
        value: function _getAnonymousHttpHeaders(headers) {
            if (this._getAnonymousAccessToken() && typeof this._getAnonymousAccessToken() == "string") {
                headers.add(_types.HEADERS.AUTHORIZATION, "Bearer " + this._getAnonymousAccessToken());
            }
            return headers;
        }
    }, {
        key: "getOAuthTokenUrl",

        /**
         * Constructs a full URL, including the prefix, for the OAuth token endpoint.
         * @returns {String} The full URL for the OAuth token endpoint.
         * @function
         * @name OAuthAuthorization#getOAuthTokenUrl
         */
        value: function getOAuthTokenUrl() {
            var tokenUri = this.utils.validateConfiguration(this.oAuthTokenEndPoint);
            if (!this.utils.strEndsWith(tokenUri, "/")) {
                tokenUri += "/";
            }
            return tokenUri + 'oauth2/v1/token';
        }
    }], [{
        key: "urlEncodeComponent",
        value: function urlEncodeComponent(username, password, scope) {
            if (username.indexOf("@") > -1) {
                username = encodeURIComponent(username).replace(/%20/g, '+');
            } else {
                username = encodeURIComponent(username).replace(/%5B/g, '[').replace(/%5D/g, ']');
            }
            if (password.indexOf("&") > -1) {
                password = encodeURIComponent(password).replace(/%20/g, '+');
            } else {
                password = encodeURIComponent(password).replace(/%5B/g, '[').replace(/%5D/g, ']');
            }
            scope = encodeURIComponent(scope);
            return 'grant_type=password&username=' + username + '&password=' + password + '&scope=' + scope;
        }
    }]);

    return OAuthAuthorization;
}(_mcsAuthorization.MCSAuthorization);

exports.OAuthAuthorization = OAuthAuthorization;


},{"../dictionary":12,"../logger":13,"../responses/network-response":21,"../types":41,"./authorization":3,"./mcs-authorization":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * Created by ddrobins on 7/28/15.
 */
/**
 * @classdesc Class that enables you to retrieve information on the current user and manage its properties. Callers should use
 * Authorization's [getCurrentUser()]{@link MobileBackend#authorization.getCurrentUser} property.
 * @class
 * @global
 */
var User = function () {
  function User(user) {
    _classCallCheck(this, User);

    this._id = user.id;
    this._userName = user.username;
    this._firstName = user._firstName;
    this._lastName = user._lastName;
    this._email = user.email;
  }
  /**
   * Returns the current user's name.
   *
   * @function
   * @name User#getId
   * @return {string} Current user's name
   */


  _createClass(User, [{
    key: "getId",
    value: function getId() {
      return this._id;
    }
    /**
     * Returns first name for current user.
     * @function
     * @name User#getFirstName
     * @return {string}
     */

  }, {
    key: "getFirstName",
    value: function getFirstName() {
      return this._firstName;
    }
  }, {
    key: "getLastName",

    /**
     * Returns last name for current user.
     * @function
     * @name User#getLastName
     * @return {string}
     */
    value: function getLastName() {
      return this._lastName;
    }
  }, {
    key: "getEmail",

    /**
     * Returns email address for current user.
     * @function
     * @name User#getEmail
     * @return {string}
     */
    value: function getEmail() {
      return this._email;
    }
  }]);

  return User;
}();

exports.User = User;


},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomCode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ddrobins on 7/28/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _networkResponse = require("../responses/network-response");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc This class provides a way to invoke custom API endpoints for the
 * currently active mobile backend. Callers should use
 * MobileBackend's [customCode]{@link MobileBackend#customCode} property.
 * @class
 * @global
 * @hideconstructor
 */
var CustomCode = function () {
    function CustomCode(backend, utils, platform) {
        _classCallCheck(this, CustomCode);

        this.backend = backend;
        this.utils = utils;
        this.platform = platform;
    }

    _createClass(CustomCode, [{
        key: "checkParameters",
        value: function checkParameters(params, comparison) {
            return this.isJSON(params) && params && params != undefined && (typeof params === "undefined" ? "undefined" : _typeof(params)) == comparison;
        }
    }, {
        key: "isJSON",
        value: function isJSON(params) {
            if (typeof params != 'string') params = JSON.stringify(params);
            try {
                JSON.parse(params);
                return true;
            } catch (e) {
                return false;
            }
        }
        /**
         * Invoke custom code JSON request.
         * Allows the user to call custom Code defined on the UI and assigned to the backend defined by the user
         * This custom endpoint should return data only in JSON format.
         * @function
         * @name CustomCode#invokeCustomCodeJSONRequest
         * @param path {String} The path of the endpoint without platform prefix.
         * @param method {String} HTTP method that is invoked, this method accepts: GET, POST, PUT, DELETE, PATCH.
         * @param data {Object} Data that is inserted into the call on the server for POST and PUT methods. Only accepts a JSON object and/or JavaScript array.
         * @return {Promise<NetworkResponse>}
         * @example <caption>These methods must be defined in the custom API for these methods to work.<br/>
         * Example usage of CustomCode.invokeCustomCodeJSONRequest()</caption>
         * mcs.mobileBackend.customCode
         * .invokeCustomCodeJSONRequest('TaskApi1/tasks/100', 'GET', null)
         * .then(invokeSuccess, invokeError);
            * function invokeSuccess(response) {
         *  console.log(response.data);// returns object in JSON format
         * }
         * function invokeError(response) {
         *  console.error(response);
         * }
         */

    }, {
        key: "invokeCustomCodeJSONRequest",
        value: function invokeCustomCodeJSONRequest(path, method, data) {
            if (method in CustomCode.httpMethods) {
                if (method === CustomCode.httpMethods.DELETE && data) {
                    return Promise.reject(new _networkResponse.NetworkResponse(500, 'DELETE method content body'));
                }
                var headers = this.backend.getHttpHeaders();
                headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
                var customData = data ? JSON.stringify(data) : null;
                return this.platform.invokeService({
                    method: method,
                    url: this.backend.getCustomCodeUrl(path),
                    headers: headers,
                    data: customData,
                    module: _types.MODULE_NAMES.CUSTOM_CODE
                });
            } else {
                return Promise.reject(new _networkResponse.NetworkResponse(501, 'Method Not Implemented'));
            }
        }
    }]);

    return CustomCode;
}();
/**
 * @ignore
 * @type {{GET: string, POST: string, PUT: string, DELETE: string}}
 */


CustomCode.httpMethods = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
exports.CustomCode = CustomCode;


},{"../responses/network-response":21,"../types":41}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Diagnostics = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("../logger");

var _dictionary = require("../dictionary");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that provides diagnostics capabilities. Callers should use
 * MobileBackend's [diagnostics]{@link MobileBackend#diagnostics} property.
 * @class
 * @global
 * @hideconstructor
 */
var Diagnostics = function () {
    function Diagnostics(platform, utils) {
        _classCallCheck(this, Diagnostics);

        this.platform = platform;
        this.logger = new _logger.Logger('Diagnostics');
        this._sessionId = utils.uuid();
    }

    _createClass(Diagnostics, [{
        key: "_getHttpHeaders",
        value: function _getHttpHeaders() {
            var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _dictionary.Dictionary([]);

            headers.add(_types.HEADERS.ORACLE_MOBILE_DIAGNOSTIC_SESSION_ID, this.getSessionId());
            headers.add(_types.HEADERS.ORACLE_MOBILE_DEVICE_ID, this.platform.getDeviceId());
            headers.add(_types.HEADERS.ORACLE_MOBILE_CLIENT_REQUEST_TIME, new Date().toISOString());
            return headers;
        }
        /**
         * Returns the session ID or process ID of the Diagnostics event.
         * @function
         * @name Diagnostics#getSessionId
         * @return {String} process id for the Diagnostics session.
         */

    }, {
        key: "getSessionId",
        value: function getSessionId() {
            return this._sessionId;
        }
    }]);

    return Diagnostics;
}();

exports.Diagnostics = Diagnostics;


},{"../dictionary":12,"../logger":13,"../types":41}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 */
var Dictionary = exports.Dictionary = function () {
    function Dictionary(init) {
        _classCallCheck(this, Dictionary);

        this._keys = [];
        this._values = [];
        for (var x = 0; x < init.length; x++) {
            this[init[x].key.toString()] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    _createClass(Dictionary, [{
        key: "add",
        value: function add(key, value) {
            this[key.toString()] = value;
            this._keys.push(key);
            this._values.push(value);
        }
    }, {
        key: "remove",
        value: function remove(key) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key.toString()];
        }
    }, {
        key: "keys",
        value: function keys() {
            return this._keys;
        }
    }, {
        key: "values",
        value: function values() {
            return this._values;
        }
    }, {
        key: "containsKey",
        value: function containsKey(key) {
            return typeof this[key.toString()] !== "undefined";
        }
    }, {
        key: "toLookup",
        value: function toLookup() {
            return this;
        }
    }]);

    return Dictionary;
}();


},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
var Logger = exports.Logger = function () {
    function Logger(module) {
        _classCallCheck(this, Logger);

        this.module = module;
    }

    _createClass(Logger, [{
        key: 'debug',
        value: function debug() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            this.log(Logger.LOG_LEVEL.DEBUG, params);
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            this.log(Logger.LOG_LEVEL.ERROR, params);
        }
    }, {
        key: 'info',
        value: function info() {
            for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                params[_key3] = arguments[_key3];
            }

            this.log(Logger.LOG_LEVEL.INFO, params);
        }
    }, {
        key: 'warn',
        value: function warn() {
            for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                params[_key4] = arguments[_key4];
            }

            this.log(Logger.LOG_LEVEL.WARN, params);
        }
    }, {
        key: 'log',
        value: function log(level, params) {
            if (Logger.logLevel >= level) {
                params.unshift('[mcs.' + this.module + ']');
                var method = void 0;
                switch (Logger.logLevel) {
                    case Logger.LOG_LEVEL.ERROR:
                        method = console.error;
                        break;
                    case Logger.LOG_LEVEL.WARN:
                        method = console.warn;
                        break;
                    case Logger.LOG_LEVEL.INFO:
                        method = console.info;
                        break;
                    case Logger.LOG_LEVEL.DEBUG:
                        method = console.debug;
                        break;
                }
                if (Logger.historyEnabled) {
                    Logger.history.push(Object.assign({}, params, { level: level }));
                    if (Logger.historySize <= Logger.history.length) {
                        Logger.history.shift();
                    }
                }
                method.apply(console, params);
            }
        }
    }]);

    return Logger;
}();

Logger.LOG_LEVEL = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
};
Logger.logLevel = Logger.LOG_LEVEL.ERROR;
Logger.historyEnabled = false;
Logger.historySize = 100;
Logger.history = [];


},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MCS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// TODO: uncomment to return cxa analytics
// import {ICxaAnalytics} from "./cxa-analytics/icxa-analytics";


var _utils = require("./utils");

var _logger = require("./logger");

var _analyticsEvent = require("./analytics/analytics-event");

var _storageObject = require("./storage/storage-object");

var _mobileBackend = require("./mobile-backend/mobile-backend");

var _policesMap = require("./polices-map");

var _browserPlatform = require("./platform/browser-platform");

var _cordovaPlatform = require("./platform/cordova-platform");

var _types = require("./types");

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Headers dictionary.
 * The dictionary has lowercase header as a key and a header value as a value.
 * @typedef {Object<string, string>} NetworkResponseHeaders
 */
/**
 * Headers dictionary.
 * The dictionary has header as a key and a header value as a value.
 * @typedef {Object<string, string>} Headers
 */
// TODO: uncomment to restore cxa Analytics
// * @property [analyticsApp] {AnalyticsAppConfig} Configuration for CxA analytics
/**
 * Oracle mobile configuration.
 * @typedef {object} OracleMobileCloudConfig
 * @property [logLevel] {number} Log level for mcs logger. 0 NONE, 1 ERROR, 2 WARN, 3 INFO, 4 DEBUG
 * @property [logHTTP] {boolean} Include http headers and requests in log
 * @property oAuthTokenEndPoint {string} OAuth token endpoint for OAth authentication
 * @property [mobileBackend] {MobileBackendConfig} OAuth token endpoint for OAth authentication
 * @property [sync] {SyncConfig} Configuration for mcs synchronization
 * Can't be combined with syncExpress configuration
 * @property [syncExpress] {SyncExpressConfig} Configuration for sync express
 * Can't be combined with sync configuration
 * @property [disableAnalyticsLocation] {boolean} Disable logging location by legacy analytics
 */
// /**
//  * Oracle CxA analytics configuration.
//  * @typedef {object} AnalyticsAppConfig
//  * @property baseUrl {string} Base url for analytics
//  * @property enableAnalytics {boolean} Switch on/off analytics for this backend
//  * @property appKey {string} Application key
//  * @property authentication {AnalyticsAuthentication} Analytics authentication configuration
//  * @mcs:web
//  */
// /**
//  * Oracle CxA analytics configuration.
//  * @typedef {object} AnalyticsAppConfig
//  * @property baseUrl {string} Base url for analytics
//  * @property enableAnalytics {boolean} Switch on/off analytics for this backend
//  * @property appKey {string} Application key
//  * @property authentication {AnalyticsAuthentication} Analytics authentication configuration
//  * @property notification {AnalyticsNotification} Analytics notification configuration
//  * @mcs:cordova
//  */
// /**
//  * Oracle CxA analytics notifications configuration.
//  * @typedef {object} AnalyticsNotification
//  * @property [profileNameAndroid] {string} Analytics notification profile name for android
//  * @property [profileNameIOS] {string} Analytics notification profile name for ios
//  * @mcs:cordova
//  */
// /**
//  * Oracle analytics authentication configuration.
//  * @typedef {object} AnalyticsAuthentication
//  * @property oauth {OAuthConfig} Analytics notification profile name for android
//  */
//
// /**
//  * CXA Analytics Tracker method optional parameters
//  * @typedef {object} TrackerParams
//  * @property appId {string} Set the application ID using the appId field of the argmap.
//  * This will be attached to every event the tracker fires.
//  * You can set different application IDs on different parts of your site.
//  * You can then distinguish events that occur on different applications
//  * by grouping results based on application_id.
//  * @property [platform] {string} Set the application platform
//  * using the platform field of the argmap.
//  * This will be attached to every event the tracker fires. Its default value is "web".
//  * (Supported platform: web, mob, app)
//  * @property [cookieDomain] {string} If your website spans multiple subdomains e.g.
//  * www.mysite.com
//  * blog.mysite.com
//  * application.mysite.com
//  * You will want to track user behavior across all those subdomains,
//  * rather than within each individually. As a result,
//  * it is important that the domain for your first party cookies is set
//  * to '.mysite.com' rather than 'www.mysite.com'.
//  * By doing so, any values that are stored on the cookie on one of subdomain
//  * will be accessible on all the others.
//  * Set the cookie domain for the tracker instance using the cookieDomain field of the argmap.
//  * If this field is not set, the cookies will not be given a domain.
//  * @property [discoverRootDomain] {boolean} Discover root domain.
//  * @property [cookieName] {string}
//  * Set the cookie name for the tracker instance using the cookieName field of the argmap.
//  * The default is "sp". It uses two cookies, a domain cookie and a session cookie.
//  * In the default case, their names are "_sp_id" and "_sp_ses" respectively.
//  * In production you should provide a new name to prevent clashes with other MIE users on the same page.
//  * @property [encodeBase64] {boolean} By default,
//  * unstructured events and custom contexts are encoded into Base64 to ensure that no data is lost or corrupted.
//  * You can turn encoding on or off using the encodeBase64 field of the argmap.
//  * @property [respectDoNotTrack] {boolean} Most browsers have a Do Not Track option which allows users to express a preference not to be tracked.
//  * You can respect that preference by setting the respectDoNotTrack field of the argmap to true.
//  * This prevents cookies from being sent and events from being fired.
//  * @property [userFingerprint] {boolean} By default, the tracker generates a user fingerprint based on various browser features.
//  * This fingerprint is likely to be unique and so can be used to track anonymous users.
//  * You can turn user fingerprinting off by setting the userFingerprint field of the argmap to false.
//  * @property [userFingerprintSeed] {number} The userFingerprintSeed field of the the argmap lets you choose the hash seed used to generate the user fingerprint.
//  * If this is not specified, the default is 123412414.
//  * @property [pageUnloadTimer] {number} Whenever the Javascript Tracker fires an event,
//  * it automatically starts a 500 millisecond timer running.
//  * If the user clicks on a link or refreshes the page during this period (or, more likely,
//  * if the event was triggered by the user clicking a link),
//  * the page will wait until either the event is sent or the timer is finished before unloading.
//  * 500 milliseconds is usually enough to ensure the event has time to be sent.
//  * You can change the pause length (in milliseconds) using the pageUnloadTimer of the argmap.
//  * The above example completely eliminates the pause.
//  * This does make it unlikely that events triggered by link clicks will be sent.
//  * @property [forceSecureTracker] {boolean} Normally the protocol (http or https) used by the Tracker to send events to a collector is the same as the protocol of the current page.
//  * You can force it to use https by setting the forceSecureTracker field of the argmap to true.
//  * @property [forceUnsecureTracker] {boolean} Normally the protocol (http or https) used by the Tracker to send events to a collector is the same as the protocol of the current page.
//  * You can force it to use http by setting the forceUnsecureTracker field of the argmap to true.
//  * If forceSecureTracker is activated this argument is ignored.
//  * NOTE: This argument should only be used for testing purposes as it creates security vulnerabilities.
//  * @property [sessionCookieTimeout] {number} Whenever an event fires, the Tracker creates a session cookie.
//  * If the cookie didn't previously exist, the Tracker interprets this as the start of a new session.
//  * By default the session cookie expires after 30 minutes.
//  * This means that a user leaving the site and returning in under 30 minutes does not change the session.
//  * You can override this default by setting sessionCookieTimeout to a duration (in seconds) in the argmap.
//  * @property [useLocalStorage] {boolean} By default the Tracker will store events in localStorage before sending them so that they can be recovered if the user leaves the page before they are sent.
//  * You can disable this feature by setting a useLocalStorage: false field in the argmap.
//  */
//
// /**
//  * @callback NotificationsCallback
//  * @param data {object} Notification data
//  */
/**
 * Oracle sync configuration.
 * @typedef {object} SyncConfig
 * @property periodicRefreshPolicy {string} Synchronization periodic refresh policy
 * 'PERIODIC_REFRESH_POLICY_REFRESH_NONE'
 * 'PERIODIC_REFRESH_POLICY_REFRESH_EXPIRED_ITEM_ON_STARTUP'
 * 'PERIODIC_REFRESH_POLICY_PERIODICALLY_REFRESH_EXPIRED_ITEMS'
 * @property policies {PolicesConfig[]} Polices per endpoint
 */
/**
 * Oracle sync express configuration.
 * @typedef {object} SyncExpressConfig
 * @property [handler] {string} Handler type to process requests
 * OracleRestHandler - for oracle rest endpoints
 * GenericRequestHandler - for simple rest endpoints, default value
 * @property policies {PolicesConfig[]} Polices per endpoint
 */
/**
 * Oracle sync policies configuration.
 * @typedef {object} PolicesConfig
 * @property path {string} Path for the endpoint
 * @property fetchPolicy {string} Fetch policy for current path
 * 'FETCH_FROM_CACHE_SCHEDULE_REFRESH'
 * 'FETCH_FROM_SERVICE_IF_ONLINE'
 * 'FETCH_FROM_SERVICE'
 */
/**
 * Oracle mobile backend configuration.
 * @typedef {object} MobileBackendConfig
 * @property baseUrl {string} Base url for the backend and analytics
 * @property name {string} Mobile backend name
 * @property authentication {AuthenticationConfig} Backend authorization's configuration
 */
/**
 * Oracle mobile authentication configuration.
 * @typedef {object} AuthenticationConfig
 * @property [type] {string} Authentication default type: basic, oath, facebook, token
 * @property [basic] {BasicAuthConfig} Basic authentication configuration
 * @property [oauth] {OAuthConfig} OAuth authentication configuration
 * @mcs:web
 */
/**
 * Oracle mobile basic authentication configuration.
 * @typedef {object} BasicAuthConfig
 * @property mobileBackendId {string} Mobile backend identifier
 * @property anonymousKey {string} Anonymous key for anonymous authentication
 */
/**
 * Oracle mobile oauth authentication configuration.
 * @typedef {object} OAuthConfig
 * @property clientId {string} OAuth client identifier
 * @property clientSecret {string} OAuth client secret key
 */
/**
 * Oracle mobile facebook authentication configuration.
 * @typedef {object} FacebookAuthConfig
 * @property appId {string} Facebook application identifier
 * @property anonymousKey {string} Anonymous key for anonymous authentication
 * @property mobileBackendId {string} Mobile backend identifier
 * @property scopes {string} Facebook authentication access types:
 * public_profile,user_friends,email,user_location,user_birthday
 * @mcs:cordova
 */
/**
 * Oracle mobile token exchange authentication configuration.
 * @typedef {object} TokenExchangeAuthConfig
 * @property mobileBackendId {string} Mobile backend identifier
 * @property anonymousKey {string} Anonymous key for anonymous authentication
 * @property clientId {string} OAuth client identifier
 * @property clientSecret {string} OAuth client secret key
 * @mcs:cordova
 */
/**
 * MCS module.
 * @global
 * @namespace mcs
 */
var MCS = function () {
    // TODO: uncomment and to return cxa analytics
    // LinkClickEvent: typeof LinkClickEvent = LinkClickEvent;
    // PageViewEvent: typeof PageViewEvent = PageViewEvent;
    // ScreenViewEvent: typeof ScreenViewEvent = ScreenViewEvent;
    // CustomEvent: typeof CustomEvent = CustomEvent;
    // TransactionEvent: typeof TransactionEvent = TransactionEvent;
    function MCS(cxa, _global) {
        _classCallCheck(this, MCS);

        this.cxa = cxa;
        this._global = _global;
        this._logger = new _logger.Logger('MCS');
        this._utils = new _utils.Utils();
        /**
         * Get list of latest log entries.
         * @return {Array} - last log entries
         * @private
         * @ignore
         */
        this._getLogHistory = function () {
            return _logger.Logger.history;
        };
        /**
         * Represents a mobile backend in Oracle Mobile Cloud Enterprise and provides access to all capabilities of the backend.
         * @name mobileBackend
         * @readonly
         * @type {MobileBackend}
         * @instance
         * @memberOf mcs
         */
        this.mobileBackend = null;
        // TODO: uncomment to return cxa analytics
        // /**
        //  * Returns the CXA Analytics object that enables capture of mobile analytics events.
        //  * @alias cxaAnalytics
        //  * @readonly
        //  * @type {CxaAnalytics}
        //  * @memberOf mcs
        //  * @instance
        //  */
        // cxaAnalytics: ICxaAnalytics = null;
        /**
         * Storage object constructor.
         * Access point to class that represents a storage object resource that can be used to store data.
         * @function
         * @name mcs.StorageObject
         * @memberOf mcs
         * @param storageCollection {StorageCollection}
         * @param [json] {Object} Json storage object representation
         * @returns {StorageObject}
         */
        this.StorageObject = _storageObject.StorageObject;
        /**
         * Log levels enum.
         * @name LOG_LEVEL
         * @enum {number}
         * @memberof mcs
         * @readonly
         * @property {number} NONE 0
         * @property {number} ERROR 1
         * @property {number} WARN 2
         * @property {number} INFO 3
         * @property {number} DEBUG 4
         */
        this.LOG_LEVEL = _logger.Logger.LOG_LEVEL;
        /**
         * Authentication types enum.
         * @name AUTHENTICATION_TYPES
         * @enum {string}
         * @memberof mcs
         * @readonly
         * @instance
         * @property {string} basic 'basic'
         * @property {string} oauth 'oauth'
         * @property {string} facebook 'facebook'
         * @property {string} token 'token'
         */
        this.AUTHENTICATION_TYPES = types.AUTHENTICATION_TYPES;
        // * @deprecated Please use CXA analytics
        /**
         * Analytics event constructor.
         * Creates analytics event.
         * @function
         * @name mcs.AnalyticsEvent
         * @memberOf mcs
         * @param {string} name - event name
         * @type {AnalyticsEvent}
         */
        this.AnalyticsEvent = _analyticsEvent.AnalyticsEvent;
        this._syncExpress = typeof _global.mcs !== 'undefined' ? _global.mcs.sync : null;
    }
    // TODO: uncomment and return to init description to return cxa analytics
    // * @param {function} notificationsCallback -
    // * @param {ITrackerParams} cxaAnalyticsTrackerParams -
    /**
     * Init MCS with configuration
     * @param {IOracleMobileCloudConfig} config - MCS configuration
     * @alias init
     * @memberOf mcs
     */


    _createClass(MCS, [{
        key: "init",
        value: function init(config /*, notificationsCallback?: (data: INotificationData) => void, cxaAnalyticsTrackerParams?: ITrackerParams*/) {
            this._config = Object.assign({
                mcsVersion: '18.2.1.0' // This value replaced by grunt with version from project file
            }, config);
            // set log level
            if (typeof config.logLevel !== 'undefined') {
                _logger.Logger.logLevel = config.logLevel;
            } else {
                _logger.Logger.logLevel = this.LOG_LEVEL.NONE;
            }
            // set internal configuration
            var internalConfig = config;
            this._logger.debug('MCS initialization, version', internalConfig.mcsVersion);
            // enable logs history
            if (typeof internalConfig.logHistoryEnabled !== 'undefined') {
                _logger.Logger.historyEnabled = internalConfig.logHistoryEnabled;
            }
            // set log buffer size
            if (typeof internalConfig.logHistorySize !== 'undefined') {
                _logger.Logger.historySize = internalConfig.logHistorySize;
            }
            // set mcs global
            if (typeof internalConfig.mcsGlobal !== 'undefined' && internalConfig.mcsGlobal) {
                this._global.mcs = Object.assign({}, this._global.mcs, this);
            }
            // init sync express if configuration was provided
            if (!!this._syncExpress) {
                this._initPersistenceConfiguration(config);
            } else if (config.sync || config.syncExpress) {
                this._logger.warn('Sync script was not included on page, switch caching off');
            }
            this._logger.debug(this._utils.isCordova() ? 'Create Cordova platform' : 'Create Browser platform');
            this._platform = this._utils.isCordova() ? new _cordovaPlatform.CordovaPlatform(this._config, this._utils, config.logHTTP) : new _browserPlatform.BrowserPlatform(this._config, this._utils, config.logHTTP);
            if (!!config.mobileBackend) {
                this.mobileBackend = new _mobileBackend.MobileBackend(this._config, this._platform, this._utils, this._syncExpress);
            }
            // Init cxa analytics
            // TODO: uncomment to return cxa analytics
            // if(config.analyticsApp) {
            //   let oAuthTokenEndPoint = (<IAnalyticsAppConfigInternal>config.analyticsApp).oAuthTokenEndPoint || config.oAuthTokenEndPoint;
            //   this.cxaAnalytics = new CxaAnalytics(config.analyticsApp, cxaAnalyticsTrackerParams, notificationsCallback, oAuthTokenEndPoint, this.cxa, this._utils, this._platform);
            // } else {
            //   this._logger.debug('Analytics App switched off');
            // }
        }
    }, {
        key: "_initPersistenceConfiguration",
        value: function _initPersistenceConfiguration(config) {
            var syncExpress = this._syncExpress;
            syncExpress._setLogLevel(config.logLevel);
            var syncConfig = null;
            if (config.sync && config.syncExpress) {
                throw Error('Configuration contains two types synchronisation, please choose one of those types, switch caching off');
            } else if (config.sync) {
                syncConfig = config.sync;
                syncExpress.options.setModule(syncExpress.McsRequestHandler());
            } else if (config.syncExpress) {
                syncConfig = config.syncExpress;
                var isOracleRestHandler = config.syncExpress.handler && config.syncExpress.handler === 'OracleRestHandler';
                syncExpress.options.setModule(isOracleRestHandler ? syncExpress.OracleRestRequestHandler() : syncExpress.GenericRequestHandler());
            } else {
                this._logger.warn('Missing synchronization configuration, switch caching off');
                syncExpress.options.switchOff();
                return;
            }
            syncExpress.options.switchOff(false);
            var persistenceConfig = {
                default: {
                    conflictResolutionPolicy: 'CLIENT_WINS',
                    expirationPolicy: 'NEVER_EXPIRE',
                    expireAfter: 600,
                    evictionPolicy: 'MANUAL_EVICTION',
                    fetchPolicy: 'FETCH_FROM_SERVICE_IF_ONLINE',
                    updatePolicy: 'QUEUE_IF_OFFLINE',
                    noCache: false
                },
                periodicRefreshInterval: syncConfig.backgroundRefreshPolicy || 120,
                policies: [],
                periodicRefreshPolicy: null
            };
            var mcsPolicies = syncConfig.policies;
            for (var idx in mcsPolicies) {
                if (mcsPolicies.hasOwnProperty(idx)) {
                    var policy = mcsPolicies[idx];
                    if (policy) {
                        persistenceConfig.policies.push(this._getPersistencePolicy(policy));
                    } else {
                        this._logger.error('The ' + policy + 'policy was not found in accepted policies.');
                    }
                }
            }
            syncExpress.options.setPolicies(persistenceConfig);
            // default sync library settings
            syncExpress.options.dbFirst = false;
            // fast fix for 404 bug
            syncExpress.options.setMaxSyncAttempts(1);
            syncExpress.options.setAutoRemoveAfterReachMaxAttempts(true);
            // sync.options.syncTimeOut = 3000;
            // sync.options.autoSync = true;
            // TODO: for next release, add database prefix per user
            //sync.options.dbPrefix = 'mcs';
        }
    }, {
        key: "_getPersistencePolicy",
        value: function _getPersistencePolicy(mcsPolicy) {
            var policy = { path: mcsPolicy.path };
            for (var prop in mcsPolicy) {
                if (mcsPolicy.hasOwnProperty(prop) && prop !== 'path') {
                    var persMap = _policesMap.POLICIES_MAP[prop];
                    if (!persMap) {
                        this._logger.error('The ' + prop + ' policy was not found in accepted policies.');
                    } else if (persMap[mcsPolicy[prop]] === undefined) {
                        this._logger.error('The ' + prop + ' policy value ' + mcsPolicy[prop] + ' was not found in accepted policy values.');
                    } else {
                        policy[persMap.persistencePropertyName] = persMap[mcsPolicy[prop]];
                    }
                }
            }
            return policy;
        }
    }]);

    return MCS;
}();

if (typeof exportMCS !== 'undefined') {
    exportMCS = function exportMCS(_module, _exports, _define, _window, _global, _self, _this, cxa) {
        var glob = void 0;
        if (typeof _window !== "undefined") {
            glob = _window;
        } else if (typeof _global !== "undefined") {
            glob = _global;
        } else if (typeof _self !== "undefined") {
            glob = _self;
        } else {
            glob = _this;
        }
        var mcs = new MCS(cxa, glob);
        if ((typeof _exports === "undefined" ? "undefined" : _typeof(_exports)) === "object" && typeof _module !== "undefined") {
            _module.exports = mcs;
        } else if (typeof _define === "function" && _define.amd) {
            _define([], mcs);
        } else {
            glob.mcs = mcs;
        }
    };
}
exports.MCS = MCS;


},{"./analytics/analytics-event":1,"./logger":13,"./mobile-backend/mobile-backend":15,"./platform/browser-platform":17,"./platform/cordova-platform":18,"./polices-map":20,"./storage/storage-object":24,"./types":41,"./utils":42}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MobileBackend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("../logger");

var _diagnostics = require("../diagnostics/diagnostics");

var _customCode = require("../custom-code/custom-code");

var _analytics = require("../analytics/analytics");

var _notifications = require("../notifications/notifications");

var _basicAuthorization = require("../authorization/basic-authorization");

var _oauthAuthorization = require("../authorization/oauth-authorization");

var _facebookAuthorization = require("../authorization/facebook-authorization");

var _externalTokenExchangeAuthorization = require("../authorization/external-token-exchange-authorization");

var _synchronization = require("../sync/synchronization");

var _storage = require("../storage/storage");

var _types = require("../types");

var _dictionary = require("../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Represents a mobile backend in Oracle Mobile Cloud Enterprise
 * and provides access to all capabilities of the backend.
 * Callers should use [mcs's mobileBackend]{@link mcs#mobileBackend} property...
 * @class
 * @global
 * @hideconstructor
 * @mcs:web
 */
var MobileBackend = function () {
    /**
     * Creates mobile backend object.
     * @protected
     * @param config {IOracleMobileCloudConfigInternal}
     * @param platform {IPlatform}
     * @param utils {IUtils}
     * @param syncExpress {ISyncExpressInternal}
     * @private
     */
    function MobileBackend(config, platform, utils, syncExpress) {
        _classCallCheck(this, MobileBackend);

        this.config = config;
        this.platform = platform;
        this.utils = utils;
        this.syncExpress = syncExpress;
        this.PLATFORM_PATH = 'mobile/platform';
        this.CUSTOM_CODE_PATH = 'mobile/custom';
        this.authenticationType = null;
        this.logger = new _logger.Logger('MobileBackend');
        /**
         * The name of the MobileBackend as read from the configuration.
         * @type {string}
         * @name MobileBackend#name
         * @readonly
         */
        this.name = null;
        /**
         * Returns the Authorization object used to authorize a mobile user
         * against Oracle Mobile Cloud Enterprise.
         * Please use {@link mcs#mobileBackend#setAuthenticationType} to initialize this property.<br/>
         * @readonly
         * @type {Authorization}
         * @name MobileBackend#authorization
         */
        this.authorization = null;
        /**
         * Returns the Diagnostics object that enables end-end debugging across application and cloud.
         * @readonly
         * @type {Diagnostics}
         * @name MobileBackend#diagnostics
         */
        this.diagnostics = null;
        /**
         * Returns the CustomCode object that enables calls to custom APIs.
         * @readonly
         * @type {CustomCode}
         * @name MobileBackend#customCode
         */
        this.customCode = null;
        // TODO: Uncomment to return CxA Analytics
        // * @deprecated Please use CXA Analytics by [mcs's cxaAnalytics property]{mcs#cxaAnalytics}
        /**
         * Returns the Analytics object that enables capture of mobile analytics events.
         * @readonly
         * @type {Analytics}
         * @name MobileBackend#analytics
         */
        this.analytics = null;
        /**
         * Returns the Storage object that provides cloud-based object storage capabilities.
         * @readonly
         * @type {Storage}
         * @name MobileBackend#storage
         */
        this.storage = null;
        /**
         * Returns the Synchronization object that provides caching and synchronization capabilities.
         * @readonly
         * @type {Synchronization}
         * @name MobileBackend#synchronization
         */
        this.synchronization = null;
        /**
         * Returns an instance of the application configuration object.
         * Callers can download the configuration from the service by invoking loadAppConfig().
         * @readonly
         * @type {object}
         * @name MobileBackend#appConfig
         */
        this.appConfig = {};
        /**
         * Returns the Notifications object that provides notification capabilities.
         * @readonly
         * @type {Notifications}
         * @name MobileBackend#notifications
         * @mcs:cordova
         */
        this.notifications = null;
        this._mbeConfig = config.mobileBackend;
        this.name = this._mbeConfig.name;
        this.diagnostics = new _diagnostics.Diagnostics(platform, utils);
        this.customCode = new _customCode.CustomCode(this, utils, platform);
        this.analytics = new _analytics.Analytics(this, platform, utils);
        this.storage = new _storage.Storage(this, utils, platform);
        this._baseUrl = utils.validateConfiguration(this._mbeConfig.baseUrl);
        if (syncExpress) {
            this.synchronization = new _synchronization.Synchronization(this, config.sync, utils, platform, syncExpress.common, syncExpress.options, syncExpress.process);
        }
        if (typeof cordova !== 'undefined') {
            this.notifications = new _notifications.Notifications(this, platform, navigator);
        }
        if (this._mbeConfig.authentication.type) {
            this.setAuthenticationType(this._mbeConfig.authentication.type);
        }
    }
    /**
     * Constructs a full URL by pre-pending the prefix for platform API REST endpoints
     * to the given endpoint path.
     * @function
     * @name MobileBackend#getPlatformUrl
     * @param path {string} The relative path of the endpoint following the platform prefix,
     * i.e. /mobile/platform.
     * @returns {string} The full URL.
     */


    _createClass(MobileBackend, [{
        key: "getPlatformUrl",
        value: function getPlatformUrl(path) {
            var url = this._baseUrl;
            // dev instance hack, replace port ends with 1 with 7777
            if (this.authenticationType == 'ssoAuth' && this.utils.strEndsWith(this._baseUrl, '1')) {
                url = url.substring(0, url.length - 4) + '7777';
            }
            url = this.utils.validateConfiguration(url) + '/' + this.PLATFORM_PATH;
            if (!this.utils.strEndsWith(url, '/')) {
                url += '/';
            }
            return url + path;
        }
    }, {
        key: "getCustomCodeUrl",

        /**
         * Constructs a full URL by prepending the prefix for custom API REST endpoints
         * to the given endpoint path.
         * @function
         * @name MobileBackend#getCustomCodeUrl
         * @param path {string} The relative path of the endpoint following the platform prefix,
         * i.e. {BaseUrl}/mobile/custom.
         * @returns {string} The full URL.
         */
        value: function getCustomCodeUrl(path) {
            return this.utils.validateConfiguration(this._baseUrl) + this._getCustomCodeUri(path);
        }
    }, {
        key: "getHttpHeaders",

        /**
         * Populates auth and diagnostics HTTP headers for making REST calls to a mobile backend.
         * @function
         * @name MobileBackend#getHttpHeaders
         * @param [headers] {Headers} An optional object with which to populate with the headers.
         * @returns {Headers} The headers parameter that is passed in.
         * If not provided, a new object with the populated headers
         * as properties of that object is created.
         */
        value: function getHttpHeaders() {
            var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _dictionary.Dictionary([]);

            var authorization = this.authorization;
            headers = this.diagnostics._getHttpHeaders(headers);
            if (authorization) {
                if (authorization._getIsAuthorized() && authorization._getIsAnonymous()) {
                    headers = authorization._getAnonymousHttpHeaders(headers);
                } else {
                    headers = authorization._getHttpHeaders(headers);
                }
            }
            return headers;
        }
        /**
         * Use this method to retrieve current authentication type.
         * @function
         * @name MobileBackend#getAuthenticationType
         * @return {string} Authentication type
         */

    }, {
        key: "getAuthenticationType",
        value: function getAuthenticationType() {
            return this.authenticationType;
        }
    }, {
        key: "setAuthenticationType",

        /**
         * Initialize and returns the Authorization object
         * that provides authorization capabilities and access to user properties.
         * @function
         * @name MobileBackend#setAuthenticationType
         * @param {string} type
         * For [Basic authentication]{@link BasicAuthorization},
         * you would specify "basic" to use the Basic Authentication security schema.<br/>
         * For [OAuth authentication]{@link OAuthAuthorization},
         * you would specify "oauth" to use OAuth Authentication security schema.<br/>
         * @return {Authorization}
         * @throws When unrecognized authentication type provided,
         * this method will throw an Exception stating that the type of Authentication that you provided
         * is not supported at this time.
         * @example <caption>Example usage of mobileBackend.setAuthenticationType()</caption>
         * // Basic Authorization schema
         * mcs.mobileBackend.setAuthenticationType('basic');
         * @example // OAuth Authorization schema
         * mcs.mobileBackend.setAuthenticationType('oauth');
         */
        value: function setAuthenticationType(type) {
            var authType = this.utils.validateConfiguration(type);
            this.authorization = null;
            if (!_types.AUTHENTICATION_TYPES.hasOwnProperty(authType)) {
                throw Error('Wrong Authentication type: ' + type + ', please use one of: \n' + _types.AUTHENTICATION_TYPES.basic + '\n' + _types.AUTHENTICATION_TYPES.oauth + '\n' + _types.AUTHENTICATION_TYPES.facebook + '\n' + _types.AUTHENTICATION_TYPES.token);
            }
            if (!this._mbeConfig.authentication.hasOwnProperty(authType)) {
                throw Error('No Authentication Type called ' + type + ' is defined in configuration \n' + 'check configuration in authorization object for the following objects:\n' + _types.AUTHENTICATION_TYPES.basic + '\n' + _types.AUTHENTICATION_TYPES.oauth + '\n' + _types.AUTHENTICATION_TYPES.facebook + '\n' + _types.AUTHENTICATION_TYPES.token);
            }
            if (this.authorization && this.authorization._getIsAuthorized()) {
                this.authorization.logout();
            }
            if (authType === _types.AUTHENTICATION_TYPES.basic) {
                this.authorization = new _basicAuthorization.BasicAuthorization(this._mbeConfig.authentication.basic, this, this.utils, this.platform);
                this.logger.info('Your Authentication type: ' + authType);
                this.authenticationType = authType;
            } else if (authType === _types.AUTHENTICATION_TYPES.oauth) {
                this.authorization = new _oauthAuthorization.OAuthAuthorization(this.config.oAuthTokenEndPoint, this._mbeConfig.authentication.oauth, this, this._mbeConfig.tenantId, this.utils, this.platform);
                this.logger.info('Your Authentication type: ' + authType);
                this.authenticationType = authType;
            } else if (authType === _types.AUTHENTICATION_TYPES.facebook) {
                this.authorization = new _facebookAuthorization.FacebookAuthorization(this._mbeConfig.authentication.facebook, this, this.utils, this.platform);
                this.logger.info('Your Authentication type: ' + authType);
                this.authenticationType = authType;
            } else if (authType === _types.AUTHENTICATION_TYPES.token) {
                this.authorization = new _externalTokenExchangeAuthorization.ExternalTokenExchangeAuthorization(this._mbeConfig.authentication.token, this, this.utils, this.platform);
                this.logger.info('Your Authentication type: ' + authType);
                this.authenticationType = authType;
            }
            return this.authorization;
        }
    }, {
        key: "loadAppConfig",

        /**
         * Downloads the configuration from the service.
         * The AppConfig property will contain the downloaded configuration.
         * @function
         * @memberOf MobileBackend
         * @name MobileBackend#loadAppConfig
         * @return {Promise<NetworkResponse>}
         */
        value: function loadAppConfig() {
            var headers = this.getHttpHeaders();
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
            if (!this.authorization._getIsAuthorized()) {
                headers = this.authorization._getAnonymousAuthorizationHeaders(headers);
            }
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.GET,
                url: this.getPlatformUrl('appconfig/client'),
                headers: headers,
                module: _types.MODULE_NAMES.APP_CONFIG
            }).catch(invokeServiceFail.bind(this));
            function invokeServiceFail(response) {
                this.logger.error('App config download failed! with status code: ' + response.statusCode);
                return Promise.reject(response);
            }
        }
    }, {
        key: "_getCustomCodeUri",

        // private methods
        value: function _getCustomCodeUri(path) {
            var url = '/' + this.CUSTOM_CODE_PATH;
            if (this.utils.strEndsWith(path, '/')) {
                path = path.slice(0, -1);
            }
            return url + '/' + path;
        }
    }]);

    return MobileBackend;
}();

exports.MobileBackend = MobileBackend;


},{"../analytics/analytics":2,"../authorization/basic-authorization":4,"../authorization/external-token-exchange-authorization":5,"../authorization/facebook-authorization":6,"../authorization/oauth-authorization":8,"../custom-code/custom-code":10,"../diagnostics/diagnostics":11,"../dictionary":12,"../logger":13,"../notifications/notifications":16,"../storage/storage":25,"../sync/synchronization":40,"../types":41}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Notifications = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("../logger");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that provides notification capabilities. Callers should use
 * MobileBackend's [notifications]{@link MobileBackend#notifications} property.
 * @class
 * @hideconstructor
 * @global
 */
var Notifications = function () {
    function Notifications(backend, platform, navigator) {
        _classCallCheck(this, Notifications);

        this.backend = backend;
        this.platform = platform;
        this.navigator = navigator;
        this.logger = new _logger.Logger('Notifications');
    }
    /**
     * Get device platform.
     * Returns a string with device information used by [Notifications]{@link Notifications}
     * @function
     * @name Notifications#getDevicePlatform
     * @returns {String} The device specific information for platform.
     * @example : 'IOS', 'ANDROID'
     */


    _createClass(Notifications, [{
        key: "getDevicePlatform",
        value: function getDevicePlatform() {
            var platform = void 0;
            if (this.navigator.userAgent.match(/Android/i)) {
                platform = _types.PLATFORM_ID.ANDROID;
            } else if (this.navigator.userAgent.match(/iPad/i) || this.navigator.userAgent.match(/iPod/i) || this.navigator.userAgent.match(/iPhone/i)) {
                platform = _types.PLATFORM_ID.IOS;
            }
            return platform.toUpperCase();
        }
    }, {
        key: "registerForNotifications",

        /**
         * Register for notifications.
         * Registers the current Cordova app running on the device for receiving push notifications.
         * @function
         * @name Notifications#registerForNotifications
         * @param deviceToken {String} Platform-specific device token.
         * @param packageName {String} Platform-specific application reverse domain identifier.
         * @param appVersion {String} Platform-specific application version.
         * @param notificationProvider {String} The provider to register, posible values: 'APNS', 'FCM', 'WNS', 'SYNIVERSE'.
         * @return {Promise<NetworkResponse>}
         *
         * @example <caption>Example usage of mcs.mobileBackend.notifications.registerForNotifications()</caption>
         * mcs.mobileBackend
         *    .notifications
         *    .registerForNotifications('YOUR_DEVICE_TOKEN', 'com.yourcompany.project', '1.0.0', 'GCM')
         *    .then(registerSuccess)
         *    .catch(registerError);
         *
         * function registerSuccess(response){
         *    console.log(response);
         * }
         *
         * function registerError(response){
         *    console.error(response);
         * }
         */
        value: function registerForNotifications(deviceToken, packageName, appVersion, notificationProvider) {
            if (!(notificationProvider in _types.NOTIFICATION_PROVIDER)) {
                throw Error('No Notification Provider Type called ' + notificationProvider + '\n' + 'please use one of those types\n' + _types.NOTIFICATION_PROVIDER.APNS + '\n' + _types.NOTIFICATION_PROVIDER.FCM + '\n' + _types.NOTIFICATION_PROVIDER.WNS + '\n' + _types.NOTIFICATION_PROVIDER.SYNIVERSE);
            }
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
            var platform = typeof device === "undefined" ? this.getDevicePlatform() : device.platform.toUpperCase();
            var payload = {
                notificationToken: deviceToken,
                notificationProvider: notificationProvider,
                mobileClient: {
                    id: packageName,
                    version: appVersion,
                    platform: platform
                }
            };
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.POST,
                url: this.backend.getPlatformUrl('devices/register'),
                headers: headers,
                data: JSON.stringify(payload),
                module: _types.MODULE_NAMES.NOTIFICATIONS
            }).then(invokeServiceSuccess.bind(this)).catch(invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this.logger.info('Device registered for push notifications.', response.statusCode);
                return response;
            }
            function invokeServiceError(response) {
                this.logger.error('Device registration for push notifications failed!', response);
                return Promise.reject(response);
            }
        }
    }, {
        key: "deregisterForNotifications",

        /**
         * Deregister from notifications.
         * Deregisters the current Cordova app running on the device for receiving push notifications.
         * @function
         * @name Notifications#deregisterForNotifications
         * @param deviceToken {String} Platform-specific success callback token.
         * @param packageName {String} Platform-specific application reverse domain identifier.
         * @return {Promise<NetworkResponse>}
         *
         * @example <caption>Example usage of mcs.mobileBackend.notifications.deregisterForNotifications()</caption>
         * mcs.mobileBackend
         *   .notifications
         *    .deregisterForNotifications('YOUR_DEVICE_TOKEN', 'com.yourcompany.project', '1.0.0')
         *    .then(deregisterSuccess)
         *    .catch(deregisterError);
         *
         * function deregisterSuccess(response){
         *   console.log(response);
         * }
         *
         * function deregisterError(response){
         *    console.log(response);
         * }
         */
        value: function deregisterForNotifications(deviceToken, packageName) {
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
            var payload = {
                notificationToken: deviceToken,
                mobileClient: {
                    id: packageName,
                    platform: typeof device == 'undefined' ? this.getDevicePlatform() : device.platform.toUpperCase()
                }
            };
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.POST,
                url: this.backend.getPlatformUrl('devices/deregister'),
                headers: headers,
                data: JSON.stringify(payload),
                module: _types.MODULE_NAMES.NOTIFICATIONS
            }).then(invokeServiceSuccess.bind(this)).catch(invokeServiceError.bind(this));
            function invokeServiceSuccess(response) {
                this.logger.info('Device deregistered for push notifications succeeded.', response.statusCode);
                return response;
            }
            function invokeServiceError(response) {
                this.logger.error('Device deregistration for push notifications failed!', response);
                return Promise.reject(response);
            }
        }
    }]);

    return Notifications;
}();

exports.Notifications = Notifications;


},{"../logger":13,"../types":41}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrowserPlatform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _platform = require("./platform");

var _logger = require("../logger");

var _networkResponse = require("../responses/network-response");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Platform class for browser applications.
 * @private
 * @extends Platform
 * @global
 */
var BrowserPlatform = function (_Platform) {
    _inherits(BrowserPlatform, _Platform);

    function BrowserPlatform(config, utils) {
        var logHTTP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, BrowserPlatform);

        var _this = _possibleConstructorReturn(this, (BrowserPlatform.__proto__ || Object.getPrototypeOf(BrowserPlatform)).call(this, utils));

        _this.config = config;
        _this.logHTTP = logHTTP;
        _this.queryRegex = /\?/;
        _this.logger = new _logger.Logger('BrowserPlatform');
        _this.isBrowser = true;
        _this.isCordova = false;
        return _this;
    }

    _createClass(BrowserPlatform, [{
        key: "invokeService",
        value: function invokeService(request) {
            var url = request.url;
            if (this.isBrowser) {
                url = url + (this.queryRegex.test(url) ? "&" : "?") + "_=" + new Date().getTime();
            }
            return new Promise(invoke.bind(this));
            function invoke(resolve, reject) {
                var _this2 = this;

                var xhr = new XMLHttpRequest();
                xhr.open(request.method, url);
                for (var key in request.headers) {
                    if (request.headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, request.headers[key]);
                    }
                }
                xhr.setRequestHeader(_types.HEADERS.ORACLE_MOBILE_CLIENT_SDK_INFO, this._getClientSDKInfoHeader(request.module));
                xhr.withCredentials = request.hasOwnProperty('withCredentials') && typeof request.withCredentials === 'boolean' ? request.withCredentials : true;
                xhr.responseType = request.responseType || _types.XML_HTTP_REQUEST_RESPONSE_TYPE.JSON;
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var response = xhr.responseType == '' || xhr.responseType == 'text' ? xhr.responseText : xhr.response;
                        var headers = xhr['responseHeaders'] ? _this2.utils.normalizeHeaderKeys(xhr['responseHeaders']) : _this2.utils.parseHeaders(xhr.getAllResponseHeaders());
                        var netResponse = new _networkResponse.NetworkResponse(xhr.status, response, headers);
                        // log response
                        if (_this2.logHTTP) {
                            var object = {
                                headers: headers,
                                body: response
                            };
                            _this2.logger.debug('Received ' + request.method + ' response from ' + request.url, object);
                        }
                        if (xhr.status >= 200 && xhr.status <= 299) {
                            resolve(netResponse);
                        } else {
                            reject(netResponse);
                        }
                    }
                };
                xhr.send(request.data);
                // log request
                if (this.logHTTP) {
                    var object = {
                        headers: request.headers,
                        body: request.data
                    };
                    this.logger.debug('Sent ' + request.method + ' request to ' + request.url, object);
                }
            }
        }
    }, {
        key: "_getClientSDKInfoHeader",
        value: function _getClientSDKInfoHeader(module) {
            var infoHeader = this.isCordova ? _types.PLATFORM_NAMES.CORDOVA : _types.PLATFORM_NAMES.JAVASCRIPT;
            infoHeader += ' ' + (this.config.mcsVersion || 'Unknown');
            infoHeader += ' [' + module + ']';
            return infoHeader;
        }
    }]);

    return BrowserPlatform;
}(_platform.Platform);

exports.BrowserPlatform = BrowserPlatform;


},{"../logger":13,"../responses/network-response":21,"../types":41,"./platform":19}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CordovaPlatform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserPlatform = require("./browser-platform");

var _logger = require("../logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//
// Needs to have console, geolocation, PushPlugin, sqlite-storage and device plugins to be installed.
//
/**
 * Platform class for Cordova applications.
 * @private
 * @extends BrowserPlatform
 * @global
 */
var CordovaPlatform = function (_BrowserPlatform) {
    _inherits(CordovaPlatform, _BrowserPlatform);

    function CordovaPlatform(config, utils) {
        var logHTTP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, CordovaPlatform);

        var _this = _possibleConstructorReturn(this, (CordovaPlatform.__proto__ || Object.getPrototypeOf(CordovaPlatform)).call(this, config, utils, logHTTP));

        _this.ANDROID_OS_NAME = 'Android';
        _this.IOS_OS_NAME = 'iOS';
        _this.latitude = null;
        _this.longitude = null;
        _this.logger = new _logger.Logger('CordovaPlatform');
        _this.isBrowser = false;
        _this.isCordova = true;
        var self = _this;
        if (!!navigator && !!navigator.geolocation && navigator.geolocation.watchPosition) {
            navigator.geolocation.watchPosition(function (position) {
                self.latitude = position.coords.latitude + '';
                self.longitude = position.coords.longitude + '';
            });
        }
        return _this;
    }
    /**
     * Overrides [Platform.getGPSLocation()]{@link Platform#getGPSLocation}
     * @override
     * @function
     * @name CordovaPlatform#getGPSLocation
     */


    _createClass(CordovaPlatform, [{
        key: "getGPSLocation",
        value: function getGPSLocation() {
            return {
                latitude: this.latitude,
                longitude: this.longitude
            };
        }
        /**
         * Checks the current state of the device. Platform implementations should call this function
         * when the state changes. The state is inspected before background operations
         * like synchronization are performed.
         * Cordova Network Information Plugin MUST be installed for this function to operate.
         * `cordova plugin add cordova-plugin-network-information`
         * @function
         * @name CordovaPlatform#checkConnection
         */

    }, {
        key: "checkConnection",
        value: function checkConnection() {
            var networkState = navigator['connection'].type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            this.logger.info('Connection type: ' + states[networkState]);
            return states[networkState];
        }
    }, {
        key: "getDeviceInformation",

        /**
         * Returns device information.
         *
         * @function
         * @name CordovaPlatform#getDeviceInformation
         @return Returns an object of variables used to return device specific information like:
            @return model: Nexus One returns "Passion", Motorola Droid  returns "voles", etc.
         *
         @return manufacturer: Returns the manufacturer name:
         *
         * Samsung
         * LG
         * Motorola
         * Micosoft
         * Sony
         * Apple
         *
         @return OS Name: Depending on the device, a few examples are:
         * "Android"
         * "BlackBerry 10"
         * Browser:         returns "MacIntel" on Mac
         *                  returns "Win32" on Windows
         * "iOS"
         * "WinCE"
         * "Tizen"
         *
         @return OS Version: Depending on the device, a few examples are:
         * Android:    Froyo OS would return "2.2"
         Eclair OS would return "2.1", "2.0.1", or "2.0"
         Version can also return update level "2.1-update1"
            * BlackBerry: Torch 9800 using OS 6.0 would return "6.0.0.600"
         *
         * Browser:    Returns version number for the browser
            * iPhone:     iOS 3.2 returns "3.2"
         * Windows Phone 7: returns current OS version number, ex. on Mango returns 7.10.7720
         * Tizen: returns "TIZEN_20120425_2"
         *
         @return OS Build: Get the version of Cordova running on the device.
         * Overrides [Platform.getDeviceInformation()]{@link Platform#getDeviceInformation}
         * @override
         */
        value: function getDeviceInformation() {
            if (typeof device === 'undefined') {
                return {
                    'model': '<unknown>',
                    'manufacturer': '<unknown>',
                    'osName': '<unknown>',
                    'osVersion': '<unknown>',
                    'osBuild': '<unknown>',
                    'carrier': '<unknown>'
                };
            } else {
                return {
                    'model': device.model,
                    'manufacturer': device.manufacturer,
                    'osName': device.platform,
                    'osVersion': device.version,
                    'osBuild': 'cordova ' + device.cordova,
                    'carrier': '<unknown>'
                };
            }
        }
    }]);

    return CordovaPlatform;
}(_browserPlatform.BrowserPlatform);

exports.CordovaPlatform = CordovaPlatform;


},{"../logger":13,"./browser-platform":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Platform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require('../logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for platform-specific capabilities. Users may derive from this class to
 * provide implementations specific to their platform.
 * @private
 * @abstract
 * @global
 */
var Platform = function () {
    function Platform(utils) {
        _classCallCheck(this, Platform);

        this.utils = utils;
        this.deviceState = typeof deviceState !== 'undefined' ? deviceState.unrestricted : null;
        this.deviceStateChangedCallbacks = [];
        this.ANDROID_OS_NAME = '';
        this.IOS_OS_NAME = '';
        this.logger = new _logger.Logger('Platform');
        this.deviceId = utils.uuid();
    }
    /**
     * Returns a device ID used by [Diagnostics]{@link Diagnostics}.
     * @returns {String} The device ID.
     */


    _createClass(Platform, [{
        key: 'getDeviceId',
        value: function getDeviceId() {
            return this.deviceId;
        }
        /**
         * Sets the current state of the device. Platform implementations should call this function
         * when the state changes. The state is inspected before background operations
         * like synchronization are performed.
         * @param state {mcs.deviceState} The new state of the device.
         */

    }, {
        key: 'setDeviceState',
        value: function setDeviceState(state) {
            if (this.deviceState != state) {
                this.logger.info("Device state changing from " + this.deviceState + " to " + state);
                this.deviceState = state;
                for (var i = 0; i < this.deviceStateChangedCallbacks.length; i++) {
                    this.deviceStateChangedCallbacks[i](this.deviceState);
                }
            }
        }
        /**
         * Class that provides the current GPS location of the device.
         * @typedef {Object} Platform.GPSLocation
         * @property {String} latitude - The device's current latitude.
         * @property {String} longitude - The device's current longitude.
         */
        /**
         * Returns an object that has the current GPS location of the device or null.
         * @returns {Platform~GPSLocation} The GPS location is available.
         */

    }, {
        key: 'getGPSLocation',
        value: function getGPSLocation() {
            return {
                latitude: null,
                longitude: null
            };
        }
        /**
         * Class that provides information about the device.
         * @typedef {Object} Platform.DeviceInformation
         * @property {String} model - The device's model.
         * @property {String} manufacturer - The device's manufacturer.
         * @property {String} osName - The operating system.
         * @property {String} osVersion - The operating system's version.
         * @property {String} osBuild - The operating system's build number.
         * @property {String} carrier - The device's wireless carrier.
         */
        /**
         * Returns an object with device information used by [Analytics]{@link Analytics}
         * @returns {Platform~DeviceInformation} The device specific information.
         */

    }, {
        key: 'getDeviceInformation',
        value: function getDeviceInformation() {
            return {
                "model": "<unknown>",
                "manufacturer": "<unknown>",
                "osName": "<unknown>",
                "osVersion": "<unknown>",
                "osBuild": "<unknown>",
                "carrier": "<unknown>"
            };
        }
    }]);

    return Platform;
}();

exports.Platform = Platform;


},{"../logger":13}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 * @ignore
 */
var POLICIES_MAP = exports.POLICIES_MAP = {
    // mcs key
    fetchPolicy: {
        persistencePropertyName: 'fetchPolicy',
        FETCH_FROM_CACHE_SCHEDULE_REFRESH: 'FETCH_FROM_CACHE_SCHEDULE_REFRESH',
        FETCH_FROM_SERVICE_IF_ONLINE: 'FETCH_FROM_SERVICE_IF_ONLINE',
        FETCH_FROM_CACHE: 'FETCH_FROM_CACHE',
        FETCH_FROM_SERVICE: 'FETCH_FROM_SERVICE',
        FETCH_FROM_SERVICE_ON_CACHE_MISS: 'FETCH_FROM_SERVICE_ON_CACHE_MISS',
        FETCH_FROM_SERVICE_ON_CACHE_MISS_OR_EXPIRY: 'FETCH_FROM_SERVICE_ON_CACHE_MISS_OR_EXPIRY',
        FETCH_WITH_REFRESH: 'FETCH_WITH_REFRESH'
    },
    evictionPolicy: {
        persistencePropertyName: 'evictionPolicy',
        EVICT_ON_EXPIRY_AT_STARTUP: 'EVICT_ON_EXPIRY_AT_STARTUP',
        MANUAL_EVICTION: 'MANUAL_EVICTION'
    },
    expirationPolicy: {
        persistencePropertyName: 'expirationPolicy',
        EXPIRE_ON_RESTART: 'EXPIRE_ON_RESTART',
        EXPIRE_AFTER: 'EXPIRE_AFTER',
        NEVER_EXPIRE: 'NEVER_EXPIRE'
    },
    updatePolicy: {
        persistencePropertyName: 'updatePolicy',
        QUEUE_IF_OFFLINE: 'QUEUE_IF_OFFLINE',
        UPDATE_IF_ONLINE: 'UPDATE_IF_ONLINE'
    },
    refreshPolicy: {
        persistencePropertyName: 'refreshPolicy',
        PeriodicallyRefreshExpiredResource: ''
    },
    conflictResolutionPolicy: {
        persistencePropertyName: 'conflictResolutionPolicy',
        SERVER_WINS: 'SERVER_WINS',
        PRESERVE_CONFLICT: 'PRESERVE_CONFLICT',
        CLIENT_WINS: 'CLIENT_WINS'
    },
    noCache: {
        persistencePropertyName: 'noCache',
        'false': false,
        'true': true
    }
};


},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * Created by Yuri Panshin on 2016-08-26.
 */
/**
 * @classdesc Class that provides network response details.
 * @class
 * @global
 * @hideconstructor
 */
var NetworkResponse = function NetworkResponse(statusCode, data, headers) {
  _classCallCheck(this, NetworkResponse);

  /**
   * The network status code.
   * @type {Number}
   * @readonly
   * @name NetworkResponse#statusCode
   */
  this.statusCode = 0;
  /**
   * The error data.
   * @type {Object}
   * @readonly
   * @name NetworkResponse#data
   */
  this.data = null;
  this.statusCode = statusCode;
  this.data = data;
  this.headers = headers;
};

exports.NetworkResponse = NetworkResponse;


},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * Created by Yuri Panshin on 2016-08-26.
 */
/**
 * @classdesc Class that provides network storage object details.
 * @class
 * @global
 * @hideconstructor
 */
var NetworkStorageObject = function NetworkStorageObject(statusCode, storageObject) {
  _classCallCheck(this, NetworkStorageObject);

  /**
   * The network status code.
   * @type {Number}
   * @readonly
   * @name NetworkStorageObject#statusCode
   */
  this.statusCode = 0;
  /**
   * The error data.
   * @type {StorageObject}
   * @readonly
   * @name NetworkStorageObject#storageObject
   */
  this.storageObject = null;
  this.statusCode = statusCode;
  this.storageObject = storageObject;
};

exports.NetworkStorageObject = NetworkStorageObject;


},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _storageObject = require("./storage-object");

var _networkStorageObject = require("../responses/network-storage-object");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that holds the StorageCollection resource. StorageCollections contain Storage objects
 * which can be used to persist data in Oracle Mobile Cloud Enterprise.
 * @class
 * @global
 * @hideconstructor
 */
var StorageCollection = function () {
    function StorageCollection(name, userId, userIsolated, backend, utils, logger, platform) {
        _classCallCheck(this, StorageCollection);

        this.userIsolated = userIsolated;
        this.backend = backend;
        this.utils = utils;
        this.logger = logger;
        this.platform = platform;
        this.storage = backend.storage;
        this.userId = utils.validateConfiguration(userId);
        this.id = utils.validateConfiguration(name);
    }
    /**
     * The description of the StorageCollection.
     * @type {String}
     * @name StorageCollection#description
     * @deprecated Will be deleted in next version. Use {@link StorageCollection#getDescription} instead.
     */


    _createClass(StorageCollection, [{
        key: "getStorage",

        /**
         * Returns storage object for current storage collection.
         *
         * @function
         * @name StorageCollection#getStorage
         * @return storage object data for current storage collection.
         */
        value: function getStorage() {
            return this.storage;
        }
    }, {
        key: "getUserIsolated",
        value: function getUserIsolated() {
            return this.data ? this.data.userIsolated : this.userIsolated;
        }
    }, {
        key: "getUserId",

        /**
         * Get user id.
         * Returns user ID for current storage collection.
         * @return {string} user ID for current storage collection.
         * @function
         * @name StorageCollection#getUserId
         */
        value: function getUserId() {
            return this.userId;
        }
    }, {
        key: "getData",

        /**
         * Get data.
         * Returns data for current storage collection.
         * @return {object} storage object data for current storage collection.
         * @function
         * @name StorageCollection#getData
         */
        value: function getData() {
            return this.data;
        }
    }, {
        key: "getDescription",

        /**
         * Get description.
         * The description of the StorageCollection.
         * @return {String}
         * @function
         * @name StorageCollection#getDescription
         */
        value: function getDescription() {
            if (this.data) {
                return this.data.description;
            } else {
                this.logger.warn('Collection metadata was not loaded yet, please use StorageCollection.loadMetadata to load metadata.');
            }
        }
    }, {
        key: "toJSON",

        /**
         * Convert collection to static object that used by JSON.stringify
         * @ignore
         */
        value: function toJSON() {
            return {
                id: this.id,
                description: this.getDescription(),
                userId: this.getUserId(),
                userIsolated: this.getUserIsolated(),
                data: this.getData()
            };
        }
        /**
         * Load metadata.
         * Load collection metadata
         * @returns {Promise<StorageCollection|NetworkResponse>}
         * @function
         * @name StorageCollection#loadMetadata
         */

    }, {
        key: "loadMetadata",
        value: function loadMetadata() {
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.ACCEPT, _types.CONTENT_TYPES.APPLICATION_JSON);
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.GET,
                url: this.backend.getPlatformUrl("storage/collections/" + this.id),
                headers: headers,
                module: _types.MODULE_NAMES.STORAGE
            }).then(invokeServiceSuccess.bind(this));
            function invokeServiceSuccess(response) {
                this.data = response.data;
                return this;
            }
        }
        /**
         * Returns a list of StorageObjects from the collection starting from the offset and up to the limit. The service may return fewer objects.<br/>
         * 1. If the collection is a shared collection, then it returns all the objects.<br/>
         * 2. If the collection is a user-isolated collection and allObjects is false, then it returns the objects which belong to the current user.<br/>
         * 3. If the collection is user-isolated collection, and allObjects is true, then it returns all the objects in the collection.<br/>
         * The objects might belong to other users. And the current user MUST have READ_ALL or READ_WRITE_ALL permission.
         * @param offset {Number} The offset at which to start. Must be greater than 0.
         * @param limit {Number} The max number of StorageObjects to return. Must be non-negative.
         * @param allObjects {Boolean} whether to return all the objects in the list.
         * @return {Promise<Array<StorageObject>|NetworkResponse>}
         * @function
         * @name StorageCollection#getObjects
         */

    }, {
        key: "getObjects",
        value: function getObjects(offset, limit, allObjects) {
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.ACCEPT, _types.CONTENT_TYPES.APPLICATION_JSON);
            var url = "storage/collections/" + this.id + "/objects";
            if (offset != null) {
                url += url.indexOf("?") == -1 ? "?" : "&";
                url += "offset=" + offset;
            }
            if (limit != null) {
                url += url.indexOf("?") == -1 ? "?" : "&";
                url += "limit=" + limit;
            }
            if (this.getUserIsolated() && allObjects) {
                url += url.indexOf("?") == -1 ? "?" : "&";
                url += "user=*";
            } else if (this.getUserIsolated() && this.getUserId() != null) {
                url += url.indexOf("?") == -1 ? "?" : "&";
                url += "user=" + this.getUserId();
            }
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.GET,
                url: this.backend.getPlatformUrl(url),
                headers: headers,
                module: _types.MODULE_NAMES.STORAGE
            }).then(invokeServiceSuccess.bind(this));
            function invokeServiceSuccess(response) {
                var objects = [];
                var objectsJson = response.data;
                for (var i = 0; i < objectsJson.items.length; i++) {
                    objects[objects.length] = new _storageObject.StorageObject(this, objectsJson.items[i]);
                }
                return objects;
            }
        }
        /**
         * Returns a StorageObject given its ID. The contents of the object will be downloaded lazily.
         * @function
         * @name StorageCollection#getObject
         * @param id {string} The ID of the Storage Object to return.
         * @param objectType {string} responseType for the XMLHttpRequest Object.
         * Default response type if not defined is json.
         * Ths parameter can be one of the types: 'json', 'blob', 'arraybuffer', 'document', 'text'.
         * @return {Promise<StorageObject|NetworkResponse>}
         *
         * @example StorageCollection.getObject('00e39862-9652-458b-9a82-d1a66cf1a0c7', mcs.RESPONSE_TYPES.BLOB).then(
         * function(storageObject){
         * },
         * function(networkResponse){
         * });
         */

    }, {
        key: "getObject",
        value: function getObject(id, objectType) {
            var storageObject = new _storageObject.StorageObject(this, this.backend);
            storageObject.id = id;
            return storageObject.readPayload(objectType).then(readPayloadSuccess);
            function readPayloadSuccess() {
                return storageObject;
            }
        }
    }, {
        key: "loadObjectPayload",
        value: function loadObjectPayload(objectId, objectType) {
            var headers = this.backend.getHttpHeaders();
            var url = "storage/collections/" + this.id + "/objects/" + objectId;
            if (this.userId != null && this.getUserIsolated()) {
                url += "?user=" + this.userId;
            }
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.GET,
                url: this.backend.getPlatformUrl(url),
                headers: headers,
                responseType: objectType || _types.XML_HTTP_REQUEST_RESPONSE_TYPE.BLOB,
                module: _types.MODULE_NAMES.STORAGE
            });
        }
        /**
         * Creates a new StorageObject in the collection.
         * @function
         * @name StorageCollection#postObject
         * @param storageObject {StorageObject} The StorageObject to create.
         * @example storageObject:
         * {
        * "id": " 213ddbac-ccb2-4a53-ad48-b4588244tc4c", // A service generated ID for the StorageObject. The ID is unique in the StorageCollection.
        * "name" : "JSText.txt", // A user provided name for the StorageObject. A StorageCollection may have multiple StorageObjects with the same name.
        * "contentLength": 798", // The length of data content in bytes stored in the StorageObject.
        * "contentType" : "text/plain ", // The media-type associated with the StorageObject.
        * "createdBy" : "DwainDRob", // The name of the user who created the StorageObject
        * "createdOn": "Sat, 17 Oct 2015 10:33:12", // Server generated timestamp when the StorageObject was created.
        * "modifiedBy": "DwainDRob", // The name of the user who last updated the StorageObject.
        * "modifiedOn": "Sat, 17 Oct 2015 10:33:12" //  Server generated timestamp when the StorageObject was last updated.
        * }
         * @return {Promise<NetworkResponse>}
         */

    }, {
        key: "postObject",
        value: function postObject(storageObject) {
            return this._postOrPutStorageObject(storageObject, true);
        }
    }, {
        key: "putObject",

        /**
         * Updates an existing StorageObject in the collection.
         * @function
         * @name StorageCollection#putObject
         * @param storageObject {StorageObject} The StorageObject to update.
         * @return {Promise<NetworkStorageObject|NetworkResponse>}
         */
        value: function putObject(storageObject) {
            return this._postOrPutStorageObject(storageObject, false);
        }
    }, {
        key: "_postOrPutStorageObject",
        value: function _postOrPutStorageObject(storageObject, isPost) {
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.ORACLE_MOBILE_NAME, encodeURI(storageObject.getDisplayName()));
            headers.add(_types.HEADERS.CONTENT_TYPE, storageObject.contentType);
            var url = "storage/collections/" + this.id + "/objects";
            if (!isPost) {
                url += "/" + storageObject.id;
                if (storageObject._eTag != null) {
                    headers.add(_types.HEADERS.IF_MATCH, storageObject._eTag);
                }
            }
            if (this.getUserIsolated() && this.getUserId() != null) {
                url += "?user=" + this.getUserId();
            }
            return this.platform.invokeService({
                method: isPost ? _types.HTTP_METHODS.POST : _types.HTTP_METHODS.PUT,
                url: this.backend.getPlatformUrl(url),
                headers: headers,
                data: storageObject.getPayload(),
                module: _types.MODULE_NAMES.STORAGE
            }).then(invokeServiceSuccess.bind(this));
            function invokeServiceSuccess(response) {
                var object = new _storageObject.StorageObject(this, response.data);
                return new _networkStorageObject.NetworkStorageObject(response.statusCode, object);
            }
        }
    }, {
        key: "contains",

        /**
         * Checks the service if a StorageObject with the given ID exists in the collection.
         * @function
         * @name StorageCollection#contains
         * @param id {String} The ID of the StorageObject to check.
         * @return {Promise<NetworkResponse>}
         */
        value: function contains(id) {
            var headers = this.backend.getHttpHeaders();
            var url = "storage/collections/" + this.id + "/objects/" + id;
            if (this.getUserIsolated() && this.getUserId() != null) {
                url += "?user=" + this.getUserId();
            }
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.HEAD,
                url: this.backend.getPlatformUrl(url),
                headers: headers,
                module: _types.MODULE_NAMES.STORAGE
            });
        }
    }, {
        key: "deleteObject",

        /**
         * Deletes a StorageObject from a collection.
         * @function
         * @name StorageCollection#deleteObject
         * @param id {String} The ID of the StorageObject to delete.
         * @return {Promise<NetworkResponse>}
         */
        value: function deleteObject(id) {
            var headers = this.backend.getHttpHeaders();
            headers.add(_types.HEADERS.IF_MATCH, '*');
            var url = "storage/collections/" + this.id + "/objects/" + id;
            if (this.getUserIsolated() && this.getUserId() != null) {
                url += "?user=" + this.getUserId();
            }
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.DELETE,
                url: this.backend.getPlatformUrl(url),
                headers: headers,
                module: _types.MODULE_NAMES.STORAGE
            });
        }
    }, {
        key: "description",
        get: function get() {
            return this.data ? this.data.description : undefined;
        }
    }]);

    return StorageCollection;
}();

exports.StorageCollection = StorageCollection;


},{"../responses/network-storage-object":22,"../types":41,"./storage-object":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageObject = function () {
    /**
     * @classdesc Class that represents a storage object resource that can be used to store data.
     * This class constructor accessible by [mcs.StorageObject]{@link mcs.StorageObject} method.
     * @param storageCollection {StorageCollection}
     * @param json {Object}
     * @class
     * @global
     */
    function StorageObject(storageCollection, json) {
        _classCallCheck(this, StorageObject);

        this.storageCollection = storageCollection;
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.contentLength = json.contentLength;
            this.contentType = json.contentType;
            this._eTag = json.eTag;
            this.createdBy = json.createdBy;
            this.createdOn = json.createdOn;
            this.modifiedBy = json.modifiedBy;
            this.modifiedOn = json.modifiedOn;
        }
    }
    /**
     * Get payload.
     * Returns the current StorageObject payload.
     *
     * @function
     * @name StorageObject#getPayload
     * @return Current Storage object payload.
     */


    _createClass(StorageObject, [{
        key: "getPayload",
        value: function getPayload() {
            return this.payload;
        }
    }, {
        key: "setPayload",

        /**
         * Sets the payload for the StorageObject.
         *
         * @function
         * @name StorageObject#setPayload
         * @param payload The payload to be associated with StorageObject.
         */
        value: function setPayload(payload) {
            this.payload = payload;
        }
    }, {
        key: "getstorageCollection",

        /**
         * Returns the current StorageCollection.
         *
         * @function
         * @name StorageObject#getstorageCollection
         * @return Current StorageCollection.
         */
        value: function getstorageCollection() {
            return this.storageCollection;
        }
    }, {
        key: "getStorage",

        /**
         * Returns the current StorageObject.
         *
         * @function
         * @name StorageObject#getStorage
         * @return Current StorageObject.
         */
        value: function getStorage() {
            return this.storageCollection.getStorage();
        }
    }, {
        key: "loadPayload",

        /**
         * Loads a StorageObject's contents from an object.
         * @function
         * @name StorageObject#loadPayload
         * @param payload {Object} The object to load from.
         * @param contentType {String} The media-type to associate with the content.
         */
        value: function loadPayload(payload, contentType) {
            this.payload = payload;
            this.contentType = contentType;
            if (this.contentType === _types.CONTENT_TYPES.TEXT_PLAIN) {
                if (typeof this.payload === "string") {
                    this.payload = payload;
                }
            } else if (this.contentType === _types.CONTENT_TYPES.APPLICATION_JSON) {
                if (typeof this.payload === "string") {
                    this.payload = payload;
                } else if (_typeof(this.payload) == "object") {
                    this.payload = JSON.stringify(payload);
                }
            }
            this.contentLength = this.payload.length;
        }
    }, {
        key: "setDisplayName",

        /**
         * Sets a StorageObject's display name from an object.
         * @function
         * @name StorageObject#setDisplayName
         * @param name {Object} The object's name to be associated with the object.
         * @returns The object's name in UTC-8 ASCII format.
         */
        value: function setDisplayName(name) {
            this.name = name;
        }
    }, {
        key: "getDisplayName",

        /**
         * Returns a StorageObject's display name from an object.
         *
         * @function
         * @name StorageObject#getDisplayName
         * @returns {String} object's name decoded if encoded into the MobileBackend.
         */
        value: function getDisplayName() {
            return this.name;
        }
        /**
         * Returns the contents of the StorageObject. May result in a download from the service if the contents were not
         * previously downloaded.
         * @function
         * @name StorageObject#readPayload
         * @param {String} objectType responseType for the XMLHttpRequest Object.
         * @return {Promise<StorageObject|NetworkResponse>}
         */

    }, {
        key: "readPayload",
        value: function readPayload(objectType) {
            var payload = this.getPayload();
            if (!payload) {
                return this.storageCollection.loadObjectPayload(this.id, objectType).then(invokeServiceSuccess.bind(this));
            } else {
                return Promise.resolve(this);
            }
            function invokeServiceSuccess(response) {
                this.setPayload(response.data);
                this.name = decodeURI(response.headers[_types.HEADERS.ORACLE_MOBILE_NAME.toLowerCase()]);
                this._eTag = response.headers[_types.HEADERS.E_TAG.toLowerCase()];
                this.contentLength = response.data.size; // TODO: check this property
                this.contentType = response.headers[_types.HEADERS.CONTENT_TYPE.toLowerCase()];
                this.createdBy = response.headers[_types.HEADERS.ORACLE_MOBILE_CREATED_BY.toLowerCase()];
                this.createdOn = response.headers[_types.HEADERS.ORACLE_MOBILE_CREATED_ON.toLowerCase()];
                this.modifiedBy = response.headers[_types.HEADERS.ORACLE_MOBILE_MODIFIED_BY.toLowerCase()];
                this.modifiedOn = response.headers[_types.HEADERS.ORACLE_MOBILE_MODIFIED_ON.toLowerCase()];
                return this;
            }
        }
    }]);

    return StorageObject;
}();

exports.StorageObject = StorageObject;


},{"../types":41}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Storage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("../logger");

var _storageCollection = require("./storage-collection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that provides cloud-based storage capabilities. Callers should use
 * MobileBackend's [storage]{@link MobileBackend#storage} property.
 * @class
 * @global
 * @hideconstructor
 */
var Storage = function () {
    function Storage(backend, utils, platform) {
        _classCallCheck(this, Storage);

        this.backend = backend;
        this.utils = utils;
        this.platform = platform;
        this.logger = new _logger.Logger('Storage');
    }
    /**
     * Returns a StorageCollection with the given name from the service associated with the user. Subsequent accesses to StorageObjects in the
     * StorageCollection will only return StorageObjects owned by the user.
     * @function
     * @name Storage#getCollection
     * @param name {String} The name of the StorageCollection.
     * @param [userId] {String} Optional, the ID of the user retrieved from the UI.
     * @param [userIsolated] {Boolean} - indicate if collection is in isolated mode, used in combination with lazyLoad and userId.
     * This parameter is not required in case lazyLoad is not provided.
     * @param [lazyLoad] {Boolean} - indicate not to load collection metadata
     * @return {Promise<StorageCollection|NetworkResponse>}
     */


    _createClass(Storage, [{
        key: "getCollection",
        value: function getCollection(name, userId, userIsolated, lazyLoad) {
            var collection = new _storageCollection.StorageCollection(name, this.utils.validateConfiguration(userId), userIsolated, this.backend, this.utils, this.logger, this.platform);
            if (lazyLoad) {
                return Promise.resolve(collection);
            } else {
                return collection.loadMetadata();
            }
        }
    }]);

    return Storage;
}();

exports.Storage = Storage;


},{"../logger":13,"./storage-collection":23}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchCollectionBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _dictionary = require("../../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that exposes fluent APIs for fetching objects from an API endpoint.
 * @class
 * @global
 * @hideconstructor
 */
var FetchCollectionBuilder = function () {
    // TODO: next version
    // var _sortBys = {};
    // var _queryClauses = [];
    // TODO: next version
    // if(json){
    //   _loadFrom(json);
    // }
    function FetchCollectionBuilder(endpoint, json) {
        _classCallCheck(this, FetchCollectionBuilder);

        this.endpoint = endpoint;
        this.json = json;
        this._fetchFromService = false;
        // TODO: next version
        // var _listenForCacheChanges = false;
        // var _policy = null;
        this._offset = -1;
        this._limit = -1;
        this._fetchAll = false;
        this._withParams = {};
        this._withHeaders = new _dictionary.Dictionary([]);
    }
    // TODO: next version
    // this.fromService = function(){
    //   if(_policy){
    //     throw new Error('﻿Can\'t specify FromService and a SyncPolicy');
    //   }
    //   _fetchFromService = true;
    //   return _this;
    // };
    // TODO: next version
    // this.withPolicy = function(policy){
    //
    // };
    // TODO: next version
    // this.withParam = function(name, value){
    //
    //   if(!name){
    //     throw new Error('Wrong name argument');
    //   }
    //
    //   if(!value){
    //     throw new Error('Wrong value argument');
    //   }
    //
    //   if(_withParams[name]){
    //     throw new Error('Duplicate param');
    //   }
    //
    //   _withParams[name] = value;
    //
    //   return _this;
    // };
    // TODO: next version
    // this.withHeader = function(name, value){
    //
    //   if(!name){
    //     throw new Error('Wrong name argument');
    //   }
    //
    //   if(!value){
    //     throw new Error('Wrong value argument');
    //   }
    //
    //   if(_withHeaders[name]){
    //     throw new Error('Duplicate header');
    //   }
    //
    //   _withHeaders[name] = value;
    //
    //   return _this;
    // };
    // TODO: next version
    // this.sortByAscending = function(name){
    //
    // };
    //
    // this.sortByDescending = function(name){
    //
    // };
    // TODO: next version
    // this.offset = function(offset){
    //   if(_fetchAll){
    //     throw new Error('﻿An offset can\'t be specified if an fetch all is specified');
    //   }
    //   if(offset < 0){
    //     throw new Error('Wrong offset argument');
    //   }
    //   _offset = offset;
    //   return _this;
    // };
    // TODO: next version
    // this.limit = function(limit){
    //   if(limit <= 0){
    //     throw new Error('Wrong limit argument');
    //   }
    //   _limit = limit;
    //   return _this;
    // };
    // TODO: next version
    // this.fetchAllPages = function (){
    //   if(_offset >= 0){
    //     throw new Error('﻿FetchAllPages can\'t be specified if an offset is specified');
    //   }
    //   _fetchAll = true;
    //   return _this;
    // };
    // TODO: next version
    // this.queryFor = function(name, comparison, value){
    //
    // };
    // TODO: next version
    // this.listenForChanges = function(){
    //
    // };
    /**
     * Executes the fetch and returns the results.
     * @function
     * @name FetchCollectionBuilder#execute
     * @return {Promise<MobileObjectCollection|NetworkResponse>}
     */


    _createClass(FetchCollectionBuilder, [{
        key: "execute",
        value: function execute() {
            return this.endpoint._executeFetchObjects(this._withHeaders, this._withParams, this._fetchAll, this._offset, this._limit, this._fetchFromService);
        }
    }]);

    return FetchCollectionBuilder;
}();

exports.FetchCollectionBuilder = FetchCollectionBuilder;


},{"../../dictionary":12}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MobileEndpoint = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _mobileObject = require("./mobile-object");

var _getProcessor = require("../processors/get-processor");

var _postProcessor = require("../processors/post-processor");

var _putProcessor = require("../processors/put-processor");

var _deleteProcessor = require("../processors/delete-processor");

var _mobileObjectCollection = require("./mobile-object-collection");

var _fetchCollectionBuilder = require("./fetch-collection-builder");

var _networkResponse = require("../../responses/network-response");

var _types = require("../../types");

var _dictionary = require("../../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that represents an endpoint in a custom code API. Callers should use
 * [Synchronization.openEndpoint()]{@link Synchronization#openEndpoint} to create a new MobileEndpoint.
 * @class
 * @global
 * @hideconstructor
 */
var MobileEndpoint = function () {
    function MobileEndpoint(synchronization, apiName, endpointPath, backend, utils, platform, common, options) {
        var _this = this;

        _classCallCheck(this, MobileEndpoint);

        this.backend = backend;
        this.utils = utils;
        this.platform = platform;
        this.common = common;
        this.options = options;
        /**
         * Deletes all cached resources.
         * @function
         * @name MobileEndpoint#purge
         */
        this.purge = function () {
            _this.options.module.flush(_this.backend.getCustomCodeUrl(_this.apiName + "/" + _this.endpointPath));
        };
        this.synchronization = synchronization;
        this.apiName = apiName;
        this.endpointPath = endpointPath;
    }
    /**
     * Creates a new MobileObject. The object is not uploaded to the service until [save()]{@link MobileObject#save} is invoked.
     * @function
     * @name MobileEndpoint#purge
     * @returns {MobileObject} A new MobileObject.
     */


    _createClass(MobileEndpoint, [{
        key: "createObject",
        value: function createObject(object) {
            object = object || {};
            object.__proto__ = new _mobileObject.MobileObject(this, null);
            return object;
        }
        /**
         * Resource processor response.
         * @typedef ResourceProcessorResponse
         * @property {string} uri
         * @property {object} data
         */
        /**
         * Fetches an object from the API's endpoint.
         * @function
         * @name MobileEndpoint#fetchObject
         * @param id {String} The ID of the object.
         * @param fetchFromService {Boolean} If true will download from the service; if false will return any pinned object
         * and will trigger a background refresh.
         * @return {Promise<MobileObject|ResourceProcessorResponse>}
         */

    }, {
        key: "fetchObject",
        value: function fetchObject(id, fetchFromService) {
            var url = this.apiName;
            if (this.endpointPath && this.endpointPath.length > 0) {
                url += '/' + this.endpointPath;
            }
            if (id && id != '') {
                url += '/' + id;
            }
            url = this.backend.getCustomCodeUrl(url);
            var processor = new _getProcessor.GetProcessor(this.backend, this.apiName, this.endpointPath, this.platform, this.utils, this.common, this.options);
            var headers = new _dictionary.Dictionary([]);
            headers.add(_types.HEADERS.ACCEPT, _types.CONTENT_TYPES.APPLICATION_JSON);
            return processor.performRequest(url, headers, fetchFromService).then(performRequestSuccess.bind(this));
            function performRequestSuccess(resource) {
                if (!resource.data || resource.data === '') {
                    return Promise.reject(new _networkResponse.NetworkResponse(404, 'Object not found in cache.'));
                } else {
                    var object = resource.data;
                    if (typeof object === 'string') {
                        object = object != '' ? JSON.parse(object) : null;
                    }
                    object.__proto__ = new _mobileObject.MobileObject(this, resource.uri);
                    return object;
                }
            }
        }
    }, {
        key: "_save",
        value: function _save(mobileObject, saveIfOffline) {
            var isPost = !mobileObject._getMcsURI();
            var url = isPost ? this.backend.getCustomCodeUrl(this.apiName + "/" + this.endpointPath) : this.backend._baseUrl + mobileObject._getMcsURI();
            var processor = isPost ? new _postProcessor.PostProcessor(this.backend, this.apiName, this.endpointPath, this.platform, this.utils, this.common, this.options) : new _putProcessor.PutProcessor(this.backend, this.apiName, this.endpointPath, this.platform, this.utils, this.common, this.options);
            var data = JSON.stringify(mobileObject);
            var headers = new _dictionary.Dictionary([]);
            headers.add(_types.HEADERS.ACCEPT, _types.CONTENT_TYPES.APPLICATION_JSON);
            headers.add(_types.HEADERS.CONTENT_TYPE, _types.CONTENT_TYPES.APPLICATION_JSON);
            return processor.performRequest(url, headers, data).then(performRequestSuccess.bind(this));
            function performRequestSuccess(resource) {
                var object = resource.data;
                if (typeof object === 'string') {
                    object = object != '' ? JSON.parse(object) : null;
                }
                // Update the existing mobileObject!
                this._updateMobileObject(mobileObject, object);
                // Need to wire the prototype again so that it will have the new resource.
                mobileObject.__proto__ = new _mobileObject.MobileObject(this, resource.uri);
                return mobileObject;
            }
        }
    }, {
        key: "_delete",
        value: function _delete(mobileObject, deleteIfOffline) {
            var processor = new _deleteProcessor.DeleteProcessor(this.backend, this.apiName, this.endpointPath, this.platform, this.utils, this.common, this.options);
            var url = this.backend._baseUrl + mobileObject._getMcsURI();
            return processor.performRequest(url).then(success.bind(this));
            function success() {
                this._updateMobileObject(mobileObject._syncResource);
                mobileObject._syncResource = null;
            }
        }
    }, {
        key: "_updateMobileObject",

        // Reloads the mobile resource.
        // _reload(isFile, mobileResource, discardOfflineUpdates, reloadFromService) {
        //
        //   var endpoint = this;
        //
        //   if (mobileResource._syncResource == null) {
        //     if (isFile) {
        //       mobileResource.data = null;
        //       mobileResource.contentType = null;
        //     } else {
        //       endpoint._updateMobileObject(mobileResource, {});
        //     }
        //
        //     if (successCallback) {
        //       successCallback();
        //     }
        //
        //     return;
        //   }
        //
        //   if (discardOfflineUpdates == true) {
        //
        //     this.synchronization.persistenceManager.clearOfflineState(mobileResource.url, function () {
        //       endpoint._reloadFromCacheOrService(isFile, mobileResource, reloadFromService, successCallback, errorCallback);
        //     }, errorCallback);
        //
        //   } else {
        //     endpoint._reloadFromCacheOrService(isFile, mobileResource, reloadFromService, successCallback, errorCallback);
        //   }
        // };
        //
        // _reloadFromCacheOrService(isFile, mobileResource, reloadFromService, successCallback, errorCallback) {
        //
        //   var endpoint = this;
        //
        //   // Reload from cache.
        //   if (reloadFromService != true) {
        //     this.synchronization._persistenceManager.loadResource(mobileResource.url,
        //       function loadResourceSuccess(existingResource) {
        //
        //         existingResource.loadCachedData(function (data) {
        //
        //           if (isFile) {
        //
        //             mobileResource.data = data;
        //             mobileResource.contentType = existingResource.responseHeaders[MobileEndpoint.HEADERS.CONTENT_TYPE.toLowerCase()];
        //
        //           } else {
        //             // Update the existing mobileObject!
        //             endpoint._updateMobileObject(mobileResource, data);
        //
        //             // Need to wire the prototype again so that it will have the new resource.
        //             mobileResource.__proto__ = new MobileObject(endpoint, existingResource);
        //             mobileResource._initialize();
        //           }
        //
        //           if (successCallback) {
        //             successCallback(mobileResource);
        //           }
        //         }, errorCallback);
        //
        //       }, errorCallback);
        //
        //     return;
        //   }
        //
        //   // Reload from service.
        //   var processor = new GetProcessor(this.backend, this.apiName, this.endpointPath, platform, this.utils, this.common, this.options);
        //
        //   var headers = {};
        //   if (!isFile) {
        //     headers[MobileEndpoint.HEADERS.ACCEPT] = MobileEndpoint.APPLICATION_JSON;
        //   }
        //
        //   var endpointParameters = null;
        //   // var endpointParameters = new MobileEndpointParameters(
        //   //   SyncResourceType.item,
        //   //   this.apiName,
        //   //   this.endpointPath,
        //   //   "Incident",
        //   //   null,
        //   //   null,
        //   //   null,
        //   //   false
        //   // );
        //
        //   processor.performRequest(url, headers, true, endpointParameters, function (resource) {
        //     resource.loadCachedData(function loadCachedDataSuccess(data) {
        //
        //       if (isFile) {
        //
        //         mobileResource._syncResource = resource;
        //         mobileResource.data = data;
        //         mobileResource.contentType = resource.responseHeaders[MobileEndpoint.HEADERS.CONTENT_TYPE.toLowerCase()];
        //
        //       } else {
        //
        //         // Update the existing mobileObject!
        //         endpoint._updateMobileObject(mobileResource, data);
        //
        //         // Need to wire the prototype again so that it will have the new resource.
        //         mobileResource.__proto__ = new MobileObject(endpoint, resource);
        //         mobileResource._initialize();
        //       }
        //
        //       if (successCallback != null) {
        //         successCallback(mobileObject);
        //       }
        //
        //     }, errorCallback);
        //   }, errorCallback);
        // }
        // Copies the properties of newObject into mobileObject (but not the base _syncResource object).
        value: function _updateMobileObject(mobileObject) {
            var newObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // TODO: replace with Persistent.common
            // Update the existing mobileObject!
            for (var property in mobileObject) {
                if (mobileObject.hasOwnProperty(property)) {
                    delete mobileObject[property];
                }
            }
            for (var _property in newObject) {
                if (newObject.hasOwnProperty(_property)) {
                    mobileObject[_property] = newObject[_property];
                }
            }
        }
    }, {
        key: "_executeFetchObjects",
        value: function _executeFetchObjects(withHeaders, withParams, fetchAll, offset, limit, fetchFromService) {
            var endpoint = this;
            var headers = this.backend.getHttpHeaders(withHeaders);
            headers.add(_types.HEADERS.ORACLE_MOBILE_SYNC_AGENT, 'true');
            var request = {
                method: _types.HTTP_METHODS.GET,
                url: this.backend.getCustomCodeUrl(this.apiName + "/" + this.endpointPath),
                headers: headers,
                module: _types.MODULE_NAMES.SYNC
            };
            // TODO: check how to call with fetchFromService parameter
            return this.platform.invokeService(request).then(invokeServiceSuccess.bind(this));
            function invokeServiceSuccess(response) {
                // TODO: pagination is not supported in current version
                // if(fetchAll && response.responseData.hasMorePages){
                //
                //   // TODO: process mismatch tag
                //   if(response.responseHeaders.ETagMismatch){
                //     // restart paging
                //     // ﻿endpointParameters.IsFirstPageRequest = true;
                //     // endpointParameters.CollectionFetch.Offset = -1;
                //   } else {
                //     // endpointParameters.IsFirstPageRequest = false;
                //     // offset += collection.Count;
                //     // endpointParameters.CollectionFetch.Offset = offset;
                //   }
                // }
                var data = response.data;
                if (typeof data === 'string') {
                    data = data != '' ? JSON.parse(data) : null;
                }
                var objects = [];
                for (var idx in data.items) {
                    if (data.items.hasOwnProperty(idx)) {
                        var object = data.items[idx];
                        var uri = '/' + data.uris[idx];
                        object.__proto__ = new _mobileObject.MobileObject(endpoint, uri);
                        objects.push(object);
                    }
                }
                //var persistentPath = persistence.options.parseURL(request.url);
                // var syncResource = processor.createResource(GET,
                //   persistentPath.path,
                //   response.statusCode,
                //   headers,
                //   response.responseHeaders,
                //   null,
                //   response.responseData);
                return new _mobileObjectCollection.MobileObjectCollection(endpoint, /*syncResource*/null).initialize(objects);
            }
        }
        /**
         * Method to fetch a collection of objects from the endpoint. If the collection exists in the cache, the cached copy is returned; otherwise it is downloaded from the service..
         * @return {FetchCollectionBuilder}
         */

    }, {
        key: "fetchObjects",
        value: function fetchObjects() {
            return new _fetchCollectionBuilder.FetchCollectionBuilder(this);
        }
    }]);

    return MobileEndpoint;
}();

exports.MobileEndpoint = MobileEndpoint;


},{"../../dictionary":12,"../../responses/network-response":21,"../../types":41,"../processors/delete-processor":31,"../processors/get-processor":32,"../processors/post-processor":33,"../processors/put-processor":34,"./fetch-collection-builder":26,"./mobile-object":29,"./mobile-object-collection":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MobileObjectCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobileResource = require("./mobile-resource");

var _syncResourceType = require("../sync-resource-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @classdesc Class that represents a collection of MobileObjects returned by a custom code API.
 * @class
 * @global
 * @hideconstructor
 */
var MobileObjectCollection = function (_MobileResource) {
    _inherits(MobileObjectCollection, _MobileResource);

    function MobileObjectCollection(endpoint, uri) {
        _classCallCheck(this, MobileObjectCollection);

        var _this = _possibleConstructorReturn(this, (MobileObjectCollection.__proto__ || Object.getPrototypeOf(MobileObjectCollection)).call(this, endpoint, uri));

        _this._type = _syncResourceType.SyncResourceType.item;
        _this._objects = [];
        return _this;
    }

    _createClass(MobileObjectCollection, [{
        key: "initialize",
        value: function initialize(objects) {
            for (var idx in objects) {
                if (objects.hasOwnProperty(idx)) {
                    var object = objects[idx];
                    // TODO: check if we need load from cache
                    this._objects.push(object);
                }
            }
            return this;
        }
    }, {
        key: "getLength",

        /**
         * The count of items in the collection
         * @function
         * @name MobileObjectCollection#getLength
         * @returns {number}
         */
        value: function getLength() {
            return this._objects.length;
        }
    }, {
        key: "getItem",

        /**
         * Return specific object from collection.
         * @function
         * @name MobileObjectCollection#getItem
         * @param idx {number} item position in collection.
         * @return {MobileObject}
         */
        value: function getItem(idx) {
            return this._objects[idx];
        }
    }, {
        key: "all",

        /**
         * Return all objects from collection.
         * @function
         * @name MobileObjectCollection#all
         * @return {MobileObject[]}
         */
        value: function all() {
            return this._objects;
        }
    }, {
        key: "forEach",

        /**
         * Run this method on every object.
         * @callback MobileObjectCollection#forEachCallback
         * @param object {MobileObject} the mobile object.
         */
        /**
         * For each.
         * Run method per item
         * @function
         * @name MobileObjectCollection#forEach
         * @param method {MobileObjectCollection#forEachCallback} method to run on item.
         */
        value: function forEach(method) {
            this._objects.forEach(method);
        }
    }]);

    return MobileObjectCollection;
}(_mobileResource.MobileResource);

exports.MobileObjectCollection = MobileObjectCollection;


},{"../sync-resource-type":39,"./mobile-resource":30}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobileResource = require("./mobile-resource");

var _syncResourceType = require("../sync-resource-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * @classdesc Class that represents an object returned by a custom code API.
 * @class
 * @global
 * @hideconstructor
 */
var MobileObject = function (_MobileResource) {
  _inherits(MobileObject, _MobileResource);

  function MobileObject(endpoint, uri) {
    _classCallCheck(this, MobileObject);

    // TODO: check if we need the property
    var _this = _possibleConstructorReturn(this, (MobileObject.__proto__ || Object.getPrototypeOf(MobileObject)).call(this, endpoint, uri));

    _this._type = _syncResourceType.SyncResourceType.item;
    return _this;
  }
  /**
   * Save the object.
   * Saves any changes to the object back to the service.
   * @function
   * @name MobileObject#save
   * @param saveIfOffline {Boolean} If true will cache updates locally and sync them back to the service if the device is offline; if false will fail if the device is offline.
   * @return {Promise<NetworkResponse>}
   */
  // TODO: review this method, the method should be private
  // TODO: This method is misleading, this method shows that the mobile object can exists without collection.
  // TODO: We should move the functionality to collection object, to method add


  _createClass(MobileObject, [{
    key: "save",
    value: function save(saveIfOffline) {
      return this._getEndpoint()._save(this, saveIfOffline);
    }
    /**
     * Saves any changes to the object back to the service.
     * @function
     * @name MobileObject#delete
     * @param deleteIfOffline {Boolean} If true will cache the delete locally and sync back to the service if the device is offline; if false will fail if the device is offline.
     * @return {Promise<NetworkResponse>}
     */
    // TODO: review this method, the method should be private
    // TODO: This method is misleading, this method shows that the mobile object can exists without collection. Better approach is provide collection functionality to add objects to server.
    // TODO: We should move the functionality to collection object, to method remove

  }, {
    key: "delete",
    value: function _delete(deleteIfOffline) {
      return this._getEndpoint()._delete(this, deleteIfOffline);
    }
  }]);

  return MobileObject;
}(_mobileResource.MobileResource);

exports.MobileObject = MobileObject;


},{"../sync-resource-type":39,"./mobile-resource":30}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 */
/**
 * Base class for MobileObject, MobileCollection and MobileFile.
 * @abstract
 * @private
 */
var MobileResource = function () {
    function MobileResource(endpoint, uri) {
        _classCallCheck(this, MobileResource);

        this.endpoint = endpoint;
        this.uri = uri;
    }

    _createClass(MobileResource, [{
        key: '_getEndpoint',
        value: function _getEndpoint() {
            return this.endpoint;
        }
    }, {
        key: '_getMcsId',
        value: function _getMcsId() {
            return this.uri ? this.uri.substring(this.uri.lastIndexOf('/') + 1, this.uri.length) : null;
        }
    }, {
        key: '_getMcsURI',
        value: function _getMcsURI() {
            return this.uri;
        }
    }]);

    return MobileResource;
}();

exports.MobileResource = MobileResource;


},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncProcessor = require("./sync-processor");

var _types = require("../../types");

var _dictionary = require("../../dictionary");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var DeleteProcessor = function (_SyncProcessor) {
    _inherits(DeleteProcessor, _SyncProcessor);

    function DeleteProcessor(backend, apiName, endpointPath, platform, utils, common, options) {
        _classCallCheck(this, DeleteProcessor);

        return _possibleConstructorReturn(this, (DeleteProcessor.__proto__ || Object.getPrototypeOf(DeleteProcessor)).call(this, backend, apiName, endpointPath, false, utils, platform, options, common));
    }

    _createClass(DeleteProcessor, [{
        key: "performRequest",
        value: function performRequest(url) {
            var headers = this.getHttpHeaders(new _dictionary.Dictionary([]));
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.DELETE,
                url: url,
                module: _types.MODULE_NAMES.SYNC,
                headers: headers
            });
        }
    }]);

    return DeleteProcessor;
}(_syncProcessor.SyncProcessor);

exports.DeleteProcessor = DeleteProcessor;


},{"../../dictionary":12,"../../types":41,"./sync-processor":35}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncProcessor = require("./sync-processor");

var _types = require("../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var GetProcessor = function (_SyncProcessor) {
    _inherits(GetProcessor, _SyncProcessor);

    function GetProcessor(backend, apiName, endpointPath, platform, utils, common, options) {
        _classCallCheck(this, GetProcessor);

        return _possibleConstructorReturn(this, (GetProcessor.__proto__ || Object.getPrototypeOf(GetProcessor)).call(this, backend, apiName, endpointPath, false, utils, platform, options, common));
    }

    _createClass(GetProcessor, [{
        key: "performRequest",
        value: function performRequest(url, requestHeaders, fetchFromService) {
            var headers = this.getHttpHeaders(requestHeaders);
            // TODO: check how to call with fetchFromService parameter
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.GET,
                url: url,
                headers: headers,
                module: _types.MODULE_NAMES.SYNC
            }).then(success.bind(this));
            function success(response) {
                return {
                    uri: this.getUri(response, url),
                    data: response.data
                };
            }
        }
    }]);

    return GetProcessor;
}(_syncProcessor.SyncProcessor);

exports.GetProcessor = GetProcessor;


},{"../../types":41,"./sync-processor":35}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncProcessor = require("./sync-processor");

var _types = require("../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PostProcessor = exports.PostProcessor = function (_SyncProcessor) {
    _inherits(PostProcessor, _SyncProcessor);

    function PostProcessor(backend, apiName, endpointPath, platform, utils, common, options) {
        _classCallCheck(this, PostProcessor);

        return _possibleConstructorReturn(this, (PostProcessor.__proto__ || Object.getPrototypeOf(PostProcessor)).call(this, backend, apiName, endpointPath, false, utils, platform, options, common));
    }

    _createClass(PostProcessor, [{
        key: "performRequest",
        value: function performRequest(url, requestHeaders, requestData) {
            var headers = this.getHttpHeaders(requestHeaders);
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.POST,
                url: url,
                headers: headers,
                data: requestData,
                module: _types.MODULE_NAMES.SYNC
            }).then(success.bind(this));
            function success(response) {
                return {
                    uri: this.getUri(response, url),
                    data: response.data
                };
            }
        }
    }]);

    return PostProcessor;
}(_syncProcessor.SyncProcessor);


},{"../../types":41,"./sync-processor":35}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PutProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncProcessor = require("./sync-processor");

var _types = require("../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PutProcessor = exports.PutProcessor = function (_SyncProcessor) {
    _inherits(PutProcessor, _SyncProcessor);

    function PutProcessor(backend, apiName, endpointPath, platform, utils, common, options) {
        _classCallCheck(this, PutProcessor);

        return _possibleConstructorReturn(this, (PutProcessor.__proto__ || Object.getPrototypeOf(PutProcessor)).call(this, backend, apiName, endpointPath, false, utils, platform, options, common));
    }

    _createClass(PutProcessor, [{
        key: "performRequest",
        value: function performRequest(url, requestHeaders, requestData) {
            var headers = this.getHttpHeaders(requestHeaders);
            return this.platform.invokeService({
                method: _types.HTTP_METHODS.PUT,
                url: url,
                headers: headers,
                data: requestData,
                module: _types.MODULE_NAMES.SYNC
            }).then(success.bind(this));
            function success(response) {
                return {
                    uri: this.getUri(response, url),
                    data: response.data
                };
            }
        }
    }]);

    return PutProcessor;
}(_syncProcessor.SyncProcessor);


},{"../../types":41,"./sync-processor":35}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SyncProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncResourceType = require("../sync-resource-type");

var _mcsRequestHandler = require("../sync-express/mcs-request-handler");

var _types = require("../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyncProcessor = exports.SyncProcessor = function () {
    function SyncProcessor(backend, apiName, endpointPath, resolvingOfflineUpdate, utils, platform, options, common) {
        _classCallCheck(this, SyncProcessor);

        this.backend = backend;
        this.apiName = apiName;
        this.endpointPath = endpointPath;
        this.resolvingOfflineUpdate = resolvingOfflineUpdate;
        this.utils = utils;
        this.platform = platform;
        this.options = options;
        this.common = common;
    }

    _createClass(SyncProcessor, [{
        key: "getHttpHeaders",
        value: function getHttpHeaders(requestHeaders) {
            var headers = this.backend.getHttpHeaders(requestHeaders);
            headers.add(_types.HEADERS.ORACLE_MOBILE_SYNC_AGENT, 'true');
            return headers;
        }
    }, {
        key: "getType",
        value: function getType(responseHeaders, responseData) {
            var type = _syncResourceType.SyncResourceType.file;
            // get object type from response headers
            var resourceType = responseHeaders[_types.HEADERS.ORACLE_MOBILE_SYNC_RESOURCE_TYPE.toLowerCase()];
            if (resourceType != null) {
                if (resourceType === _types.RESOURCE_TYPES.ITEM) {
                    type = _syncResourceType.SyncResourceType.item;
                } else if (resourceType === _types.RESOURCE_TYPES.COLLECTION) {
                    type = _syncResourceType.SyncResourceType.collection;
                }
            } else {
                // in offline mode there is no resource type header, try to detect the type from responseData
                if (this.common.isString(responseData)) {
                    try {
                        var json = JSON.parse(responseData);
                        // TODO: validate functionality
                        if (this.common.isArray(json)) {
                            // the object is collection
                            type = _syncResourceType.SyncResourceType.collection;
                        } else {
                            type = _syncResourceType.SyncResourceType.item;
                        }
                    } catch (e) {
                        // the string is not json, so it is file
                        type = _syncResourceType.SyncResourceType.file;
                    }
                }
            }
            return type;
        }
    }, {
        key: "getUri",
        value: function getUri(response, url) {
            var location = response && response.headers ? response.headers[_types.HEADERS.LOCATION.toLowerCase()] : null;
            if (location != null) {
                return '/' + location;
            } else {
                var obj = null;
                if (response.data) {
                    if (typeof response.data === 'string') {
                        obj = response.data != '' ? JSON.parse(response.data) : null;
                    } else {
                        obj = response.data;
                    }
                }
                if (obj && obj[_mcsRequestHandler.McsRequestHandler.URI_KEY]) {
                    var uri = obj[_mcsRequestHandler.McsRequestHandler.URI_KEY];
                    delete obj[_mcsRequestHandler.McsRequestHandler.URI_KEY];
                    return uri;
                } else {
                    //
                    return this.options.parseURL(url).path;
                }
            }
        }
    }, {
        key: "createResource",
        value: function createResource(method, url, statusCode, requestHeaders, responseHeaders, requestData, responseData, response) {
            var location = response.headers[_types.HEADERS.LOCATION.toLowerCase()];
            if (location != null) {
                location = '/' + location;
            } else {
                location = url;
            }
            var type = _syncResourceType.SyncResourceType.file;
            // get object type from response headers
            var resourceType = responseHeaders[_types.HEADERS.ORACLE_MOBILE_SYNC_RESOURCE_TYPE.toLowerCase()];
            if (resourceType != null) {
                if (resourceType == _types.RESOURCE_TYPES.ITEM) {
                    type = _syncResourceType.SyncResourceType.item;
                } else if (resourceType == _types.RESOURCE_TYPES.COLLECTION) {
                    type = _syncResourceType.SyncResourceType.collection;
                }
            } else {
                // in offline mode there is no resource type header, try to detect the type from responseData
                if (this.common.isString(responseData)) {
                    try {
                        var json = JSON.parse(responseData);
                        // TODO: validate functionality
                        if (this.common.isArray(json)) {
                            // the object is collection
                            type = _syncResourceType.SyncResourceType.collection;
                        } else {
                            type = _syncResourceType.SyncResourceType.item;
                        }
                    } catch (e) {
                        // the string is not json, so it is file
                        type = _syncResourceType.SyncResourceType.file;
                    }
                }
            }
            return null;
            // new SyncResource(
            //   _synchronization,
            //   location,
            //   type,
            //   new Date().toISOString(),
            //   requestHeaders,
            //   responseHeaders,
            //   requestData,
            //   responseData
            // );
        }
    }]);

    return SyncProcessor;
}();


},{"../../types":41,"../sync-express/mcs-request-handler":37,"../sync-resource-type":39}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('../../logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates the offline database and return base API for external usage.
 * @ignore
 * @type {{getDB, getCollection, getCollectionByName, getCollections, save, close, flush}}
 */
var DB = exports.DB = function () {
    function DB(name, $options) {
        var _this = this;

        _classCallCheck(this, DB);

        this.name = name;
        this.$options = $options;
        /**
         * Create internal JS offline persistence db.
         */
        this._db = null;
        this.options = {
            autosave: true,
            autosaveInterval: 500,
            autoload: true,
            adapter: null
        };
        this.logger = new _logger.Logger('DB');
        if ($options.isCordova) {
            if (typeof LokiCordovaFSAdapter === 'function') {
                this.options.adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            } else {
                // TODO: Yuri add logger
                this.logger.warn('LokiCordovaFSAdapter is not installed');
            }
        }
        if ($options.isCordova) {
            $options.deviceReady(function () {
                _this.init();
            });
        } else {
            $options.ready(this.init.bind(this));
        }
    }
    // like a constructor, init when DOM ready!


    _createClass(DB, [{
        key: 'init',
        value: function init(name) {
            if (this.$options.off === true || this.$options.isTest === true) {
                this.options = {
                    autosave: false,
                    autosaveInterval: 60 * 1000 * 60 * 24 * 30 * 12,
                    autoload: false,
                    adapter: null
                };
            }
            var dbName = this.name || name || this.$options.offlineDBName || 'offline';
            this._db = new loki(dbName, this.options);
            this._db.loadDatabase();
            //_db.save();
        }
        /**
         * Wraps the way collection should be taken from the database. If given collection name does not exist
         * it will create it.
         *
         * @param name - the name of the collection to get, create
         * @returns {*}
         */

    }, {
        key: 'getCollectionByName',
        value: function getCollectionByName(name) {
            var col = this._db.getCollection(name);
            if (!col) {
                var options = {
                    clone: true,
                    disableChangesApi: true,
                    transactional: true // make sure that operations are transactional
                };
                col = this._db.addCollection(name, options);
            }
            // BUG in Loki v1.3.16 - trigger save after each of the following operations
            // col.on('insert', function (result) {
            //   _db.save();
            // })
            //
            // col.on('update', function () {
            //   _db.save();
            // })
            //
            // col.on('delete', function () {
            //   _db.save();
            // })
            return col;
        }
        /**
         * Return collection directly with promise. If collection does not exist it will be created.
         *
         * @param name - the name of the database collection
         * @returns {*}
         * @deprecated
         */

    }, {
        key: 'getCollection',
        value: function getCollection(name) {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2._db.loadDatabase({}, function () {
                    var col = _this2._db.getCollection(name);
                    if (!col) {
                        var options = {
                            clone: true,
                            disableChangesApi: true,
                            transactional: true // make sure that operations are transactional
                        };
                        col = _this2._db.addCollection(name /*, options*/);
                    }
                    resolve(col);
                });
            });
        }
        /**
         * In case developer explicitly wants to save the database, after db operation.
         */

    }, {
        key: 'saveDatabase',
        value: function saveDatabase() {
            //_db.saveDatabase();
            this._db.save();
        }
        /**
         * Returns all registered collections from the offline database.
         */

    }, {
        key: 'getCollections',
        value: function getCollections() {
            return this._db.listCollections();
        }
        /**
         * Return the object to the internal created database
         * @returns {*}
         */

    }, {
        key: 'internalDB',
        value: function internalDB() {
            return this._db;
        }
        /**
         * Emits a close event with an optional callback. Note that this does not destroy the db or collections,
         * it's a utility method that can be called before closing the process or 'onbeforeunload' in a browser.
         *
         * @param callback - optional
         */

    }, {
        key: 'close',
        value: function close(callback) {
            this._db.close(callback);
        }
        /**
         * This will go through all database collections and remove the data from them.
         */

    }, {
        key: 'flush',
        value: function flush() {
            var self = this;
            return new Promise(function (resolve) {
                // go throw the collections and delete the data there!
                var collections = self.getCollections();
                for (var i = 0; i < collections.length; i++) {
                    // get the collection
                    self.getCollectionByName(collections[i].name).removeDataOnly();
                }
                resolve(true);
            });
        }
    }]);

    return DB;
}();


},{"../../logger":13}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.McsRequestHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _requestHandler = require('./request-handler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @authors Lyudmil Pelov
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


/**
 * This module provide the MCS Persistent capabilities
 * @ignore
 * @type {{}}
 */
var McsRequestHandler = exports.McsRequestHandler = function (_RequestHandler) {
    _inherits(McsRequestHandler, _RequestHandler);

    function McsRequestHandler(options, common, utils) {
        _classCallCheck(this, McsRequestHandler);

        return _possibleConstructorReturn(this, (McsRequestHandler.__proto__ || Object.getPrototypeOf(McsRequestHandler)).call(this, 'mcs-request', options, common, utils));
    }

    _createClass(McsRequestHandler, [{
        key: 'buildResponseObject',
        value: function buildResponseObject(obj) {
            return obj;
        }
    }, {
        key: 'getResponsePayload',
        value: function getResponsePayload(response) {
            return response.data;
        }
    }, {
        key: 'getModuleName',
        value: function getModuleName() {
            return 'MCS';
        }
        /**
         * Check to see if this was also MCS payload!
         *
         * @param request
         * @returns {boolean}
         */
        //isPersistentMcsGetRequest

    }, {
        key: 'isPersistentGetRequest',
        value: function isPersistentGetRequest(request) {
            _get(McsRequestHandler.prototype.__proto__ || Object.getPrototypeOf(McsRequestHandler.prototype), 'isPersistentGetRequest', this).call(this, request);
            var resourceTypeHeader = McsRequestHandler.HEADER_RESOURCE_TYPE in request || request.headers[McsRequestHandler.HEADER_RESOURCE_TYPE];
            if (resourceTypeHeader === 'collection') {
                if (this.$common.isEmpty(request.data)) {
                    throw new Error('cannot proceed with empty payload');
                }
                if (!('items' in request.data)) {
                    throw new Error('items is not in the payload returned from MCS, probably not Sync Custom Code');
                }
                if (!('uris' in request.data)) {
                    throw new Error('url is not in the payload returned from MCS, probably not Sync Custom Code');
                }
                // don't know if this is mandatory!
                if (!('etags' in request.data)) {
                    throw new Error('etags is not in the payload returned from MCS, probably not Sync Custom Code');
                }
            } else if (resourceTypeHeader !== 'item') {
                throw new Error('oracle-mobile-sync-resource-type is not in the headers returned from MCS, probably not Sync Custom Code');
            }
            return true;
        }
        /**
         * Transform the payload and add it into the $db!
         *
         * NOTE: Such a transformations could hold a lot of resources!
         *
         * @param collection
         * @param payload
         * @returns {*}
         */

    }, {
        key: 'handleMcsGetCollectionPayload',
        value: function handleMcsGetCollectionPayload(payload, collection) {
            // to go over the items
            var size = payload.items.length;
            // get the current time!
            var now = Date.now();
            // get each object and create it in the $db
            for (var i = 0; i < size; i++) {
                var item = payload.items[i];
                item[McsRequestHandler.URI_KEY] = parseUri((this.$common.stringStartsWith(payload.uris[i], '/') ? '' : '/') + payload.uris[i]).path;
                item[McsRequestHandler.ETAG_KEY] = payload.etags[i];
                var query = {};
                query[McsRequestHandler.URI_KEY] = item[McsRequestHandler.URI_KEY];
                var result = collection.findOne(query);
                // if already exist, update it
                if (result) {
                    this.$common.extendOwn(result, item);
                    collection.update(result);
                } else {
                    collection.insert(item);
                }
            }
            // clean everything that was not in the payload, so not updated or created!
            collection.removeWhere(function (dbObj) {
                //var diff = now - listeners[eventName].timestamp;
                return dbObj.meta.updated < now;
            });
            // return all from the collection!
            return collection.find();
        }
        /**
         * Handle item payload from the MCS
         *
         * @param collection
         * @param payload
         * @param path
         * @returns {*}
         */

    }, {
        key: 'handleMcsGetItemPayload',
        value: function handleMcsGetItemPayload(collection, payload, path) {
            // check first if this item already exist and update it, otherwise created it!
            var query = {};
            query[McsRequestHandler.URI_KEY] = path;
            var result = collection.findOne(query);
            if (result) {
                var item = payload;
                this.$common.extendOwn(result, item);
                return collection.update(result);
            } else {
                var item = payload;
                item[McsRequestHandler.URI_KEY] = path;
                // not here this is not having etag!
                return collection.insert(item);
            }
        }
        /**
         * If nothing in the payload check get what is in the offline $db!
         * @param response - response is always array of objects!
         */
        //handleMcsGet

    }, {
        key: 'handleGet',
        value: function handleGet(response) {
            var persistentPath = this.$options.isPersistentUrl(response.url);
            if (persistentPath === false) {
                throw new Error('Persistence.handleMcsGet()-> URI was not configured for persistence:' + response.url);
            }
            var collection = this.$db.getCollectionByName(persistentPath.root);
            // if any attributes build the query and return the information
            if (this.$common.isEmpty(persistentPath.params)) {
                // no way to find build the query so return empty array
                // return collection in format {items:[],uris:[],etags:[]}
                var result = collection.find();
                var data = {
                    //items: collection.find(),
                    items: [],
                    uris: [],
                    etags: []
                };
                // for (var idx in data.items) {
                //   if (data.items.hasOwnProperty(idx)) {
                //     data.uris.push(data.items[idx].URI_KEY);
                //   }
                // }
                // clean the object and return in the way the MCS would do!
                for (var idx in result) {
                    if (result[idx].hasOwnProperty(McsRequestHandler.URI_KEY)) {
                        data.uris.push(result[idx][McsRequestHandler.URI_KEY]);
                        delete result[idx][McsRequestHandler.URI_KEY];
                    }
                    if (result[idx].hasOwnProperty(McsRequestHandler.ETAG_KEY)) {
                        data.etags.push(result[idx][McsRequestHandler.ETAG_KEY]);
                        delete result[idx][McsRequestHandler.ETAG_KEY];
                    }
                    var cleanObject = this.$common.cleanObject(result[idx]);
                    data.items.push(cleanObject);
                }
                return data;
            }
            var query = {};
            query[McsRequestHandler.URI_KEY] = persistentPath.path;
            return this.$common.cleanObject(collection.findOne(query));
        }
        //handleMcsGetStore

    }, {
        key: 'handleGetStore',
        value: function handleGetStore(response) {
            var persistentPath = this.$options.isPersistentUrl(response.url);
            if (persistentPath === false) {
                throw new Error('Persistence.handleMcsGetStore()-> URI was not configured for persistence:' + response.url);
            }
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(persistentPath.root);
            // new reference!
            var payload = response.data;
            // since everything is in the payload, I don't have to bother with some complicate checking!
            // Oracle-Mobile-Sync-Resource-Type: item, collection
            // Content-Type header must be application/json
            var resourceTypeHeader = McsRequestHandler.HEADER_RESOURCE_TYPE in response || response.headers[McsRequestHandler.HEADER_RESOURCE_TYPE];
            if (resourceTypeHeader === 'collection') {
                // work with collection
                return this.handleMcsGetCollectionPayload(payload, collection);
            } else if (resourceTypeHeader === 'item') {
                // work with item
                return this.handleMcsGetItemPayload(collection, payload, persistentPath.path);
            } else if (resourceTypeHeader) {
                // something else!
                this.logger.error('unknown Oracle-Mobile-Sync-Resource-Type (%s)', resourceTypeHeader);
                throw new Error('unknown Oracle-Mobile-Sync-Resource-Type');
            } else {
                // nothing to do the payload is not recognised!
                this.logger.error('this is not MCS response, unable to handle the payload, no MCS header was specified: ', response);
                throw new Error('this is not MCS response, unable to handle the payload, no MCS header was specified');
            }
        }
        /**
         * Currently posts supports only adding new objects into the root!
         *
         * @param response
         * @param force
         */
        // handleMcsPost

    }, {
        key: 'handlePost',
        value: function handlePost(response, force) {
            // check if URL can be persist
            var persistentPath = this.$options.isPersistentUrl(response.url);
            if (persistentPath === false) {
                throw new Error('Persistence.handleMcsPost()-> URI was not configured for persistence:' + response.url);
            }
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(persistentPath.root);
            // reference
            var payload = response.data;
            if (!this.$common.isEmpty(persistentPath.params)) {
                throw new Error('you can add new objects only against the root REST resource endpoint');
            }
            if (this.$common.isArray(payload)) {
                throw new Error("the payload cannot be array");
            }
            // just object payload
            else if (this.$common.isObject(payload) && !this.$common.isNull(payload) && !this.$common.isFunction(payload)) {
                    // update offline created object with new uri
                    if (response.data && response.data[McsRequestHandler.URI_KEY]) {
                        return this.updatePayloadWithNewUri(collection, response);
                    } else {
                        var uri = null;
                        if (response && response.headers && response.headers[McsRequestHandler.HEADER_LOCATION]) {
                            uri = this.$common.stringStartsWith(response.headers[McsRequestHandler.HEADER_LOCATION], '/') ? response.headers[McsRequestHandler.HEADER_LOCATION] : '/' + response.headers[McsRequestHandler.HEADER_LOCATION];
                        }
                        var result = null;
                        if (uri) {
                            var query = {};
                            query[McsRequestHandler.URI_KEY] = uri;
                            result = collection.findOne(query);
                        }
                        if (!result) {
                            payload[McsRequestHandler.ETAG_KEY] = '"0-1B2M2Y8AsgTpgAmY7PhCfg"'; // empty e-tag
                            result = collection.insert(payload);
                            // this flag means that we created this directly in the offline $db
                            this.markObjAsOfflineIfForced(result, force);
                        } else {
                            this.$common.extendOwn(result, response.data);
                        }
                        if (!uri) {
                            // L.Pelov - fix 02 Aug 2016
                            // EDGE case when you use Oracle JET with oj.Collection components!
                            var key = persistentPath.tokens.length > 0 && /^\w+$/.test(persistentPath.tokens[0].name) ? persistentPath.tokens[0].name : null;
                            var value = null;
                            if (key) {
                                value = response.data.hasOwnProperty(key) ? response.data[key] : this.$common.getUID();
                            }
                            uri = value === null ? persistentPath.root + '/' + this.$common.getUID() : persistentPath.root + '/' + value;
                            // on post check to see if the payload already has object with ID configured in the params
                            //uri = persistentPath.root + '/' + this.$common.getUID();
                        }
                        result[McsRequestHandler.URI_KEY] = uri;
                        return collection.update(result);
                    }
                }
            throw new Error("don't know what to do with the payload");
        }
    }, {
        key: 'updatePayloadWithNewUri',
        value: function updatePayloadWithNewUri(collection, response) {
            var query = {};
            query[McsRequestHandler.URI_KEY] = response.data[McsRequestHandler.URI_KEY];
            var result = collection.findOne(query);
            if (result) {
                this.$common.extendOwn(result, response.data);
                //result[URI_KEY] = '/' + response.headers.Location;
                result[McsRequestHandler.URI_KEY] = this.$common.stringStartsWith(response.headers[McsRequestHandler.HEADER_LOCATION], '/') ? response.headers[McsRequestHandler.HEADER_LOCATION] : '/' + response.headers[McsRequestHandler.HEADER_LOCATION];
                return collection.update(result);
            } else {
                throw new Error("the payload was not found in collection:" + query[McsRequestHandler.URI_KEY]);
            }
        }
        /**
         * Currently posts supports only adding new objects into the root!
         *
         * @param response
         * @param force
         */
        // handleMcsPut

    }, {
        key: 'handlePut',
        value: function handlePut(response, force) {
            // check if URL can be persist
            var persistentPath = this.$options.isPersistentUrl(response.url);
            if (persistentPath === false) {
                throw new Error('Persistence.handleMcsPut()-> URI was not configured for persistence:' + response.url);
            }
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(persistentPath.root);
            // reference
            var payload = response.data;
            if (!this.$common.isEmpty(persistentPath.params)) {
                // ok there is key so we can try to do the update
                if (this.$common.isArray(payload)) {
                    throw new Error("the payload cannot be array");
                }
                // just object payload
                else if (this.$common.isObject(payload) && !this.$common.isNull(payload) && !this.$common.isFunction(payload)) {
                        var query = {};
                        query[McsRequestHandler.URI_KEY] = persistentPath.path;
                        var result = collection.findOne(query);
                        if (result) {
                            this.$common.extendOwn(result, payload);
                            this.markObjAsOfflineIfForced(result, force);
                            return collection.update(result);
                        }
                    }
            }
            // don't know what to do! :)!
            throw new Error("you can execute update operations only against existing items in the offline database!");
        }
        /**
         *
         * @param response
         * @returns {*}
         */
        //handleMcsDelete

    }, {
        key: 'handleDelete',
        value: function handleDelete(response) {
            // check if URL can be persist
            var persistentPath = this.$options.isPersistentUrl(response.url);
            if (persistentPath === false) {
                throw new Error('Persistence.handleMcsDelete()-> URI was not configured for persistence:' + response.url);
            }
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(persistentPath.root);
            // reference
            var payload = response.data;
            if (!this.$common.isEmpty(persistentPath.params)) {
                var query = {};
                query[McsRequestHandler.URI_KEY] = persistentPath.path;
                var findOne = collection.findOne(query);
                if (findOne) {
                    return collection.remove(findOne);
                }
                throw new Error('unable to find object with the given ID(%s) in the database' /*, response.url*/);
            }
        }
    }, {
        key: 'data',
        value: function data(path) {
            function doData(path) {
                var persistentPath = this.$options.isPersistentUrl(path);
                //
                if (!persistentPath) {
                    throw new Error('Persistence.BaseModule.data() given URI not configured for persistence: ' + path);
                }
                return this.$db.getCollectionByName(persistentPath.root);
            }
            //
            return new Promise(function (resolve) {
                return resolve(doData(path));
            });
        }
        // TODO: check how to merge with super method

    }, {
        key: 'router',
        value: function router(request) {
            var _this2 = this;

            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return new Promise(function (resolve) {
                if (!_this2.$common.isObject(request)) {
                    console.error('Passed object is not defined request!', request);
                    throw new Error('Passed object is not defined request!');
                }
                // check if method provided!
                if (!request.hasOwnProperty('method')) {
                    _this2.logger.error('request.method was not provided!', request);
                    throw new Error('request.method was not provided!');
                }
                // copy the object to make sure that we don't work with the reference anymore!
                var _request = _this2.$common.clone(request);
                // exec the router specified
                _request.method = _this2.$utils._normalizeMethod(_request.method);
                if (!_this2[_request.method]) {
                    _this2.logger.error('specified router is not implemented!');
                    throw new Error('specified router is not implemented!');
                }
                // exec the method
                var result = _this2[_request.method](_request, force);
                resolve(result);
            });
        }
        // TODO: check how to merge with super method

    }, {
        key: 'get',
        value: function get(request) {
            var _this3 = this;

            var doGet = function doGet(request) {
                _this3.logger.info('get()');
                _this3.isPersistentRequest(request);
                // copy the object to make sure that we don't work with the reference anymore!
                var _request = _this3.$common.clone(request);
                if (!_request.hasOwnProperty('data') || _this3.$common.isEmpty(_request.data)) {
                    return _this3.$common.clone(_this3.handleGet(_request));
                }
                _this3.isPersistentGetRequest(request);
                return _this3.$common.clone(_this3.handleGetStore(_request));
            };
            // return all as a promise
            return new Promise(function (resolve) {
                resolve(doGet(request));
            });
        }
    }]);

    return McsRequestHandler;
}(_requestHandler.RequestHandler);

McsRequestHandler.URI_KEY = '$mcs$mcsPersistenceURI';
McsRequestHandler.ETAG_KEY = '$mcs$etag';
McsRequestHandler.HEADER_LOCATION = "location";
McsRequestHandler.HEADER_RESOURCE_TYPE = "oracle-mobile-sync-resource-type";


},{"./request-handler":38}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @authors Lyudmil Pelov
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _db = require("./db");

var _logger = require("../../logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestHandler = exports.RequestHandler = function () {
    function RequestHandler(dbname, $options, $common, $utils) {
        var _this = this;

        _classCallCheck(this, RequestHandler);

        this.dbname = dbname;
        this.$options = $options;
        this.$common = $common;
        this.$utils = $utils;
        this.logger = new _logger.Logger('RequestHandler');
        this.prefix = $options.dbPrefix;
        this.$db = new _db.DB(this.prefix + '.' + this.dbname, $options);
        // in case the db prefix has changed, re-init the db!
        $options.onDbPrefixChange = function (oldVal, newVal) {
            _this.$db = new _db.DB(newVal + '.' + _this.dbname, $options);
        };
    }

    _createClass(RequestHandler, [{
        key: "isPersistentRequest",
        value: function isPersistentRequest(request) {
            if (!request) {
                throw new Error('request cannot be undefined or null value');
            }
            if (!this.$common.isObject(request)) {
                throw new Error('request has to be defined object with properties like: url, data etc.');
            }
            if (this.$common.isEmpty(request)) {
                throw new Error('request cannot be empty object, it request properties like: url, data etc.');
            }
            if (this.$common.isArray(request) || this.$common.isFunction(request)) {
                throw new Error('request cannot be array or function');
            }
            // if response !false check that it has specific properties
            if (!('url' in request)) {
                throw new Error('request.url was not specified');
            }
            return true;
        }
    }, {
        key: "isPersistentGetRequest",
        value: function isPersistentGetRequest(request) {
            this.isPersistentRequest(request);
            return true;
        }
    }, {
        key: "isPostRequest",
        value: function isPostRequest(request) {
            this.isPersistentRequest(request);
            if (!('data' in request)) {
                throw new Error('request.data was not defined!');
            }
            if (!this.$common.isObject(request.data)) {
                throw new Error('request.data is not a object or array!');
            }
            if (this.$common.isFunction(request.data)) {
                throw new Error('request.data cannot be function');
            }
            // all good!
            return true;
        }
    }, {
        key: "isOfflinePersistObj",
        value: function isOfflinePersistObj(obj) {
            return !!('meta' in obj && obj.meta.hasOwnProperty('offline-persist'));
        }
    }, {
        key: "isLokiDbObj",
        value: function isLokiDbObj(obj) {
            return !!('$loki' in obj && typeof obj.$loki === 'number' && !isNaN(obj.$loki));
        }
    }, {
        key: "buildFindQueryBasedOnUrlParams",
        value: function buildFindQueryBasedOnUrlParams(urlQueryParams) {
            var dbQuery = {};
            if (urlQueryParams.attr.length > 0) {
                var key = urlQueryParams.attr[0].name;
                dbQuery[key] = urlQueryParams.attr[0].pattern.indexOf('\d') >= 0 ? parseInt(urlQueryParams.attr[0].value) : urlQueryParams.attr[0].value + "";
            }
            return dbQuery;
        }
    }, {
        key: "buildUniqueIDValue",
        value: function buildUniqueIDValue(isPersistentUrl, value) {
            var isInt = function isInt() {
                if (isPersistentUrl.uri.tokens.length > 1) {
                    return isPersistentUrl.uri.tokens[isPersistentUrl.uri.tokens.length - 1].pattern.indexOf('\d') >= 0;
                } else {
                    return false;
                }
            };
            var parse = function parse(value) {
                return isInt() ? parseInt(value) : value + "";
            };
            if (this.$common.isEmpty(value)) {
                return parse(this.$common.getUID());
            }
            if (typeof value === 'number' && isInt()) {
                return value;
            }
            return parse(value);
        }
        /**
         * Transform the payload and add it into the $db!
         *
         * NOTE: Such a transformations could hold a lot of resources!
         *
         * @param collection
         * @param isPersistentUrl
         * @param payload
         * @returns {*}
         */

    }, {
        key: "handleGetRootArrayPayload",
        value: function handleGetRootArrayPayload(payload, isPersistentUrl, collection) {
            var _this2 = this;

            // check for key in the URL
            // 0 - in the tokens is always the /root path of the URL
            if (isPersistentUrl.uri.tokens.length > 1) {
                // so we know that this is the root, get everything
                var dbArray = collection.find();
                // for the merging!
                if (dbArray.length > 0) {
                    // get the name of the key to use to compare
                    // this is the second element in the tokens[] array
                    var keyNameToCompare = isPersistentUrl.uri.tokens[1].name;
                    // TODO: L.Pelov - Change this algorithm later to be able to work with ranges!
                    collection.removeWhere(function (dbObj) {
                        // this adds some overhead if the payload is big, as it will search through every time,
                        // however each time object was found in the payload it will be remove to increase search efficiency
                        var foundObjectIndex = payload.findIndex(function (payloadObj) {
                            // this will return true if object with the follow parameters found!
                            return payloadObj[keyNameToCompare] === dbObj[keyNameToCompare];
                        });
                        // if >-1 object was found
                        if (foundObjectIndex > -1) {
                            // now get the object and merge the properties!
                            try {
                                // merge the properties
                                // if object was changed offline, don't override the offline staff!
                                if (_this2.isOfflinePersistObj(dbObj)) {
                                    // don't override what was changed offline!
                                    dbObj = _this2.$common.deepExtend(payload[foundObjectIndex], dbObj);
                                } else {
                                    _this2.$common.extendOwn(dbObj, payload[foundObjectIndex]);
                                }
                                // and update the database
                                collection.update(dbObj);
                                // remove the object from the payload, to increase search index efficiency!
                                payload.splice(foundObjectIndex, 1);
                            } catch (e) {
                                _this2.logger.error(e);
                            } finally {
                                // make sure that false is returned!
                                return false;
                            }
                        } else {
                            if (_this2.isOfflinePersistObj(dbObj)) {
                                return false;
                            }
                            //bad for you baby you don't exist anymore, and you was not created offline, we have to delete you
                            return true;
                        }
                    });
                    // now check to see if there is something left in the payload and insert it into the db
                    payload.forEach(function (obj) {
                        // this situation should not happen, but better test!
                        if (_this2.isLokiDbObj(obj)) {
                            collection.update(obj);
                        } else {
                            collection.insert(obj);
                        }
                    });
                    // on the end return the new collection
                    return collection.find();
                }
                // if we don't have anything in the collection then just insert the payload
                return collection.insert(payload);
            }
            // we don't have a chance to compare without key specified in the config settings
            // wipe out all information not created offline and add the new payload
            collection.removeWhere(function (obj) {
                return !_this2.isOfflinePersistObj(obj);
                //return true;
            });
            // insert the new payload
            return collection.insert(payload);
        }
    }, {
        key: "handleGetRootObjectPayload",
        value: function handleGetRootObjectPayload(payload, isPersistentUrl, collection) {
            var _this3 = this;

            // check first again if we have key specified
            if (isPersistentUrl.uri.tokens.length > 1) {
                // get the name of the key to use to compare
                // this is usually the second in the tokens[] array
                var keyNameToCompare = isPersistentUrl.uri.tokens[1].name;
                // check if the object has the same key
                if (!payload.hasOwnProperty(keyNameToCompare)) {
                    this.logger.error('payload does not contain unique key specified in the URL settings');
                    throw new Error('payload does not contain unique key specified in the URL settings');
                }
                // we could use the key from the payload to query the db and see if there is already object with
                // the same ID
                var findObjByKeyQuery = {};
                findObjByKeyQuery[keyNameToCompare] = payload[keyNameToCompare];
                // let see if there is object with the same id
                var result = collection.findOne(findObjByKeyQuery);
                // if result, the object exist in the db, update it then!
                if (result) {
                    // ok we had something that much, remove the rest, but only if it's not marked offline
                    if (this.isOfflinePersistObj(result)) {
                        result = this.$common.deepExtend(payload, result);
                    } else {
                        this.$common.extendOwn(result, payload);
                    }
                    return collection.update(result);
                }
                // ok the object has the require ID but does not exist in the DB
                // so insert it now, but before that remove everything from here, except the offline objects we created!
                // collection.removeWhere(function(obj) {
                //      return (!obj.meta.hasOwnProperty('offline-persist'));
                // });
                // TODO: The question here is if we really want to save something that does not have any unique key defined!
                // if you here it means that the object does not exist in the DB, store it directly for now
                return collection.insert(payload);
            }
            // no keys specified delete everything that was not stored directly in the db and insert the new payload
            collection.removeWhere(function (obj) {
                return !_this3.isOfflinePersistObj(obj);
            });
            // insert the new payload
            return collection.insert(payload);
        }
        /**
         * Build nested property structure to be used in GET calls to setup or edit existing objects!
         *
         * @param queryParams  query parameters properties!
         * @returns {string}  prop1.prop2[value].prop3....
         * @deprecated  use buildNestedPropertyArrayParams
         */

    }, {
        key: "buildNestedPropertySearchString",
        value: function buildNestedPropertySearchString(queryParams) {
            var nestedProperty = "";
            if (queryParams.attr.length > 1) {
                // skips the first key we know that this is the object unique key!
                for (var i = 1; i < queryParams.attr.length; i++) {
                    // :_property
                    if (queryParams.attr[i].is) {
                        // prop.prop...
                        if (nestedProperty.length > 0) nestedProperty += "." + queryParams.attr[i].name;else nestedProperty += queryParams.attr[i].name;
                    }
                    // :id(\\d+)
                    else {
                            // prop.prop[value]...
                            if (nestedProperty.length > 0) {
                                nestedProperty += "." + queryParams.attr[i].name + "[" + queryParams.attr[i].value + "]";
                            } else {
                                //nestedProperty += queryParams.attr[i].name[queryParams.attr[i].value];
                                // TODO: Yuri - check with Lyudmil
                                nestedProperty += queryParams.attr[i].value;
                            }
                        }
                }
            }
            return nestedProperty;
        }
        /**
         * Has to be build a string of properties which can be used when adding new elements!
         *
         * @param queryParams
         * @param isPersistentUrl
         * @param isNotGet
         *
         * @return {Array<persistenceUtils~Property>} - array of properties with parameters and values
         */

    }, {
        key: "buildNestedPropertyArrayParams",
        value: function buildNestedPropertyArrayParams(isPersistentUrl, queryParams) {
            var isNotGet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // why string, it could be array of objects, easier to access and I can pass all properties I need!
            var nestedProperty = [];
            var params = queryParams.attr;
            // here we start from the
            if (Array.isArray(params) && params.length > 0) {
                var tokens = isPersistentUrl.uri.tokens.length > 1 ? isPersistentUrl.uri.tokens.slice(1) : [];
                // go over the parameters to construct the link
                for (var i = 0; i < params.length; i++) {
                    var isLast = params.length - 1 == i;
                    // :_property
                    if (params[i].is) {
                        // prop.prop...
                        // if (nestedProperty.length > 0) nestedProperty += "." + params[i].name;
                        // else nestedProperty += params[i].name;
                        nestedProperty.push({
                            name: params[i].name,
                            value: null,
                            isProperty: true,
                            isInteger: false
                        });
                        // So the issue here we have is following:
                        // - this is the last element and is property, so we have to check if in the tokens there
                        // another element after that that is key:value and if yes, we should use to generate the element
                        // - FIX: L.Pelov - this should be done only in POST, PUT or DELETE cases!
                        if (isLast && tokens[i + 1] && isNotGet) {
                            // check if there is additional element in the match to identify the key of this property!
                            // this will happen in case of POST, PUT DELETE
                            //nestedProperty += "." + tokens[i].name + "[" + $common.getUID() + "]";
                            var isInt = this.$utils.isUrlRegexInteger(tokens[i + 1].pattern);
                            nestedProperty.push({
                                name: tokens[i + 1].name,
                                value: isInt ? this.$common.getUID() : this.$common.getUID() + "",
                                isProperty: false,
                                isInteger: isInt
                            });
                        }
                    }
                    // :id(\\d+)
                    else {
                            // prop.prop[value]...
                            // if the property is empty create value!
                            var proValue = params[i].value || this.$common.getUID();
                            nestedProperty.push({
                                name: params[i].name,
                                value: proValue,
                                isProperty: false,
                                isInteger: this.$utils.isUrlRegexInteger(tokens[i].pattern)
                            });
                        }
                }
            }
            return nestedProperty;
        }
        /**
         * Search for that nested object and add the new payload to it, if any!
         *
         * @param obj
         * @param persistentUrlObj
         * @param queryParams
         * @param payload
         * @param dbPayload {Object} - payload that exists in local database
         * @returns {{obj: *, result: *}}
         */

    }, {
        key: "createObjFromUrlParamsForExistingForPost",
        value: function createObjFromUrlParamsForExistingForPost(obj, persistentUrlObj, queryParams, payload, dbPayload) {
            var nestedProperty = this.buildNestedPropertyArrayParams(persistentUrlObj, queryParams);
            var result = obj;
            if (Array.isArray(nestedProperty) && nestedProperty.length > 0) {
                var nestedQuery;
                if (dbPayload) {
                    var key = this.getKeyForCurrentObject(persistentUrlObj, queryParams);
                    nestedQuery = {
                        key: key,
                        value: dbPayload[key.name]
                    };
                }
                result = this.$utils.setNestedProperty2(obj, nestedProperty, payload, nestedQuery);
            } else {
                this.$common.extendOwn(obj, payload);
            }
            return {
                obj: obj,
                result: result
            };
        }
        /**
         * Returns current nested item key token
         * @param persistentUrlObj
         * @param queryParams
         * @returns {*}
         */

    }, {
        key: "getKeyForCurrentObject",
        value: function getKeyForCurrentObject(persistentUrlObj, queryParams) {
            var length = queryParams.attr.length;
            return persistentUrlObj.uri.tokens[length + 1];
        }
        /**
         * In case of given DB object but we have URL with sub parameters, we have to check if those nested obj exist,
         * and create them if not and add the payload inside.
         *
         * @param obj - object form the offline DB
         * @param queryParams - URL parameters, usually what is returned from $utils.extractKeyValuesFromUrl2
         * @param payload - from the REST API call
         * @return {{obj: *, result: *}}
         * @param persistentUrlObj
         */

    }, {
        key: "createObjFromUrlParamsForGETAction",
        value: function createObjFromUrlParamsForGETAction(obj, persistentUrlObj, queryParams, payload) {
            // NOTICE: since this is a get action we don't have to build the sub property
            var nestedProperty = this.buildNestedPropertyArrayParams(persistentUrlObj, queryParams, false);
            var result = obj;
            if (Array.isArray(nestedProperty) && nestedProperty.length > 0) {
                result = this.$utils.setNestedProperty2(obj, nestedProperty, payload);
            }
            return {
                obj: obj,
                result: result
            };
        }
        /**
         * Try to find that nested object when offline or when no payload in GET
         * @param obj
         * @param persistentUrlObj
         * @param queryParams
         * @returns {*}
         */

    }, {
        key: "getNestedPropertyFromUrlParamsForExisting",
        value: function getNestedPropertyFromUrlParamsForExisting(obj, persistentUrlObj, queryParams) {
            // build the nested property array to use to search for the object
            var nestedProperty = this.buildNestedPropertyArrayParams(persistentUrlObj, queryParams, false);
            // do only if nested property search required
            if (Array.isArray(nestedProperty) && nestedProperty.length > 0) {
                return this.$utils.getNestedProperty(obj, nestedProperty);
            }
            return obj;
        }
        /**
         * If forces, you could mark the object to be stored in the DB only and not synced!
         *
         * @param obj
         * @param force
         * @returns {*}
         */

    }, {
        key: "markObjAsOfflineIfForced",
        value: function markObjAsOfflineIfForced(obj, force) {
            // only if force positive
            if (force) {
                if (this.isOfflinePersistObj(obj)) {
                    delete obj.meta['offline-persist'];
                }
                return obj;
            }
            // since we updated that object make sure that is not going to be overridden
            if ('meta' in obj) {
                obj.meta['offline-persist'] = true;
                return obj;
            }
            obj['meta'] = {};
            obj.meta['offline-persist'] = true;
            return obj;
        }
        /**
         * Use only if you have no new data, empty payload, and you want to return everything from the db,
         * depending on the GET URL
         *
         * TODO: should be extended to be able to query sub element!
         * @param response{url}
         * @returns {*}
         */

    }, {
        key: "handleGet",
        value: function handleGet(response) {
            // check first the URL if defined for persistence!
            var parsed = this.$options.parseURL(response.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // no need to continue, if the URL was not configured!
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.get() given URI was not configured for persistence:' + parsed.path);
            }
            // get the parameters form the REST URL used to call the backend!
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(queryParams.root);
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            // search and get!:)
            if (!this.$common.isEmpty(keyValueObj)) {
                var result = collection.findOne(keyValueObj);
                // deep search in the object!
                if (result) {
                    var nestedObject = this.getNestedPropertyFromUrlParamsForExisting(result, isPersistentUrl, queryParams);
                    var cleanObject = this.$common.cleanObject(nestedObject);
                    return this.buildResponseObject(cleanObject);
                } else {
                    // nothing inside, sorry!
                    return null; // TODO: check if generic handler fine with this response (from generic handler: return [];)
                }
            } else {
                this.logger.debug('return all from db');
                var cleanObjects = this.$common.cleanObjects(collection.find());
                return this.buildResponseObject(cleanObjects);
            }
        }
        /**
         * Response property
         * @typedef persistenceRequestHandler~Response
         * @property url {String}
         * @property data {Object}
         */
        /**
         * Stores/merges given payload into the offline db!
         *
         * @param response {persistenceRequestHandler~Response}
         * @returns {*}
         */

    }, {
        key: "handleGetStore",
        value: function handleGetStore(response) {
            // check first the URL if defined for persistence!
            var parsed = this.$options.parseURL(response.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // no need to continue, if the URL was not configured!
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.get() given URI was not configured for persistence:' + parsed.path);
            }
            // get the parameters form the REST URL used to call the backend!
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(queryParams.root);
            // cache in between for easy access
            var payload = this.getResponsePayload(response);
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            if (!this.$common.isEmpty(keyValueObj)) {
                var result = collection.findOne(keyValueObj);
                var newObj = void 0;
                // this means that we have element with that key, so we have to update it
                if (result) {
                    // TODO: Address the possibility that some object could be marked as offline only!
                    newObj = this.createObjFromUrlParamsForGETAction(result, isPersistentUrl, queryParams, payload);
                    collection.update(newObj.obj);
                } else {
                    newObj = this.createObjFromUrlParamsForGETAction(keyValueObj, isPersistentUrl, queryParams, payload);
                    collection.insert(newObj.obj);
                }
                return this.buildResponseObject(newObj.result);
            } else {
                // ok no key in the url but we have payload and it should be added somewhere
                // this also means that we are in the root path!
                if (this.$common.isArray(payload) && !this.$common.isFunction(payload) && !this.$common.isEmpty(payload)) {
                    // if it is array of objects in the payload, then make a intersection
                    var items = this.handleGetRootArrayPayload(payload, isPersistentUrl, collection);
                    // build oracle rest response
                    return this.buildResponseObject(items);
                }
                // TODO: when is this case happen?
                // this is the situation where we have only object in the root path payload call NOT array!
                else if (this.$common.isObject(payload) && !this.$common.isArray(payload) && !this.$common.isFunction(payload) && !this.$common.isEmpty(payload)) {
                        return this.handleGetRootObjectPayload(payload, isPersistentUrl, collection);
                    } else {
                        // don't know what to do:)
                        this.logger.error('handleGetStore', 'unknown or empty object passed for the operation');
                        throw new Error('RequestHandler.handleGetStore -> unknown or empty object passed for the operation');
                    }
            }
        }
        /**
         * Handle post array payload.
         *
         * @param payload
         * @param isPersistentUrl
         * @param collection
         * @param force
         * @returns {*}
         */

    }, {
        key: "handlePostRootArrayPayload",
        value: function handlePostRootArrayPayload(payload, isPersistentUrl, collection, force) {
            var _this4 = this;

            var keyNameToCompare = isPersistentUrl.uri.tokens.length > 1 ? isPersistentUrl.uri.tokens[1].name : null;
            // go now throw what it was in the collection
            // and see if we have match to the new payload
            payload.forEach(function (obj) {
                if (_this4.isLokiDbObj(obj)) {
                    _this4.markObjAsOfflineIfForced(obj, force);
                    collection.update(obj);
                }
                // check if the payload has id,
                else if (keyNameToCompare && obj.hasOwnProperty(keyNameToCompare)) {
                        // try to find the element in the db, if there update, otherwise inside!
                        var result = collection.findOne({ keyNameToCompare: obj[keyNameToCompare] });
                        if (result) {
                            _this4.$common.extendOwn(result, obj);
                            _this4.markObjAsOfflineIfForced(result, force);
                            collection.update(result);
                        } else {
                            // insert
                            _this4.markObjAsOfflineIfForced(obj, force);
                            collection.insert(obj);
                        }
                    } else {
                        // if we don't have anything in the collection to compare
                        var objInsertResult = collection.insert(obj);
                        objInsertResult[keyNameToCompare] = _this4.buildUniqueIDValue(isPersistentUrl); //objInsertResult.$loki + "";
                        _this4.markObjAsOfflineIfForced(objInsertResult, force);
                        return _this4.$common.cleanObject(collection.update(objInsertResult));
                    }
            });
            // on the end return the new collection
            return this.$common.cleanObjects(collection.find());
        }
        /**
         * Handle post create object from only simple json object
         * @param payload
         * @param isPersistentUrl
         * @param collection
         * @param force {Boolean} mark the object as offline
         * @returns {*}
         */

    }, {
        key: "handlePostRootObjectPayload",
        value: function handlePostRootObjectPayload(payload, isPersistentUrl, collection, force) {
            // well check first again if we have key specified in the $options
            var keyNameToCompare = isPersistentUrl.uri.tokens.length > 1 ? isPersistentUrl.uri.tokens[1].name : '';
            // check if the object has the same key
            if (keyNameToCompare && !payload.hasOwnProperty(keyNameToCompare)) {
                this.logger.info('get payload', "does not have the key specified in the URL settings");
                // if not then we have to create one empty
                payload[keyNameToCompare] = '';
                // no need to query the db for this element
                // well this is completely new element and we should mark it as offline
                var insertResult = collection.insert(payload);
                if (insertResult) {
                    insertResult[keyNameToCompare] = this.buildUniqueIDValue(isPersistentUrl); //insertResult.$loki + "";
                    // this flag means that we created this directly in the offline db
                    this.markObjAsOfflineIfForced(insertResult, force);
                    return this.$common.cleanObject(collection.update(insertResult));
                }
                // else we have an issue here
                throw new Error('unable to store the payload object');
            }
            // ok this is the situation, where the key actually exist in the payload
            // let see if there is object with the same id
            else if (keyNameToCompare && payload.hasOwnProperty(keyNameToCompare)) {
                    // make sure that the payload
                    var queryForObject = {};
                    queryForObject[keyNameToCompare] = payload[keyNameToCompare];
                    //var result = collection.findOne({keyNameToCompare: payload[keyNameToCompare]});
                    var result = collection.findOne(queryForObject);
                    // this means that we have element with that key, so we have to update it
                    if (result) {
                        // merge properties!
                        this.$common.extendOwn(result, payload);
                        this.markObjAsOfflineIfForced(result, force);
                        return this.$common.cleanObject(collection.update(result));
                    }
                    // ok so if the above did not work, maybe there is a problem with the key string/int
                    payload[keyNameToCompare] = this.buildUniqueIDValue(isPersistentUrl, payload[keyNameToCompare]);
                }
            // if no key was specified in the URL option settings, we have no another option
            this.markObjAsOfflineIfForced(payload, force);
            return this.$common.cleanObject(collection.insert(payload));
        }
        /**
         * Handle Post HTTP request!
         *
         * @param response {persistenceRequestHandler~Response}
         * @param force - it means that the meta['offline-persist'] property will be deleted to force update on next GET
         * @returns {*}
         */

    }, {
        key: "handlePost",
        value: function handlePost(response, force) {
            var parsed = this.$options.parseURL(response.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // check if URL can be persist
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.post() given URI not configured for persistence: ' + parsed.path);
            }
            // get the parameters form the REST URL used to call the backend!
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(queryParams.root);
            // cache in between for easy access
            var payload = response.data;
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            // if not empty we can search
            if (!this.$common.isEmpty(keyValueObj)) {
                // find parent object
                var result = collection.findOne(keyValueObj);
                // ok post used URL with key, so we have to create sub element here
                if (result) {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(result, isPersistentUrl, queryParams, payload);
                    var propertyName = isPersistentUrl.uri.tokens[isPersistentUrl.uri.tokens.length - 1].name;
                    newObj.result[propertyName] = this.buildUniqueIDValue(isPersistentUrl, newObj.result[propertyName]);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.update(newObj.obj);
                    return this.$common.cleanObject(newObj.result);
                } else {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(keyValueObj, isPersistentUrl, queryParams, payload);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.insert(newObj.obj);
                    return this.$common.cleanObject(newObj.result);
                }
            }
            // this situation will happen when we have ROOT path call, with no KEY specified
            // ok no key in the url but we have payload and it should be added somewhere
            // this also means that we are in the root!
            if (this.$common.isArray(payload)) {
                return this.handlePostRootArrayPayload(payload, isPersistentUrl, collection, force);
            }
            // just object payload
            else if (this.$common.isObject(payload) && !this.$common.isArray(payload) && !this.$common.isNull(payload)) {
                    return this.handlePostRootObjectPayload(payload, isPersistentUrl, collection, force);
                }
            // dont' know what to do! :)!
            throw new Error("don't know what to do with the payload");
        }
        /**
         * Works like HTTP post
         * https://gist.github.com/wookiehangover/877067
         *
         * @param response
         * @param force
         * @returns {*}
         */

    }, {
        key: "handlePut",
        value: function handlePut(response, force) {
            var parsed = this.$options.parseURL(response.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // check if URL can be persist
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.post() given URI not configured for persistence: ' + parsed.path);
            }
            // get the parameters form the REST URL used to call the backend!
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(queryParams.root);
            // cache in between for easy access
            var payload = response.data;
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            // if we have attributed than the first one should be key we look for!
            if (!this.$common.isEmpty(keyValueObj)) {
                var result = collection.findOne(keyValueObj);
                // this means that we have element with that key, so we have to update it
                if (result) {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(result, isPersistentUrl, queryParams, payload);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.update(newObj.obj);
                    return newObj.result;
                } else {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(keyValueObj, isPersistentUrl, queryParams, payload);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.insert(newObj.obj);
                    return newObj.result;
                }
            }
            // ok following is in the case that you call PUT on root with parameters!
            // makes PUT to work like POST!
            if (this.$common.isArray(payload)) {
                return this.handlePostRootArrayPayload(payload, isPersistentUrl, collection, force);
            }
            // just object payload
            else if (this.$common.isObject(payload) && !this.$common.isArray(payload) && !this.$common.isNull(payload)) {
                    return this.handlePostRootObjectPayload(payload, isPersistentUrl, collection, force);
                }
            // dont' know:)!
            //throw new Error('unable to recognise the edit payload, it should be JSON Object or Array!');
            throw new Error('no key specified to recognise obj in the database for editing!');
        }
        /**
         * Works like HTTP post
         * https://gist.github.com/wookiehangover/877067
         *
         * @param response
         * @param force
         * @returns {*}
         */

    }, {
        key: "handlePatch",
        value: function handlePatch(response, force) {
            var parsed = this.$options.parseURL(response.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // check if URL can be persist
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.post() given URI not configured for persistence: ' + parsed.path);
            }
            // get the parameters form the REST URL used to call the backend!
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            // get the collection for the given url
            var collection = this.$db.getCollectionByName(queryParams.root);
            // cache in between for easy access
            var payload = response.data;
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            // if we have attributed than the first one should be key we look for!
            if (!this.$common.isEmpty(keyValueObj)) {
                var result = collection.findOne(keyValueObj);
                // this means that we have element with that key, so we have to update it
                if (result) {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(result, isPersistentUrl, queryParams, payload);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.update(newObj.obj);
                    return newObj.result;
                } else {
                    var newObj = this.createObjFromUrlParamsForExistingForPost(keyValueObj, isPersistentUrl, queryParams, payload);
                    this.markObjAsOfflineIfForced(newObj.obj, force);
                    collection.insert(newObj.obj);
                    return newObj.result;
                }
            }
            // ok following is in the case that you call PUT on root with parameters!
            // makes PUT to work like POST!
            if (this.$common.isArray(payload)) {
                return this.handlePostRootArrayPayload(payload, isPersistentUrl, collection, force);
            }
            // just object payload
            else if (this.$common.isObject(payload) && !this.$common.isArray(payload) && !this.$common.isNull(payload)) {
                    return this.handlePostRootObjectPayload(payload, isPersistentUrl, collection, force);
                }
            // dont' know:)!
            //throw new Error('unable to recognise the edit payload, it should be JSON Object or Array!');
            throw new Error('no key specified to recognise obj in the database for editing!');
        }
        /**
         * Delete specific element from the offline db
         *
         * @param request
         * @returns {*}
         */

    }, {
        key: "handleDelete",
        value: function handleDelete(request) {
            var parsed = this.$options.parseURL(request.url);
            var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
            // check if URL can be persist
            if (!isPersistentUrl) {
                throw new Error('Persistence.RequestHandler.post() given URI not configured for persistence: ' + parsed.path);
            }
            var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
            var collection = this.$db.getCollectionByName(queryParams.root);
            var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
            // if we have attributed in the request URL specified!!!
            if (!this.$common.isEmpty(keyValueObj)) {
                var findOne = collection.findOne(keyValueObj);
                if (findOne) {
                    return this.$common.cleanObject(collection.remove(findOne));
                }
                throw new Error('unable to find object with the given ID(%s) in the database' /*, keyValueObj*/);
            }
            // OK maybe the ID is in the payload!
            // NOTE: It is not good practice to have the ID in the payload, but it is possible!
            if (request.hasOwnProperty('data')) {
                var payload = request.data;
                if (!this.$common.isEmpty(payload) && this.$common.isObject(payload) && !this.$common.isArray(payload)) {
                    var keyNameToCompare = isPersistentUrl.uri.tokens.length > 1 ? isPersistentUrl.uri.tokens[1].name : null;
                    // check if the object has the same key
                    if (keyNameToCompare && !request.data.hasOwnProperty(keyNameToCompare)) {
                        throw new Error('payload does not have the key required to delete the object');
                    }
                    var findOne = collection.findOne({ keyNameToCompare: request.data[keyNameToCompare] });
                    if (findOne) {
                        return this.$common.cleanObject(collection.remove(findOne));
                    }
                }
            }
            this.logger.error('payload does not have the key required to delete the object in the payload');
            throw new Error('payload does not have the key required to delete the object in the payload');
        }
    }, {
        key: "postSuccessOperations",
        value: function postSuccessOperations(obj) {
            // process just post success responses
            if (obj.syncObj.method === 'POST') {
                var cpObj = this.$common.clone(obj);
                var parsed = this.$options.parseURL(cpObj.syncObj.url);
                var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
                // do this only if URL configured for persistence and noCache is FALSE
                // TODO: should we validate  || isPersistentUrl.isPolicy('noCache', true)
                if (!isPersistentUrl) {
                    this.logger.debug('sync post success operation exist');
                    return obj;
                }
                // get the parameters form the REST URL used to call the backend!
                var queryParams = this.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
                // get the collection for the given url
                var collection = this.$db.getCollectionByName(queryParams.root);
                var beforeSyncPayload = cpObj.syncObj.data;
                var response = cpObj.response;
                var keyValueObj = this.buildFindQueryBasedOnUrlParams(queryParams);
                // if not empty we have to deal with nested objects
                if (!this.$common.isEmpty(keyValueObj)) {
                    // find parent object
                    var parent = collection.findOne(keyValueObj);
                    // ok post used URL with key, so we have to create sub element here
                    if (parent) {
                        var result = this.createObjFromUrlParamsForExistingForPost(parent, isPersistentUrl, queryParams, response, beforeSyncPayload);
                        var propertyName = isPersistentUrl.uri.tokens[isPersistentUrl.uri.tokens.length - 1].name;
                        result.result[propertyName] = this.buildUniqueIDValue(isPersistentUrl, result.result[propertyName]);
                        collection.update(result.obj);
                        return this.$common.cleanObject(result.result);
                    }
                    // parent object not in cache should add with child object
                    else {
                            var newObj = this.createObjFromUrlParamsForExistingForPost(keyValueObj, isPersistentUrl, queryParams, response);
                            collection.insert(newObj.obj);
                            return this.$common.cleanObject(newObj.result);
                        }
                }
                // deal with root items
                else {
                        // well check first again if we have key specified in the $options
                        var keyNameToCompare = isPersistentUrl.uri.tokens.length > 1 ? isPersistentUrl.uri.tokens[1].name : '';
                        // check if the object has the same key
                        if (keyNameToCompare && !beforeSyncPayload.hasOwnProperty(keyNameToCompare)) {
                            response = this.$common.extendOwn(beforeSyncPayload, response);
                            return this.$common.cleanObject(collection.insert(response));
                        } else {
                            // find item by temporary id.
                            var queryForObject = {};
                            queryForObject[keyNameToCompare] = beforeSyncPayload[keyNameToCompare];
                            var _result = collection.findOne(queryForObject);
                            this.$common.extendOwn(_result, response);
                            return this.$common.cleanObject(collection.update(_result));
                        }
                    }
            }
            return obj;
        }
    }, {
        key: "flush",
        value: function flush(path) {
            var _this5 = this;

            this.logger.info('Persistence.RequestHandler.flush()', path);
            // if no path delete everything
            if (this.$common.isEmpty(path)) {
                return this.$db.flush();
            } else {
                var parsed = this.$options.parseURL(path);
                var isPersistentUrl = this.$utils.isPersistUrl(parsed.path);
                return new Promise(function (resolve, reject) {
                    // check if URL can be persist
                    if (!isPersistentUrl) {
                        reject(new Error('Persistence.RequestHandler.flush() given URI not configured for persistence: ' + parsed.path));
                    } else {
                        var queryParams = _this5.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
                        resolve(_this5.$db.getCollectionByName(queryParams.root).removeDataOnly());
                    }
                });
            }
        }
        // public methods!

    }, {
        key: "getDB",
        value: function getDB() {
            return this.$db;
        }
    }, {
        key: "get",
        value: function get(request) {
            var _this6 = this;

            var doGet = function doGet(request) {
                _this6.logger.info('get()');
                _this6.isPersistentGetRequest(request);
                // copy the object to make sure that we don't work with the reference anymore!
                var _request = _this6.$common.clone(request);
                if (!_request.hasOwnProperty('data') || _this6.$common.isEmpty(_request.data)) {
                    return _this6.$common.clone(_this6.handleGet(_request));
                }
                return _this6.$common.clone(_this6.handleGetStore(_request));
            };
            // return all as a promise
            return new Promise(function (resolve) {
                resolve(doGet(request));
            });
        }
        // actually this is the same as get but only for specific element

    }, {
        key: "post",
        value: function post(request, force) {
            var _this7 = this;

            var doPost = function doPost(request, force) {
                _this7.logger.info('post()');
                _this7.isPostRequest(request);
                // always clone before do some work with the object,
                // it takes some time but saves a lot of trouble!
                var _request = _this7.$common.clone(request);
                //return handlePost(_request, force);
                return _this7.$common.clone(_this7.handlePost(_request, force));
            };
            // promise
            return new Promise(function (resolve) {
                resolve(doPost(request, force));
            });
        }
    }, {
        key: "put",
        value: function put(request, force) {
            var _this8 = this;

            var doPut = function doPut(request, force) {
                _this8.logger.info('put()');
                _this8.isPostRequest(request);
                // always clone the object before do some work
                var _request = _this8.$common.clone(request);
                return _this8.$common.clone(_this8.handlePut(_request, force));
            };
            // promise
            //return Promise.resolve(doPut(request, force));
            return new Promise(function (resolve) {
                resolve(doPut(request, force));
            });
        }
    }, {
        key: "patch",
        value: function patch(request, force) {
            var _this9 = this;

            var doPatch = function doPatch(request, force) {
                _this9.logger.info('patch()');
                _this9.isPostRequest(request);
                // always clone the object before do some work
                var _request = _this9.$common.clone(request);
                return _this9.$common.clone(_this9.handlePatch(_request, force));
            };
            // promise
            //return Promise.resolve(doPut(request, force));
            return new Promise(function (resolve) {
                resolve(doPatch(request, force));
            });
        }
    }, {
        key: "delete",
        value: function _delete(request) {
            var _this10 = this;

            var doDelete = function doDelete(request) {
                _this10.logger.info('delete()');
                _this10.isPersistentRequest(request);
                // always clone the object before do some work
                var _request = _this10.$common.clone(request);
                return _this10.$common.clone(_this10.handleDelete(_request));
            };
            // promise
            //return Promise.resolve(doDelete(request));
            return new Promise(function (resolve) {
                resolve(doDelete(request));
            });
        }
        // provide the url and you will get the collection for it, as result from promise!

    }, {
        key: "data",
        value: function data(path) {
            var _this11 = this;

            var doData = function doData(path) {
                _this11.logger.info('data()');
                if (path == null) {
                    throw new Error('Path cannot be empty!');
                }
                var parsed = _this11.$options.parseURL(path);
                var isPersistentUrl = _this11.$utils.isPersistUrl(parsed.path);
                // check if URL can be persist
                if (!isPersistentUrl) {
                    throw new Error('post() given URI not configured for persistence: ' + parsed.path);
                }
                var queryParams = _this11.$utils.extractKeyValuesFromUrl2(isPersistentUrl);
                return _this11.$db.getCollectionByName(queryParams.root);
            };
            // promise
            //return Promise.resolve(doData(path));
            return new Promise(function (resolve) {
                resolve(doData(path));
            });
        }
    }, {
        key: "router",
        value: function router(request) {
            var _this12 = this;

            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return new Promise(function (resolve) {
                //resolve(doRouting(request, force));
                if (!_this12.isPersistentGetRequest(request)) {
                    _this12.logger.error('Passed object is not defined request for GET!', request.url);
                    throw new Error('Passed object is not defined request for GET!');
                }
                // check if method provided!
                if (!request.hasOwnProperty('method')) {
                    _this12.logger.error('request.method was not provided!', request);
                    throw new Error('request.method was not provided!');
                }
                // copy the object to make sure that we don't work with the reference anymore!
                var _request = _this12.$common.clone(request);
                // do routing!
                // if (_request.method === 'GET') {
                //     if (!_request.hasOwnProperty('data') || this.$common.isEmpty(_request.data)) {
                //         var result = handleGet(_request)
                //         return clone(result);
                //     }
                //     var result = handleGetStore(_request);
                //     return clone(result);
                // }
                // exec the router specified
                _request.method = _this12.$utils._normalizeMethod(_request.method);
                if (!_this12[_request.method]) {
                    _this12.logger.error('specified router is not implemented!');
                    throw new Error('specified router is not implemented!');
                }
                // exec the method
                var result = _this12[_request.method](_request, force);
                resolve(result);
            });
        }
    }]);

    return RequestHandler;
}();


},{"../../logger":13,"./db":36}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 * @ignore
 */
var SyncResourceType = {
  item: 0,
  collection: 1,
  file: 2
};
exports.SyncResourceType = SyncResourceType;


},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Synchronization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Yuri Panshin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _mobileEndpoint = require("./endpoint/mobile-endpoint");

var _logger = require("../logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Class that provides caching and synchronization capabilities. Callers should use
 * MobileBackend's [synchronization]{@link MobileBackend#synchronization} property.
 * @class
 * @global
 * @hideconstructor
 */
var Synchronization = function () {
    function Synchronization(backend, config, utils, platform, common, options, process) {
        _classCallCheck(this, Synchronization);

        this.config = config;
        this.utils = utils;
        this.platform = platform;
        this.common = common;
        this.options = options;
        this.process = process;
        // TODO: next version
        // /**
        //  * The number of cache misses during the current WebStarterApp lifetime.
        //  * @type {number}
        //  * @readonly
        //  */
        // this.cacheHitCount = 0;
        // TODO: next version
        // /**
        //  * The number of cache hits during the current WebStarterApp lifetime.
        //  * @type {number}
        //  * @readonly
        //  */
        // this.cacheMissCount = 0;
        this._endpoints = {};
        this.logger = new _logger.Logger('Synchronization');
        this.backend = backend;
        // save pointer to original isOnline method in case this method was not saved before
        if (!options['_originalIsOnline']) {
            options['_originalIsOnline'] = options.isOnline.bind(options);
        }
        var _isOffline = false;
        // replace sync express isOnline method with local method
        options.isOnline = function () {
            return _isOffline === false ? options['_originalIsOnline']() : !_isOffline;
        };
        this.setOfflineMode = function (isOffline) {
            _isOffline = typeof isOffline === 'boolean' ? isOffline : true;
        };
    }
    /**
     * Gets device network status which is currently being used by Synchronization.
     * @function
     * @name Synchronization#isOnline
     * @returns {Boolean}
     */


    _createClass(Synchronization, [{
        key: "isOnline",
        value: function isOnline() {
            return this.options.isOnline();
        }
        /**
         * Deletes all cached resources.
         * @function
         * @name Synchronization#purge
         */

    }, {
        key: "purge",
        value: function purge() {
            for (var apiName in this._endpoints) {
                if (this._endpoints.hasOwnProperty(apiName)) {
                    var api = this._endpoints[apiName];
                    for (var path in api) {
                        if (api.hasOwnProperty(path)) {
                            api[path].purge();
                        }
                    }
                }
            }
        }
    }, {
        key: "openEndpoint",

        /**
         * Open endpoint.
         * Returns a [MobileEndpoint]{@link MobileEndpoint} that provides access
         * to an endpoint in a custom code API.
         * @function
         * @name Synchronization#openEndpoint
         * @param {string} apiName The name of the custom code API
         * @param {string} endpointPath The endpoint in the custom code API
         * @returns {MobileEndpoint} A MobileEndpoint object.
         */
        value: function openEndpoint(apiName, endpointPath) {
            this._endpoints[apiName] = this._endpoints[apiName] || {};
            this._endpoints[apiName][endpointPath] = this._endpoints[apiName][endpointPath] || new _mobileEndpoint.MobileEndpoint(this, apiName, endpointPath, this.backend, this.utils, this.platform, this.common, this.options);
            return this._endpoints[apiName][endpointPath];
        }
        // TODO: next version
        // this._pin = function (resource) {
        //   this._pinnedUrls[resource.url] = mcs._PinStatePinned;
        //   resource.pinState = mcs._PinStatePinned;
        //
        //   this._store.saveResource(resource);
        //   this._store.savePinedResources(this._pinnedUrls);
        // };
        // TODO: next version
        // this._unpin = function (resource) {
        //   delete this._pinnedUrls[resource.url];
        //   resource.pinState = mcs._PinState.unpinned;
        //
        //   // PERSISTENCE: Only delete if no collection references this item!
        //   this._store.deleteResource(resource);
        //   this._store.savePinedResources(this._pinnedUrls);
        // }

    }, {
        key: "_run",
        value: function _run(callback) {
            return this.process.run(callback);
        }
    }, {
        key: "_runWithoutReadInBackground",
        value: function _runWithoutReadInBackground(callback) {
            return this.process.runWithoutReadInBackground(callback);
        }
    }]);

    return Synchronization;
}();

exports.Synchronization = Synchronization;


},{"../logger":13,"./endpoint/mobile-endpoint":27}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 */
// TODO: replace with enum in next typescript version
var HEADERS = exports.HEADERS = {
    ORACLE_MOBILE_DIAGNOSTIC_SESSION_ID: 'Oracle-Mobile-DIAGNOSTIC-SESSION-ID',
    ORACLE_MOBILE_DEVICE_ID: 'Oracle-Mobile-DEVICE-ID',
    ORACLE_MOBILE_CLIENT_REQUEST_TIME: 'Oracle-Mobile-CLIENT-REQUEST-TIME',
    ORACLE_MOBILE_ANALYTICS_APPLICATION_ID: 'Oracle-Mobile-Analytics-Application-Id',
    ORACLE_MOBILE_NAME: 'Oracle-Mobile-Name',
    ORACLE_MOBILE_CREATED_BY: 'Oracle-Mobile-Created-By',
    ORACLE_MOBILE_CREATED_ON: 'Oracle-Mobile-Created-On',
    ORACLE_MOBILE_MODIFIED_BY: 'Oracle-Mobile-Modified-By',
    ORACLE_MOBILE_MODIFIED_ON: 'Oracle-Mobile-Modified-On',
    ORACLE_MOBILE_SYNC_RESOURCE_TYPE: 'Oracle-Mobile-Sync-Resource-Type',
    ORACLE_MOBILE_SYNC_AGENT: 'Oracle-Mobile-Sync-Agent',
    LOCATION: 'Location',
    ORACLE_MOBILE_BACKEND_ID: 'Oracle-Mobile-Backend-Id',
    ORACLE_MOBILE_SOCIAL_IDENTITY_PROVIDER: 'Oracle-Mobile-Social-Identity-Provider',
    ORACLE_MOBILE_SOCIAL_ACCESS_TOKEN: 'Oracle-Mobile-Social-Access-Token',
    ORACLE_MOBILE_CLIENT_SDK_INFO: 'Oracle-Mobile-Client-SDK-Info',
    ACCEPT: 'Accept',
    CONTENT_TYPE: 'Content-Type',
    E_TAG: 'ETag',
    IF_MATCH: 'If-Match',
    AUTHORIZATION: 'Authorization',
    X_USER_IDENTITY_DOMAIN_NAME: 'X-USER-IDENTITY-DOMAIN-NAME',
    X_RESOURCE_IDENTITY_DOMAIN_NAME: 'X-RESOURCE-IDENTITY-DOMAIN-NAME',
    ACCEPT_ENCODING: 'Accept-Encoding'
};
var CONTENT_TYPES = exports.CONTENT_TYPES = {
    APPLICATION_JSON: 'application/json',
    TEXT_PLAIN: 'text/plain',
    X_WWW_FORM_FORM_URLENCODED: 'application/x-www-form-urlencoded; charset=utf-8'
};
var HTTP_METHODS = exports.HTTP_METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    POST: 'POST',
    DELETE: 'DELETE',
    HEAD: 'HEAD'
};
var RESOURCE_TYPES = exports.RESOURCE_TYPES = {
    ITEM: 'item',
    COLLECTION: 'collection',
    FILE: 'file'
};
var AUTHENTICATION_TYPES = exports.AUTHENTICATION_TYPES = {
    basic: 'basic',
    oauth: 'oauth',
    facebook: 'facebook',
    token: 'token'
};
var MODULE_NAMES = exports.MODULE_NAMES = {
    STORAGE: 'Storage',
    AUTHORIZATION: 'Authorization',
    USER_MANAGEMENT: 'UserManagement',
    APP_POLICES: 'AppPolicies',
    LOCATION: 'Location',
    SYNC: 'Sync',
    SYNC_EXPRESS: 'SyncExpress',
    NOTIFICATIONS: 'Notifications',
    MCS_ANALYTICS: 'MCSAnalytics',
    ANALYTICS: 'Analytics',
    CUSTOM_CODE: 'CustomCode',
    APP_CONFIG: 'AppConfig'
};
var PLATFORM_NAMES = exports.PLATFORM_NAMES = {
    JAVASCRIPT: 'Javascript',
    CORDOVA: 'Cordova'
};
var PLATFORM_ID = exports.PLATFORM_ID = {
    ANDROID: 'android',
    IOS: 'ios'
};
var NOTIFICATION_PROVIDER = exports.NOTIFICATION_PROVIDER = {
    FCM: 'FCM',
    APNS: 'APNS',
    WNS: 'WNS',
    SYNIVERSE: 'SYNIVERSE'
};
var XML_HTTP_REQUEST_RESPONSE_TYPE = exports.XML_HTTP_REQUEST_RESPONSE_TYPE = {
    JSON: 'json',
    BLOB: 'blob'
};


},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
var Utils = exports.Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'removeSpace',
        value: function removeSpace(input) {
            return input.replace(/ /g, '');
        }
    }, {
        key: 'uuid',
        value: function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }
    }, {
        key: 'validateConfiguration',
        value: function validateConfiguration(input) {
            var prop = input;
            if (/\s/.test(prop) && prop) {
                prop = this.removeSpace(input);
            }
            return prop;
        }
    }, {
        key: 'encodeBase64',
        value: function encodeBase64(input) {
            var output = "";
            var chr1,
                chr2,
                chr3 = "";
            var enc1,
                enc2,
                enc3,
                enc4 = "";
            var i = 0;
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + Utils.KEY_STR.charAt(enc1) + Utils.KEY_STR.charAt(enc2) + Utils.KEY_STR.charAt(enc3) + Utils.KEY_STR.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        }
    }, {
        key: 'decodeBase64',
        value: function decodeBase64(input) {
            var output = "";
            var chr1,
                chr2,
                chr3 = "";
            var enc1,
                enc2,
                enc3,
                enc4 = "";
            var i = 0;
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                return null;
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                enc1 = Utils.KEY_STR.indexOf(input.charAt(i++));
                enc2 = Utils.KEY_STR.indexOf(input.charAt(i++));
                enc3 = Utils.KEY_STR.indexOf(input.charAt(i++));
                enc4 = Utils.KEY_STR.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        }
    }, {
        key: 'hasValue',
        value: function hasValue(obj, key, value) {
            return obj.hasOwnProperty(key) && obj[key] === value;
        }
    }, {
        key: 'isEquivalentURL',
        value: function isEquivalentURL(url1, url2) {
            if (url1.indexOf("https") === 0 && url2.indexOf("https") === 0) {
                url1 = this.getPort(url1) === 443 ? url1.replace(':443', '') : url1;
                url2 = this.getPort(url2) === 443 ? url2.replace(':443', '') : url2;
            } else if (url1.indexOf("https") === -1 && url2.indexOf("https") === -1) {
                url1 = this.getPort(url1) === 80 ? url1.replace(':80', '') : url1;
                url2 = this.getPort(url2) === 80 ? url2.replace(':80', '') : url2;
            }
            return url1.indexOf(url2) === 0;
        }
    }, {
        key: 'getPort',
        value: function getPort(url) {
            var colonIdx = url.indexOf(':', 7);
            var slashIdx = url.indexOf('/', colonIdx);
            if (colonIdx > 0 && slashIdx == -1) {
                slashIdx = url.length;
            }
            var port = url.substr(colonIdx + 1, slashIdx - colonIdx - 1);
            if (port && !isNaN(port * 1)) {
                return port * 1;
            } else {
                return -1;
            }
        }
        /**
         * Convert headers string to dictionary with lowercase keys.
         * @param {string} headerStr
         * @return {object}
         */

    }, {
        key: 'parseHeaders',
        value: function parseHeaders(headerStr) {
            var headers = {};
            if (!headerStr) {
                return headers;
            }
            var headerPairs = headerStr.split('\r\n');
            for (var i = 0, ilen = headerPairs.length; i < ilen; i++) {
                var headerPair = headerPairs[i];
                var index = headerPair.indexOf(': ');
                if (index > 0) {
                    headers[headerPair.substring(0, index).toLowerCase()] = headerPair.substring(index + 2);
                }
            }
            return headers;
        }
    }, {
        key: 'normalizeHeaderKeys',
        value: function normalizeHeaderKeys(responseHeaders) {
            var headers = {};
            // jasmin headers
            if (this.isArray(responseHeaders)) {
                var array = responseHeaders;
                for (var i = 0; i < array.length; i++) {
                    headers[array[i].name.toLowerCase()] = array[i].value;
                }
            } else {
                for (var key in responseHeaders) {
                    if (responseHeaders.hasOwnProperty(key)) {
                        headers[key.toLowerCase()] = responseHeaders[key];
                    }
                }
            }
            return headers;
        }
    }, {
        key: 'isArray',
        value: function isArray(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
    }, {
        key: 'isCordova',
        value: function isCordova() {
            return typeof window['cordova'] != 'undefined';
        }
        /**
         * Checks to see if the string ends with a suffix.
         * @return {boolean}
         */

    }, {
        key: 'strEndsWith',
        value: function strEndsWith(str, suffix) {
            return str.match(suffix + '$') == suffix;
        }
    }, {
        key: 'hashCode',
        value: function hashCode(input) {
            return input.split('').reduce(function (acc, char) {
                acc = (acc << 5) - acc + char.charCodeAt(0);
                return acc & acc;
            }, 0);
        }
    }]);

    return Utils;
}();

Utils.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


},{}]},{},[14]);
exportMCS(_module, _exports, _define, _window, _global, _self, _this, cxa);
})(typeof module === "undefined" ? undefined : module, typeof exports === "undefined" ? undefined : exports, typeof define === "undefined" ? undefined : define, typeof window === "undefined" ? undefined : window, typeof global === "undefined" ? undefined : global, typeof self === "undefined" ? undefined : self, this);
