var config = require('../config/card_settings.json');

/**
 * Description Class handles drawing and showing all data related to the subscription for a given card
 */
function Description() {
  //Public Functions
  this.writeDescription = function (ctx, text) {
    drawDescription(ctx, text,
      config.text_position.x + 20, config.text_position.y + 40,
      config.text_position.width - 40, config.text_position.height - 40);
  }

  //Private Functions
  function drawDescription(ctx, text, x, y, width, height) {
    if (text) {
      ctx.textAlign = "left";
      ctx.font = config.fonts.description_size + ' ' + config.fonts.description;
      ctx.fillStyle = "#000";
      wrapText(ctx, text, x, y, width, 36);
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
}

module.exports = new Description();