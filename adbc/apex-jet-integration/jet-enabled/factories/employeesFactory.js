/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore'], function (oj) {
    var employeesFactory = {
        //resourceUrl: 'http://localhost:32513/ords/sandbox/hr/employees',
        resourceUrl: 'https://apexea.oracle.com/pls/apex/adbc/hr/employees/',
        // Create a single employee instance:
        createEmployeeModel: function () {
            var employee = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "empno"
            });
            return new employee();
        },
        // Create a employees collection:
        createEmployeesCollection: function () {
            var employees = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createEmployeeModel()
            });
            return new employees();
        }
    };
    return employeesFactory;
});