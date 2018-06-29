
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojcomposite', 'jet-composites/demo-card/loader'],
function(oj, ko, $) {
  function model() {      
    var self = this;
    self.employees = JSON.parse(apex.item('P5_DATA').getValue());
    /*
    [
      {
        name: 'Deb Raphaely',
        avatar: '/i/libraries/oraclejet/4.1.0/images/composites/debraphaely.png',
        title: 'Purchasing Director',
        work: '5171278899',
        email: 'deb.raphaely@oracle.com'
      },
      {
        name: 'Adam Fripp',
        avatar: null,
        title: 'IT Manager',
        work: '6501232234',
        email: 'adam.fripp@oracle.com'
      }
    ];
    */
  }

  return model();

});
