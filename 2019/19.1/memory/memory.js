requirejs.config(
    {
      paths:
        {
          'knockout': './oraclejet/6.1.0/js/libs/knockout/knockout-3.4.2',
          'css': './oraclejet/6.1.0/js/libs/require-css/css',
          'jet-composites': '/19.1/memory'
        },
    }
  );

  require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'jet-composites/demo-memory-game/loader', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojlabel'],
  function(oj, ko, $) {
    function model() {      
      var self = this;
      self.attempts = ko.observable(0);

      self.chartImages = [
        {value: 'donut chart', url: '/19.1/memory/images/donutchart_list.png'}, 
        {value: 'pie chart', url: '/19.1/memory/images/piechart_list.png'},
        {value: 'scatter chart', url: '/19.1/memory/images/scatterchart_list.png'},
        {value: 'bubble chart', url: '/19.1/memory/images/bubblechart_list.png'},
        {value: 'pyramid chart', url: '/19.1/memory/images/pyramidchart_list.png'},
        {value: 'funnel chart', url: '/19.1/memory/images/funnelchart_list.png'},
        {value: 'stock chart', url: '/19.1/memory/images/stockchart_list.png'},
        {value: 'box plot', url: '/19.1/memory/images/boxplot_list.png'}
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
      ko.applyBindings(new model(), document.getElementById('jet-memory-game'));
    });
});
