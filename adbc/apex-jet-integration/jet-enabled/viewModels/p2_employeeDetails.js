define(['ojs/ojcore', 'knockout'],
 function (oj, ko) {
    function employeeViewModel() {
        var self = this;

        self.rowData = ko.observable({});
    }

    return new employeeViewModel;
});
