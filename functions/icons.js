var config = require('../config/card_settings.json');
var cf = require('./common.js');

/**
 * Icon Class - draws icons on card with text
 */
function Icon() {
  //Public Functions
  this.drawIcons = function (ctx, Image, icons) {
    var icon_fire_lg = cf.getImage(Image, icons.upper_right.image);
    drawIconWithText(ctx, icon_fire_lg, icons.upper_right.value,
      config.upper_right.x, config.upper_right.y,
      config.upper_right.width, config.upper_right.height,
      8, 8);
    var icon_attack = cf.getImage(Image, icons.lower_left.image);
    drawIconWithText(ctx, icon_attack, icons.lower_left.value,
      config.lower_left.x, config.lower_left.y,
      config.lower_left.width, config.lower_left.height,
      7, 6);
    var icon_cast_time = cf.getImage(Image, icons.lower_right.image);
    drawIconWithText(ctx, icon_cast_time, icons.lower_right.value,
      config.lower_right.x, config.lower_right.y,
      config.lower_right.width, config.lower_right.height,
      8, 5);
  };

  this.drawMiniIcons = function (ctx, Image, minis) {
    var plus_one = cf.getImage(Image, 'plus_one');
    for (var i = 0; i < minis.length; i++) {
      var mini_icon = cf.getImage(Image, minis[i].image);
      var x_adjust = (config.mini_icons.width) * (i - (minis.length - 1)/2);
      drawMiniIcon (ctx, mini_icon, plus_one,
        config.mini_icons.x, config.mini_icons.y,
        config.mini_icons.width, config.mini_icons.height,
        x_adjust);
    }
  };

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

  function drawMiniIcon(ctx, image, plusone, x, y, width, height, adjust_x) {
    if (image) {
      ctx.drawImage(image, x + adjust_x, y, width, height);
      ctx.drawImage(plusone, x + adjust_x + 4, y + 6, config.mini_icons.p1_width, config.mini_icons.p1_height);
    }
  }
}

module.exports = new Icon();