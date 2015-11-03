var config = require('../config/card_settings.json');


/**
 * Title creates the title text
 */

function Title() {
  this.writeTitle = function (ctx, text, rarity) {
    if (text) {
      ctx.fillStyle = config.rarity_colors[rarity];
      ctx.font = config.fonts.title_size + ' ' + config.fonts.title_font;
      ctx.textAlign = "left";
      ctx.fillText(text, config.title_position.x, config.title_position.y);
    }
  }
}

module.exports = new Title();