requirejs.config(
  {
    paths:
      {
        'knockout': './oraclejet/2.0.2/js/libs/knockout/knockout-3.4.0',
      },
  }
);

require(['knockout', 'ojs/ojknockout', 'ojs/ojselectcombobox'],
  function (ko) {
    function mainModel() {
      var self = this;
    }
    ko.applyBindings(new mainModel(), document.body);
  }); 