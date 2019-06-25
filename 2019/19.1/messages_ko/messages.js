requirejs.config(
    {
      paths:
        {
          'knockout': './oraclejet/6.1.0/js/libs/knockout/knockout-3.4.2',
        },
    }
  );

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojmessages', 'ojs/ojmessage'], 
function(oj, ko, $) {
  function MessagesViewModel() {
    self.messagesDisplay = ko.observable("notification");
  };
  
  $(function() {
    ko.applyBindings(new MessagesViewModel(), document.getElementById('jet-messages'));
  });
});
