/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe'],
 function(oj, ko, $, app, mbe) {
  
    function DashboardViewModel() {
      var self = this;
      //self.isLoggedIn = ko.observable(false);

      self.login = function(token){
        //Comprobar si el user está guardado en la base de datos
        if(token === sessionStorage.getItem('token')){
          //mbe.authenticate(self.loginSuccess, self.loginFailure);
          console.log('login');
          app.flag(true);
          app.router.go("customers");
        }
      };

      // self.loginSuccess = function (response) {
      //   console.log(response);
      //   self.isLoggedIn(true);
      // };

      // self.loginFailure = function (statusCode) {
      //     self.isLoggedIn(false);
      //     alert("Login failed! " + statusCode);
      // };

      self.connected = function() {
        if(sessionStorage.getItem('token')){
          app.flag(true);
          app.router.go('customers');
        }

        require(['googleApi'], function () {
          self.googleapi = window.gapi; // just in case the api is needed anywhere else in our code, e.g. for a logout function
          self.googleapi.load('auth2', function (auth2) {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = self.googleapi.auth2.init({
              client_id: '197286188976-qmug2hoh9ahipj7tbgi9cp9jb936ne5b.apps.' +
                'googleusercontent.com',
              cookiepolicy: 'single_host_origin'
            });
            auth2.attachClickHandler(
              $('#google-signin-button')[0], // attach the handler to this button
              {},
              function (googleUser) {
                var profile = googleUser.getBasicProfile();
                var token = googleUser.getAuthResponse().id_token;
                var name = profile.getName();
                var email = profile.getEmail();
                var img = profile.getImageUrl();
                // safe the user data to your ViewModel's variables:
                var user = {
                  name: name,
                  email: email
                }
                sessionStorage['token'] = token;
                sessionStorage['user'] = user;
  
                app.username(name);
                app.email(email);
                app.img(img);
                // log into your backend webservice:
                self.login(token);
              },
              function () {
                console.error('Error, try again');
              }
            );
          });
        });
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
