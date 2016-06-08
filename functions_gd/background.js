var config = require('../config/card_settings.json');
var common = require('./common.js');

module.exports = {
  drawBackground: function drawBackground(img, data, callback) {
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

    //Draw Image if it exists
    var image_file = data.imagename;
    common.getBackgroundImage(image_file, function(err, back_img) {
      if (back_img) {
        back_img.copyResampled(img, config.image_position.x, config.image_position.y, 0, 0, config.image_position.width, config.image_position.height, back_img.width, back_img.height);
      }
      callback()
    });
  }
}