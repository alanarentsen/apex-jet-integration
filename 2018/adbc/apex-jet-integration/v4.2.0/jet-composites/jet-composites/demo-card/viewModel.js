define(['knockout'],
  function (ko) {
    function model (context) {
      var self = this;
      self.initials = null;
      var element = context.element;

      // The props field on context is a Promise. Once that resolves,
      // we can access the properties that were defined in the composite metadata
      // and were initially set on the composite DOM element.
      context.props.then(function(properties) {
        if (properties.name) {
          var initials = properties.name.match(/\b\w/g);
          self.initials = (initials.shift() + initials.pop()).toUpperCase();
        }
      });
      
      /**
       * Flips a card
       * @param  {MouseEvent} event The click event
       */
      self.flipCard = function(model, event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
          // It's better to look for View elements using a selector 
          // instead of by DOM node order which isn't gauranteed.
          $(element).children('.demo-card-flip-container').toggleClass('demo-card-flipped');
        }
      };
    }

    return model;
  }
)
