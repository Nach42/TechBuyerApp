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
        if(token === sessionStorage.getItem('token')){
          mbe.init();
          mbe.authenticate(
            function(response, data){
              mbe.checkUser(app.email(), 
                function(response){
                  app.showLoad(false);
                  console.log('Existe el usuario');
                },
                function(response){
                  app.showLoad(false);
                  if(response.statusCode == 400){
                    var payload = {
                      table: 'Usuarios',
                      email: app.email(),
                      nombre: app.username()
                    }
                    mbe.insertUser(payload,
                      function(response){
                        app.showLoad(false);
                        console.log(response);
                      },
                      function(response){
                        console.log(response);
                    });
                  }
              });
              app.flag(true);
              app.router.go("listas");
            },
            function(statusCode, data){
              console.log("fallo al conectar");
          });
        }
      };

      self.signIn = function(){
        console.log("Entrando en signIn");
        app.showLoad(true);
        app.progressValue(-1);
        window.plugins.googleplus.login({
            'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '197286188976-qmug2hoh9ahipj7tbgi9cp9jb936ne5b.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': false // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (obj) {
            var idToken = obj.idToken;
            var accessToken = obj.accessToken;
            var name = obj.displayName;
            var email = obj.email;
            var img = obj.imageUrl;
            var user = {
              name: name,
              email: email
            }
            sessionStorage['token'] = idToken;
            sessionStorage['user'] = JSON.stringify(user);

            app.username(name);
            app.email(email);
            app.img(img);
            // log into your backend webservice:
            self.login(idToken);
          },
          function (msg) {
            alert('Error al conectar');
        });
      }

      self.connected = function() {
        if(sessionStorage.getItem('token')){
          app.flag(true);
          app.router.go('listas');
        }

        // require(['googleApi'], function () {
        //   self.googleapi = window.gapi; // just in case the api is needed anywhere else in our code, e.g. for a logout function
        //   self.googleapi.load('auth2', function (auth2) {
        //     // Retrieve the singleton for the GoogleAuth library and set up the client.
        //     auth2 = self.googleapi.auth2.init({
        //       client_id: '197286188976-qmug2hoh9ahipj7tbgi9cp9jb936ne5b.apps.' +
        //         'googleusercontent.com',
        //       cookiepolicy: 'none'
        //     });
        //     auth2.attachClickHandler(
        //       $('#google-signin-button')[0], // attach the handler to this button
        //       {},
        //       function (googleUser) {
        //         var profile = googleUser.getBasicProfile();
        //         var token = googleUser.getAuthResponse().id_token;
        //         var name = profile.getName();
        //         var email = profile.getEmail();
        //         var img = profile.getImageUrl();
        //         // safe the user data to your ViewModel's variables:
        //         var user = {
        //           name: name,
        //           email: email
        //         }
        //         sessionStorage['token'] = token;
        //         sessionStorage['user'] = user;
  
        //         app.username(name);
        //         app.email(email);
        //         app.img(img);
        //         // log into your backend webservice:
        //         self.login(token);
        //       },
        //       function () {
        //         console.error('Error, try again');
        //       }
        //     );
        //   });
        // });
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
