define(['ojs/ojcore', 'knockout', 'jquery',
    'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojinputnumber',
    'ojs/ojradioset', 'ojs/ojcheckboxset',
    'ojs/ojselectcombobox',
    'ojs/ojdatetimepicker', 'ojs/ojswitch', 'ojs/ojslider',
    'ojs/ojcolorspectrum', 'ojs/ojcolorpalette', 'ojs/ojlabel'],
    function (oj, ko, $) {
        function StateModel() {
            var self = this;


            self.formState = ko.observable('enabled');

            self.placeholder = ko.observable(false);

            self.disableFormControls = ko.computed(function () {
                if (self.formState() == 'disabled')
                    return true;
                else
                    return false;
            });

            self.readonlyFormControls = ko.computed(function () {
                if (self.formState() == 'readonly')
                    return true;
                else
                    return false;
            });


            self.formControls = ko.observableArray([]);
            self.messages = ko.observableArray([]);
            var _errorMsg = { summary: 'Error' };
            var _warningMsg = { summary: 'Warning', severity: 'warning' };
            var _infoMsg = { summary: 'Info', severity: 'info' };
            var _confirmationMsg = { summary: 'Confirmation', severity: 'confirmation' };

            self.messages = ko.computed(function () {
                var msgs = [];

                if (self.formState() == 'enabled') {
                    if (self.formControls.indexOf('error') > -1) {
                        msgs.push(_errorMsg);
                    }
                    if (self.formControls.indexOf('warning') > -1) {
                        msgs.push(_warningMsg);
                    }
                    if (self.formControls.indexOf('info') > -1) {
                        msgs.push(_infoMsg);
                    }
                    if (self.formControls.indexOf('confirmation') > -1) {
                        msgs.push(_confirmationMsg);
                    }
                }

                return msgs;
            });

            self.isoDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));

            self.colorSpectrumValue = new oj.Color('rgba(21,0,255,0.8)');
            self.colorPaletteValue = ko.observable(oj.Color.RED);
            self.colorPickerPalette = [
                { "color": new oj.Color("#000000") },
                { "color": new oj.Color("#c0c0c0") },
                { "color": new oj.Color("#808080") },
                { "color": new oj.Color("#ffffff") },
                { "color": new oj.Color("#800000") },
                { "color": new oj.Color("#ff0000") },
                { "color": new oj.Color("#800080") },
                { "color": new oj.Color("#ff00ff") },
                { "color": new oj.Color("#008000") },
                { "color": new oj.Color("#00ff00") },
                { "color": new oj.Color("#808000") },
                { "color": new oj.Color("#ffff00") },
                { "color": new oj.Color("#000080") },
                { "color": new oj.Color("#0000ff") },
                { "color": new oj.Color("#008080") },
                { "color": new oj.Color("#00ffff") }
            ];

        }

        return new StateModel();
    });
