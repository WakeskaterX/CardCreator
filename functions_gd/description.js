var config = require('../config/card_settings.json');

/**
 * Description Class handles drawing and showing all data related to the subscription for a given card
 */
function Description() {
  //Public Functions
  this.writeDescription = function (image, data, callback) {
    var text = data.description;
    drawDescription(image, text,
      config.text_position.x + 20, config.text_position.y + 40,
      config.text_position.width - 40, config.text_position.height - 40);
    callback();
  }

  //Private Functions
  function drawDescription(image, text, x, y, width, height) {
    if (text) {
      var desc_font = "/Users/jasoncarter/Projects/Other_Projects/CardCreator/fonts/" + config.fonts.description.file;
      var desc_color = 0xFFFFFF;
      var desc_size = config.fonts.description.size;
      wrapText(image, desc_color, desc_font, desc_size, text, x, y, 24, 36);
    }
  }

  function wrapText(image, desc_color, desc_font, desc_size, text, x, y, maxCharacters, lineHeight) {
    var words = text.split(' ');
    var lines = [];
    var line = '';
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      //If the test line would go over the max, push the line to lines and create a new line
      if (testLine.length > maxCharacters) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line += words[n] + ' ';
      }
    }
    //If anything is left in line - push it to lines
    if (line.length) {
      lines.push(line);
    };

    lines.forEach(function(text_line, index) {
      image.stringFT(desc_color, desc_font, desc_size, 0, x, y + (index * lineHeight), text_line);
    });
  }
}

module.exports = new Description();