import highlightSyntax from './syntax.js';

/**
 *  @class
 *  @function Typer - a micro typing class
 *  @author Oliver Hepworth-Bell
 *  @copyright Oliver Hepworth-Bell, 2019
 */
export default class Typer {
  constructor(output, text) {
    this.output = output;
    this.text = text;
    this.characterCount = text.length;
    this.currentCharacter = 0;
    this.typeSpeed = 150;
  }

  type() {
    let timeBetweenCharacters = 0;

    let typeLetter = () => {
      this.currentCharacter++;

      this.output.innerHTML = highlightSyntax(this.text.substring(0, this.currentCharacter) + '_');

      // Stop when reaching end of 'this.text'
      if (this.currentCharacter >= this.characterCount) return this.blinkCursor();

      // Get a random timeout for next keystroke, to make it more natural
      // Between 30ms and this.typeSpeed (default: 200ms) per keystroke
      timeBetweenCharacters = Math.max(this.typeSpeed * Math.random(), 30);

      // Type next character
      setTimeout(() => {
        typeLetter();
      }, timeBetweenCharacters);
    };

    typeLetter();
  }

  blinkCursor() {
    // Get last element of string
    let flag = true;

    // Cache syntax results
    let cursorON = highlightSyntax(this.text + '_');
    let cursorOff = highlightSyntax(this.text);

    // Blink the cursor at the end of the string
    setInterval(() => {
      flag = flag ? false : true;

      this.output.innerHTML = flag ? cursorON : cursorOff;
    }, 700);
  }
}
