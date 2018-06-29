/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * employeeDetail module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'factories/employeesFactory', 'ojs/ojknockout', 'promise'
            , 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource',
    , 'ojs/ojarraydataprovider', 'ojs/ojlabel'
], function (oj, ko, $, employeesFactory) {
    /**
     * The view model for the main content view template
     */
    function employeeDetailContentViewModel() {
        var self = this;
        /*
         var viewModel = {
         employeesCollection: employeesFactory.createEmployeesCollection(),
         datasource: ko.observable(),
         // Called each time the view is shown to the user:
         initialize: function () {
         this.datasource(new oj.CollectionTableDataSource(this.employeesCollection));
         this.employeesCollection.fetch();
         }
         }; */

        self.employeesCollection = employeesFactory.createEmployeesCollection();
        self.datasource = ko.observable();
        self.datasource(new oj.CollectionTableDataSource(this.employeesCollection));
        self.employeesCollection.fetch();

        /*
         var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
         {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
         {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
         {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
         {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
         {DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
         {DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
         {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
         {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
         {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
         {DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
         {DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
         {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
         {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
         {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}];
         self.deptObservableArray = ko.observableArray(deptArray);
         self.dataprovider = new oj.ArrayDataProvider(self.deptObservableArray, {idAttribute: 'DepartmentId'});
         */
/*
        //add to the observableArray
        self.addRow = function ()
        {
            var dept = {
                'ename': self.inputEmployeeName(),
                'job': self.inputJob(),
                'sal': self.inputSalary()
            };
            self.deptObservableArray.push(dept);
        };
        
*/
        //used to update the fields based on the selected row
        self.updateRow = function ()
        {
            var model = self.employeesCollection.get(self.workingId());
            model.save(
                    {'ename': self.inputEmployeeName()
                        , 'job': self.inputJob()
                        , 'sal': self.inputSalary()}
            , {
                success: function (myModel, response, options) {
                    console.log('Changes saved');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Update failed with: " + textStatus);
                }
            });
        };

        /*
         //used to remove the selected row
         self.removeRow = function ()
         {
         var element = document.getElementById('tableDetail');
         var currentRow = element.currentRow;
         if (currentRow != null)
         {
         self.deptObservableArray.splice(currentRow['rowIndex'], 1);
         }
         };
         */
        //intialize the observable values in the forms
        self.inputEmployeeName = ko.observable();
        self.inputJob = ko.observable();
        self.inputSalary = ko.observable();
        self.workingId = ko.observable();

        self.currentRowListener = function (event)
        {
            self.workingId(event.detail.value.rowKey);
            self.datasource().get(self.workingId()).then(function (row) {
                self.inputEmployeeName(row.data.ename);
                self.inputJob(row.data.job);
                self.inputSalary(row.data.sal);
            });
        };
    }


    return employeeDetailContentViewModel;
});
