'use strict';

var adbc = adbc || {};
adbc.jet_version = '4.2.0';
adbc.app_id = apex.item('pFlowId').getValue();
adbc.app_page_id = apex.item('pFlowStepId').getValue();
adbc.app_base_url = apex_img_dir + 'libraries/oraclejet/' + adbc.jet_version + '/js/';
adbc.app_base_css_url = apex_img_dir + 'libraries/oraclejet/' + adbc.jet_version + '/css/';
adbc.custom_js_url = apex_img_dir + 'adbc/apex-jet-integration/jet-enabled/';
adbc.ko = {};

requirejs.config(
    {
        baseUrl: '/',
        paths:
            //injector:mainReleasePaths
            {
                'knockout': adbc.app_base_url + 'libs/knockout/knockout-3.4.0',
                'jquery': adbc.app_base_url + 'libs/jquery/jquery-3.1.1.min',
                'jqueryui-amd': adbc.app_base_url + 'libs/jquery/jqueryui-amd-1.12.0.min',
                'ojs': adbc.app_base_url + 'libs/oj/v' + adbc.jet_version + '/min',
                'ojL10n': adbc.app_base_url + 'libs/oj/v' + adbc.jet_version + '/ojL10n',
                'ojtranslations': adbc.app_base_url + 'libs/oj/v' + adbc.jet_version + '/resources',
                'text': adbc.app_base_url + 'libs/require/text',
                'promise': adbc.app_base_url + 'libs/es6-promise/es6-promise.min',
                'hammerjs': adbc.app_base_url + 'libs/hammer/hammer-2.0.8.min',
                'signals': adbc.app_base_url + 'libs/js-signals/signals.min',
                'ojdnd': adbc.app_base_url + 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
                'css': adbc.app_base_url + 'libs/require-css/css.min',
                'customElements': adbc.app_base_url + 'libs/webcomponents/custom-elements.min',
                'proj4': adbc.app_base_url + 'libs/proj4js/dist/proj4',
                'factories': adbc.custom_js_url + 'factories',
                'jet-composites': adbc.custom_js_url + 'jet-composites',
                'pc': adbc.custom_js_url + 'page-controllers'
            },
        //endinjector
        
        shim:
            {
                'jquery':
                    {
                        exports: ['jQuery', '$']
                    }
            },

        config: {
            ojL10n: {
                merge: {
                    //'ojtranslations/nls/ojtranslations': 'resources/nls/myTranslations'
                }
            },
            text: {
                useXhr: function (url, protocol, hostname, port) {
                    return true;
                }
            }
        }
    }
);

var modules = ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojmodule'
              ,'css!' + adbc.app_base_css_url + 'libs/oj/v' + adbc.jet_version + '/alta/oj-alta-notag-min.css'];
if (typeof pageController != 'undefined') {
  console.log('including page specific module: pc/' + pageController); 
  modules.push('pc/' + pageController); 
};
console.log(modules);
require(modules,
    function (oj, ko, $, ojko, ojm) {
        //var definedModules = require.s.contexts._.defined;
        //definedModules['ojs/ojcore'].ModuleBinding.defaults.viewPath = 'text!' + adbc.custom_js_url + 'views/;
        oj.ModuleBinding.defaults.viewPath = 'text!' + adbc.custom_js_url + 'views/';
        console.log('viewPath: ' + oj.ModuleBinding.defaults.viewPath);

        //definedModules['ojs/ojcore'].ModuleBinding.defaults.modelPath = '.' + adbc.custom_js_url + 'viewModels/';
        oj.ModuleBinding.defaults.modelPath = '.' + adbc.custom_js_url + 'viewModels/';    
        console.log('modelPath: ' + oj.ModuleBinding.defaults.modelPath);

        //make knockout global to get to the module data
        adbc.ko = ko;

        //print application and page id in console
        console.log('application id: ' + adbc.app_id);
        console.log('page id: ' + adbc.app_page_id);
        console.log('jQuery version: ' + $.fn.jquery);

        //***** do some real stuff here *****
        //
        //
        //
        //*****  stop doing real stuff  *****
        
        //activate knockout
        ko.applyBindings(this, document.getElementById('t_PageBody'));
        console.log('0');
    },
   function (err) {
       console.log(err);
   });