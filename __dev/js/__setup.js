import Typer from './type.js';
import highlightSyntax from './syntax.js';

// Create a global 'pyb' wrapper
window.pyb = {};

// Set a relative URL for JavaScript
pyb.url = '/';

// Preload 'loading' image
pyb.preloader_image = new Image();
pyb.preloader_image.src = pyb.url + 'img/loading.svg';

// Run
(function(){
  let typeTextWrapper = document.getElementById('typer');
  let formatter = text => highlightSyntax(text);
  let typeTextContent = `let readableDate = (d) => new Date(Date.parse(d)).toDateString();

function Meeting(location, date){
  document.write(\`The next meeting is on \${readableDate(date)} at \${location}\`);
}

let nextMeeting = new Meeting('TBA', '1970-01-01')`;

  new Typer(typeTextContent, typeTextWrapper, [30, 200], formatter).type();
})();
