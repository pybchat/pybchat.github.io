/**
 *  @class
 *  @function Typer - a micro typing class
 *  
 *  @param {String} text - a string that can be typed 
 *  @param {element} wrapper - an element to write to
 *  @param {Array} speed - an array of two numbers, min and max type speed (e.g. [50, 150])
 *  @param {Function} formatter - a function to format the text (optional)
 *  
 *  @author Oliver Hepworth-Bell
 */
export default class Typer {
  constructor(text, wrapper, speed = [30, 150], formatter = false) {
    this.wrapper = wrapper;
    this.text = text;
    this.formatter = formatter;
    this.minTypeSpeed = parseInt(speed[0]) || 30;
    this.maxTypeSpeed = parseInt(speed[1]) || 150;
    this.characterCount = text.length;
    this.currentCharacter = 0;

    this.checkValidFormatter();
  }

  checkValidFormatter() {
    // Ensure 'alter' is a valid function
    if (!this.formatter || typeof this.formatter !== 'function') this.formatter = text => text;
  }

  type() {
    let timeBetweenCharacters = 0;

    let typeLetter = () => {
      this.currentCharacter++;

      this.wrapper.innerHTML = this.formatter(this.text.substring(0, this.currentCharacter) + '_');

      // Stop when reaching end of 'this.text'
      if (this.currentCharacter >= this.characterCount) return this.blinkCursor();

      // Set a timeout for next keystroke, randomised to make it more natural
      timeBetweenCharacters = Math.max(this.maxTypeSpeed * Math.random(), this.minTypeSpeed);

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
    let cursorON = this.formatter(this.text + '_');
    let cursorOff = this.formatter(this.text);

    // Blink the cursor at the end of the string
    setInterval(() => {
      flag = flag ? false : true;

      this.wrapper.innerHTML = flag ? cursorON : cursorOff;
    }, 700);
  }
}
