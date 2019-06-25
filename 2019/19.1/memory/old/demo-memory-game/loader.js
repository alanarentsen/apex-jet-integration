define(['ojs/ojcore', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles', 'ojs/ojcomposite', 'adbc/demo-memory-card/loader'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('demo-memory-game', {
      view: {inline: view}, 
      viewModel: {inline: viewModel},  
      metadata: {inline: JSON.parse(metadata)}
    });
  }
);