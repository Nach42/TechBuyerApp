/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe', 'viewModels/listas', 'ojs/ojprogress'],
    function (oj, ko, $, app, mbe, listas) {

        function ListaViewModel() {
            var self = this;

            self.deleteItems = function(){
                var items = self.selectedItems();
                self.selectedItems();
                var sql = 'DELETE FROM "ProductList" WHERE "id" IN (';
                var payload = {}
                for(var i=0;i<items.length; i++){
                    sql += ':id'+i+',';
                    payload["id"+i] = items[i]+"";
                }
                sql = sql.substring(0, sql.length - 1);
                sql +=')';
                payload.sql = sql;
                app.showLoad(true);
                app.progressValue(-1);
                setTimeout(function () {
                    app.showLoad(false);
                }, 5000);
                
                mbe.sql(payload,
                    function(response){
                        getItems();
                    },
                    function(response){
                        alert('Error inesperado');
                });
            }

            self.deleteList = function(){
                sessionStorage.removeItem('lista');
                var listId = self.listId;
                var payload = {
                    sql: 'DELETE FROM "Lists" WHERE "id"=:listId',
                    listId: listId
                }
                app.showLoad(true);
                app.progressValue(-1);
                setTimeout(function(){ 
                    app.showLoad(false);
                  }, 5000);
                mbe.sql(payload,
                    function(response){
                      var payload = {
                        sql: 'DELETE FROM "ProductList" WHERE "listId"=:listId',
                        listId: listId+""
                      }
                      mbe.sql(payload,
                        function(response){
                          app.router.go('listas');
                        },
                        function(response){
                          console.log(response);
                        });
                    },
                    function(response){
                      console.log(response);
                });
            }

            function getItems(){
                var listId = self.listId+"";
                var payload = {
                    sql: 'SELECT * FROM "ProductList" WHERE "listId"=:listId',
                    listId: listId
                }
                mbe.sql(payload,
                    function (response) {
                        var data = response.data.items;
                        if(data.length > 0){
                            var sql= 'SELECT * FROM "Products" WHERE "id_product" IN (';
                            var payload = {}
                            for(var i=0;i<data.length; i++){
                                sql += ':id'+i+',';
                                payload["id"+i] = data[i].productId;
                            }
                            sql = sql.substring(0, sql.length - 1);
                            sql +=')';
                            payload.sql = sql;
                            mbe.sql(payload,
                                function(response){
                                    var products =  response.data.items;
                                    var items = [];
                                    for (var i = 0; i < data.length; i++) {
                                        for(var j = 0; j < products.length; j++){
                                            if(data[i].productId == products[j].id_product){
                                                items.push({
                                                    id: data[i].id,
                                                    nombre: products[j].nombre,
                                                    unidades: data[i].unidades
                                                });
                                            }
                                        }                                    
                                    }
                                    for(var i = 0; i<items.length; i++){
                                        mbe.traductor(items[i].nombre, function(response){
                                            items[i].nombre = response.data.translations[0].translatedText;
                                        });
                                    }
                                    self.items(items);
                                    app.showLoad(false);
                                },
                                function(error){
                                    console.log(error);
                                });
                        }else{
                            app.showLoad(false);
                        }                                            
                    },
                    function (response) {
                        console.log(response);
                    });
            }

            self.connected = function () {
                if (sessionStorage.getItem('token') && sessionStorage.getItem('lista')) {
                    app.flag(true);
                } else {
                    app.flag(false);
                    app.router.go('login');
                }
                var lista = JSON.parse(sessionStorage.getItem('lista'));
                self.listId = lista.id;
                self.listName = ko.observable(lista.nombre);
                self.selectedItems = ko.observableArray([]);

                self.items = ko.observableArray();
                self.dataSource = new oj.ArrayDataProvider(self.items, { 'idAttribute': 'id' });
                app.showLoad(true);
                app.progressValue(-1);
                setTimeout(function () {
                    app.showLoad(false);
                }, 5000);
                getItems();
            };

            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            self.disconnected = function () {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            self.transitionCompleted = function () {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new ListaViewModel();
    }
);
