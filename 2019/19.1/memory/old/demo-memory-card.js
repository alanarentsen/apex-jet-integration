requirejs.config(
    {
      paths:
        {
          'knockout': './oraclejet/4.2.0/js/libs/knockout/knockout-3.4.0',
          'css': './oraclejet/4.2.0/js/libs/require-css/css',
          'jet-composites': '/18.2'
        },
    }
  );

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojcomposite',
"jet-composites/memory/demo-memory-game/loader", 'ojs/ojinputnumber', 'ojs/ojpopup'], 
function(oj, ko, $) {
    function model() {      
      var self = this;
      self.attempts = ko.observable(0);

      self.chartImages = [
        {value: 'donut chart', url: '/18.2/memory/demo-memory-game/images/donutchart_list.png'}, 
        {value: 'pie chart', url: '/18.2/memory/demo-memory-game/images/piechart_list.png'},
        {value: 'scatter chart', url: '/18.2/memory/demo-memory-game/images/scatterchart_list.png'},
        {value: 'bubble chart', url: '/18.2/memory/demo-memory-game/images/bubblechart_list.png'},
        {value: 'pyramid chart', url: '/18.2/memory/demo-memory-game/images/pyramidchart_list.png'},
        {value: 'funnel chart', url: '/18.2/memory/demo-memory-game/images/funnelchart_list.png'},
        {value: 'stock chart', url: '/18.2/memory/demo-memory-game/images/stockchart_list.png'},
        {value: 'box plot', url: '/18.2/memory/demo-memory-game/images/boxplot_list.png'}
      ];

      // Property change listeners for demo-memory-game's attempts and hasWon properties
      // See the API doc Events section for more information on property change events
      self.updateAttempts = function(event) {
        self.attempts(event.detail.value);
      }

      self.showWinnerPopup = function(event) {
        if (event.detail.value)
          document.getElementById("popup1").open("#game1");
      }

    }

    $(function() {
      ko.applyBindings(new model(), document.getElementById('knockout'));
    });
});