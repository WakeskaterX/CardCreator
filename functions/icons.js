var config = require('../config/card_settings.json');
var cf = require('./common.js');

var valid_numbers = ['0','1','2','3','4','5','6','7','8','9','X'];

/**
 * Icon Class - draws icons on card with text
 */
function Icon() {
  //Public Functions
  this.drawIcons = function (ctx, Image, icons) {
    var icon_ele_lg = cf.getImage(Image, icons.upper_right.image);
    var icon_adjust_x = 0, icon_adjust_y = 0;
    if (icons.upper_right.image === "fire_large") {
      icon_adjust_x = 2;
      icon_adjust_y = 8;
    }
    if (icons.upper_right.image === "water_large") {
      icon_adjust_x = 1;
      icon_adjust_y = 8;
    }
    if (icons.upper_right.image === "wind_large") {
      icon_adjust_x = 3;
      icon_adjust_y = 3;
    }
    drawIconWithText(ctx, Image, icon_ele_lg, icons.upper_right.value,
      config.upper_right.x, config.upper_right.y,
      config.upper_right.width, config.upper_right.height,
      icon_adjust_x, icon_adjust_y);
    var icon_attack = cf.getImage(Image, icons.lower_left.image);
    drawIconWithText(ctx, Image, icon_attack, icons.lower_left.value,
      config.lower_left.x, config.lower_left.y,
      config.lower_left.width, config.lower_left.height,
      0, 0);
    var icon_cast_time = cf.getImage(Image, icons.lower_right.image);
    drawIconWithText(ctx, Image, icon_cast_time, icons.lower_right.value,
      config.lower_right.x, config.lower_right.y,
      config.lower_right.width, config.lower_right.height,
      4, 0);
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
  function drawIconWithText(ctx, Image, icon_image, text, x, y, width, height, offset_x, offset_y) {
    if (icon_image) {
      ctx.drawImage(icon_image, x, y, width, height);
    }
    if (text) {
      drawNumber(ctx, Image, text, x + width/2 + offset_x, y + height/2 + offset_y);
    }
  }

  //Takes a number and draws it to screen
  function drawNumber(ctx, Image, numstring, center_x, center_y) {
    //Split the number string into characters and filter out invalid characters
    var number_chars = numstring.split('').filter(function(item) { return valid_numbers.indexOf(item) >= 0; });
    var total_chars = number_chars.length;
    var size = config.fonts.number_icon_size;
    var kerning = size + config.fonts.number_icon_kerning;
    for (var i = 0; i < total_chars; i++) {
      var x_shift = ((total_chars - 1)/2 * (-1 * kerning)) + (i * kerning);
      var char = number_chars[i];
      var char_image = cf.getNumberImage(Image, char);
      ctx.drawImage(char_image, center_x - size/2 + x_shift, center_y - size/2, size, size);
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