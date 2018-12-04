/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe', 'ojs/ojarraydataprovider', 'ojs/ojprogress'],
 function(oj, ko, $, app, mbe) {
  
    function CustomerViewModel() {
      var self = this;

      self.deleteLists = function(){
        var items = self.selectedItems();
        self.selectedItems();
        var query = "";
        for(var i=0; i<items.length; i++){
          query += items[i]+",";
        }
        query = query.substring(0, query.length - 1);
        var payload = {
          sql: 'DELETE FROM "Lists" WHERE "id" IN ('+ query +')'
        }
        app.showLoad(true);
        app.progressValue(-1);
        mbe.sql(payload,
          function(response){
            var payload = {
              sql: 'DELETE FROM "ProductList" WHERE "listId" IN ('+ query +')'
            }
            mbe.sql(payload,
              function(response){
                console.log(response);
                setTimeout(function(){ 
                  app.showLoad(false);
                }, 5000);
                getListas();
              },
              function(response){
                console.log(response);
              });
          },
          function(response){
            console.log(response);
          });
      }

      function getListas(){
        var payload = {
          sql: 'SELECT * FROM "Lists" WHERE "email"=:email',
          email: app.email()
        }
        mbe.sql(payload,
          function(response){
            var data = response.data.items;
            for(var i=0;i<data.length;i++){
              data[i].createdOn = parserFecha(new Date(data[i].createdOn));
            }
            self.listas(data);
            app.showLoad(false);
          },
          function(response){
            console.log(response);
          });
      }

      function parserFecha(val) {
        var dd = val.getDate();
        var mm = val.getMonth() + 1;
        var yyyy = val.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
      }

      self.connected = function() {
        if(sessionStorage.getItem('token')){
          app.flag(true);
        }else{
          app.flag(false);
          app.router.go('login');
        }
        self.selectedItems = ko.observableArray([]);
        self.listas = ko.observableArray();
        self.dataSource = new oj.ArrayDataProvider(self.listas, {'idAttribute': 'id'});

        app.showLoad(true);
        app.progressValue(-1);
        setTimeout(function(){ 
          app.showLoad(false);
        }, 5000);
        getListas();
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
    return new CustomerViewModel();
  }
);
