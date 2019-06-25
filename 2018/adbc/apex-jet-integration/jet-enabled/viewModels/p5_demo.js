
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
    //'jet-composites/demo-chart-three-d-effect-control/loader'],
    function (oj, ko, $) {
        function ChartModel() {
            var self = this;
            self.threeDValue = ko.observable('off');

            /* chart data */
            var pieSeries = [{ name: "Series 1", items: [42] },
            { name: "Series 2", items: [55] },
            { name: "Series 3", items: [36] },
            { name: "Series 4", items: [22] },
            { name: "Series 5", items: [22] }];

            self.pieSeriesValue = ko.observableArray(pieSeries);

            var defaults = { threeDEffect: ko.toJS(self.threeDValue) };
            self.styleDefaultsValue = ko.observable(defaults);

            /* toggle buttons*/
            self.chartHiddenCategories = function (event) {
                $('#currentText').html("hiddenCategories:<br/>");
                $('#currentText2').html(event.detail['value'].join(", "));
            }
            console.log('1');
        }
console.log('2');
        return new ChartModel();
        /*
        $(
        function(){
           ko.applyBindings(chartModel, document.getElementById('chart-container'));
        }
        );*/
    }); 
