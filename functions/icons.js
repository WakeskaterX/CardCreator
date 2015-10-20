var config = require('../config/card_settings.json');
var cf = require('./common.js');

/**
 * Icon Class - draws icons on card with text
 */
function Icon() {
  //Public Functions
  this.drawIcons = function (ctx, Image, icons) {
    var icon_fire_lg = cf.getImage(Image, icons.upper_right.image);
    drawIconWithText(ctx, icon_fire_lg, icons.upper_right.value, config.type.x, config.type.y, config.type.width, config.type.height, 0, 2);
    var icon_attack = cf.getImage(Image, icons.lower_left.image);
    drawIconWithText(ctx, icon_attack, icons.lower_left.value, config.attack_icon.x, config.attack_icon.y, config.attack_icon.width, config.attack_icon.height, 0, 0);
    var icon_cast_time = cf.getImage(Image, icons.lower_right.image);
    drawIconWithText(ctx, icon_cast_time, icons.lower_right.value, config.timer_icon.x, config.timer_icon.y, config.timer_icon.width, config.timer_icon.height, 1, -2);
  }

  //Private Functions
  function drawIconWithText(ctx, image, text, x, y, width, height, offset_x, offset_y) {
    if (image) {
      ctx.drawImage(image, x, y, width, height);
    }
    if (text) {
      ctx.textAlign = "center";
      ctx.font = '40px ' + config.fonts.icon_back_font;
      ctx.fillStyle = "#FFF";
      ctx.fillText(text, x + 24 + offset_x, y + 44 + offset_y);
      ctx.font = '40px ' + config.fonts.icon_font;
      ctx.fillStyle = "#000";
      ctx.fillText(text, x + 24 + offset_x, y + 44 + offset_y);
    }
  }
}

module.exports = new Icon();