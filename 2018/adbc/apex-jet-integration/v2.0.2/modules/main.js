
requirejs.config(
  {
    paths:
      {
        'knockout': './oraclejet/2.0.2/js/libs/knockout/knockout-3.4.0',
        'css': './oraclejet/2.0.2/js/libs/require-css/css'
      },
  }
);

require(['knockout', 'ojs/ojknockout', 'ojs/ojmodule', 'css!./oraclejet/2.0.2/css/libs/oj/v2.0.2/alta/oj-alta-notag-min.css'],
  function (ko) {
    var definedModules = require.s.contexts._.defined;
    definedModules['ojs/ojcore'].ModuleBinding.defaults.viewPath = 'text!../adbc/apex-jet-integration/v2.0.2/modules/views/';
    definedModules['ojs/ojcore'].ModuleBinding.defaults.modelPath = '../adbc/apex-jet-integration/v2.0.2/modules/viewModels/';

    function mainModel() {
      var self = this;
    }
    ko.applyBindings(new mainModel(), document.body);
  }); 