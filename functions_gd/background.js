var config = require('../config/card_settings.json');

module.exports = {
  drawBackground: function drawBackground(img, callback) {
    //Draw Background Color
    var bkg_color = parseInt(config.background_color);
    img.filledRectangle(0, 0, config.card_width, config.card_height, bkg_color);

    //Draw Border
    var border_color = parseInt(config.border_color);
    img.rectangle(config.border_width, config.border_width, config.card_width - config.border_width, config.card_height - config.border_width, border_color);
    img.fill(1, 1, border_color);

    //Draw Banner
    var banner_color = parseInt(config.banner_color);
    img.filledRectangle(config.title_back.x, config.title_back.y, config.title_back.x2, config.title_back.y2, banner_color);

    var image_background_color = parseInt(config.image_back_color);
    img.filledRectangle(config.image_position.x, config.image_position.y, config.image_position.x2, config.image_position.y2, image_background_color);

    var desc_back_color = parseInt(config.description_back_color);
    img.filledRectangle(config.text_position.x, config.text_position.y, config.text_position.x2, config.text_position.y2, desc_back_color);

    callback();
  }
}