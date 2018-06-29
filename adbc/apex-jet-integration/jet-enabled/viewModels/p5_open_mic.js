
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtimeline'],
function (oj, ko, $)
{
  function SeriesModel()
  {
    var self = this;
    var items = ko.observableArray();
    self.timelineSeries = ko.computed(function () {
      return [{id: 's1', emptyText: 'No Data.', label:'Oracle Events', items: items()}]
    });

    self.currentDateString = "Feb 1, 2010";
    var currentDate = new Date(self.currentDateString).toISOString();
    self.referenceObjects = [{value: currentDate}];

    items(JSON.parse(apex.item("P5_DATA").getValue()));

/*
    $.getJSON("cookbook/dataVisualizations/timeline/basicTimeline/seriesOneData.json",
      function(data)
      {
        items(data);
      }
    );*/

  };

  return new SeriesModel();

/*
  $(
    function()
    {
      ko.applyBindings(new SeriesModel(), document.getElementById('tline'));
    }
  );
  */
}
);
