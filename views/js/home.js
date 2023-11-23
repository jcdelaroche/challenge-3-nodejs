const h1 = document.querySelector('h1');



Handlebars.registerHelper('fiveHistory', function (value) {
    return value < 5;
  });