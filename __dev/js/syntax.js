/**
 *  @function highlightSyntax - a 'budget' syntax highlighter for JavaScript - for visual purposes only
 *  @author Oliver Hepworth-Bell
 *  @copyright Oliver Hepworth-Bell, 2019
 */
export default function highlightSyntax(input){
  let regexTests = [
    {
      pattern: /\b(let|var|const)(\s)(\w+)(\s?=\s?\(\w*\)\s?=>|\s=\s?function\s?\()/gim,
      adjustment: '$1$2<span class="func">$3</span>$4'
    },
    {
      pattern: /(\.)(parse)\b/gim,
      adjustment: '$1<span class="inb">$2</span>'
    },
    {
      pattern: /\b(document)(.)(write)/gm,
      adjustment: '<span class="new">$1</span>$2<span class="new">$3</span>'
    },
    {
      pattern: /(\bfunction\s|.)(\w+)(\s?\()/gim,
      adjustment: '$1<span class="func">$2</span>$3'
    },
    {
      pattern: /\b(new)(\s)(\w+)(\s?\()/gim,
      adjustment: '$1$2<span class="new">$3</span>$4'
    },
    {
      pattern: /\b(let|var|const|new|function)(\s|;)/gim,
      adjustment: '<span class="var">$1</span>$2'
    },
    {
      pattern: /([`'])([^'`]+)([`'])/gim,
      adjustment: '<em>$1$2$3</em>'
    },
    {
      pattern: /(\${)([^${}(]+)(\(.+\))?(})/gim,
      adjustment: '<span class="lit">${</span><span><span class="func">$2</span>$3<span class="lit">}</span>'
    },
    {
      pattern: /(^\/\/.+)/gim,
      adjustment: '<span class="comment">$1</span>'
    },
    {
      pattern: /\b(Date)\b/gm,
      adjustment: '<span class="new">$1</span>'
    }
  ];

  // Loop through patterns and replace accordingly
  for (let regex of regexTests) {
    input = input.replace(regex.pattern, regex.adjustment);
  }

  return input;
}
