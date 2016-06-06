var config = require('../config/card_settings.json');

//Draw the Title
module.exports = {
  drawTitle: function(img, data, cb) {
    if (data.name) {
      var title_color = parseInt(config.rarity_colors[data.rarity]);
      var font_file = "/Users/jasoncarter/Projects/Other_Projects/CardCreator/fonts/" + config.fonts.title.file;
      var font_size = config.fonts.title.size;
      img.stringFT(title_color, font_file, font_size, 0, config.title_position.x, config.title_position.y, data.name)
    }
    cb();
  }
}