/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe', 'viewModels/listas', 'ojs/ojprogress', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox', 'ojs/ojlabel'],
    function (oj, ko, $, app, mbe) {

        function ListaViewModel() {
            var self = this;

            function getBeacons(){
                var nombre = 'Market';
                mbe.beacons(nombre,
                  function(response){
                    var beacons = response.data.items[0].devices;
                    for(var i in beacons){
                        var beacon = beacons[i];
                        self.mRegions.push({
                            id: beacon.id,
                            name: beacon.name,
                            description: beacon.description,
                            uuid: beacon.beacon.iBeacon.uuid,
                            major: beacon.beacon.iBeacon.major,
                            minor: beacon.beacon.iBeacon.minor,
                            identifier: beacon.attributes.identifier
                        });
                    }
                    detectBeacons();
                  },
                  function(response){
                    console.log(response);
                  });
            }

            var detectBeacons = function(){
                var delegate = new cordova.plugins.locationManager.Delegate();
                
                delegate.didStartMonitoringForRegion = function (pluginResult) {};
                delegate.didDetermineStateForRegion = function (pluginResult) {};
                delegate.didRangeBeaconsInRegion = function(pluginResult) {
                    if(pluginResult.beacons.length > 0){
                        var beacon = convertToBeacon(pluginResult);
                        updateDistance(beacon);
                    }
                }
                // delegate.didEnterRegion = function(pluginResult){}
                // delegate.didExitRegion = function(pluginResult){};

                cordova.plugins.locationManager.setDelegate(delegate);
                cordova.plugins.locationManager.requestAlwaysAuthorization();
                for(var i in self.mRegions){
                    var b = self.mRegions[i];
                    var br = new cordova.plugins.locationManager.BeaconRegion(b.identifier, b.uuid, b.minor, b.major);
                    cordova.plugins.locationManager.startMonitoringForRegion(br);
                    cordova.plugins.locationManager.startRangingBeaconsInRegion(br);
                };
                // mNearestBeaconDisplayTimer = setInterval(displayNearestBeacon, 1000);  
            }

            var convertToBeacon = function(pluginResult){
                var beacon = {};
                for(var i=0; i<self.mRegions.length;i++){
                  if(self.mRegions[i].identifier == pluginResult.region.identifier){
                    beacon = {                        
                        id: self.mRegions[i].id,
                        name: self.mRegions[i].name,
                        description: self.mRegions[i].description,
                        identifier: pluginResult.region.identifier,
                        accuracy: pluginResult.beacons[0].accuracy
                    };
                  }
                }
                return beacon;
            }

            var updateDistance = function(beaconDetected){
                for(var i=0; i<self.items().length; i++){
                    if(self.items()[i].seccion && self.items()[i].seccion == beaconDetected.identifier){
                        var distancia = beaconDetected.accuracy;
                        var zona = 'Sección: '+beaconDetected.description;
                        if(beaconDetected.accuracy <= 1){
                            zona = 'Has llegado';
                            distancia = 0;
                        }                            
                        self.items()[i].zona(zona);
                        self.items()[i].distancia(distancia);
                    }
                }                           
            }

            self.reload = function(){
                console.log("reload");
                self.selectedItems([]);
                self.mRegions = [];

                app.showLoad(true);
                app.progressValue(-1);
                setTimeout(function () {
                    app.showLoad(false);
                }, 5000);
                getItems();

                // DELETE ITEMS
                // var items = self.selectedItems();
                // self.selectedItems();
                // var sql = 'DELETE FROM "ProductList" WHERE "id" IN (';
                // var payload = {}
                // for(var i=0;i<items.length; i++){
                //     sql += ':id'+i+',';
                //     payload["id"+i] = items[i]+"";
                // }
                // sql = sql.substring(0, sql.length - 1);
                // sql +=')';
                // payload.sql = sql;
                // app.showLoad(true);
                // app.progressValue(-1);
                // setTimeout(function () {
                //     app.showLoad(false);
                // }, 5000);
                
                // mbe.sql(payload,
                //     function(response){
                //         getItems();
                //     },
                //     function(response){
                //         alert('Error inesperado');
                // });
            }

            self.checkItems = function(){
                console.log("Check items");
                
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
                                                    seccion: products[j].seccion,
                                                    nombre: products[j].nombre,
                                                    unidades: data[i].unidades,
                                                    distancia: ko.observable(-1),
                                                    zona: ko.observable()
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
                                    getBeacons();
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

            self.handleCheckbox = function(id) {
                return self.selectedItems().indexOf(id) == -1 ? [] : ["checked"];
            };
            self.checkboxListener = function (event, data) {
                if(event.detail != null){
                    var value = event.detail.value;
                    if(value.length > 0){
                        self.selectedItems.push(data.id);
                    }else{
                        self.selectedItems.splice(self.selectedItems().indexOf(data.id), 1);
                    }
                }                
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

                self.mRegions = [];

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
