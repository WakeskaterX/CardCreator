var fs = require('fs');
var path = require('path');
var config = require('../config/card_settings.json');

function Background() {
  this.drawBackground = function (ctx) {
    ctx.fillStyle = "#FFD";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#47476B";
    ctx.fillRect(config.title_back.x, config.title_back.y, config.title_back.width, config.title_back.height);
    ctx.fillStyle = "#888";
    ctx.fillRect(config.image_position.x, config.image_position.y, config.image_position.width, config.image_position.height);
    ctx.fillStyle = "#AAA";
    ctx.fillRect(config.text_position.x, config.text_position.y, config.text_position.width, config.text_position.height);
  }
}

module.exports = new Background();