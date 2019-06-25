requirejs.config(
    {
      paths:
        {
          'knockout': './oraclejet/6.1.0/js/libs/knockout/knockout-3.4.2',
        },
    }
  );

require(['ojs/ojmessages', 'ojs/ojmessage'], function() {});
