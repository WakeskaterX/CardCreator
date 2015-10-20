var fs = require('fs');
var path = require('path');
var config = require('../config/card_settings.json');

function makeBackground(ctx) {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#888";
  ctx.fillRect(config.image_position.x, config.image_position.y, config.image_position.width, config.image_position.height);
  ctx.fillStyle = "#AAA";
  ctx.fillRect(config.text_position.x, config.text_position.y, config.text_position.width, config.text_position.height);
}

function makeIcons(ctx, Image) {
  var icon_fire_lg = getImage(Image, 'elements/element_fire_large.png');
  drawIconWithText(ctx, icon_fire_lg, "3", config.type.x, config.type.y, config.type.width, config.type.height);
  var icon_attack = getImage(Image, 'icons/type_attack.png');
  drawIconWithText(ctx, icon_attack, "4", config.attack_icon.x, config.attack_icon.y, config.attack_icon.width, config.attack_icon.height);
}

function makeTest(ctx) {
  console.log("Writing Text...");
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.font = '20px '+config.fonts.title_font;
  ctx.textAlign = "left";
  ctx.fillText("Test Card #1", 20, 30);
}

function getImage(Image, file_name) {
  var location = path.join(__dirname, '../images/',file_name);
  var png = fs.readFileSync(location);
  var img = new Image;
  img.src = png;
  return img;
}

function drawIconWithText(ctx, image, text, x, y, width, height){
  ctx.drawImage(image, x, y, width, height);
  if (text) {
    ctx.textAlign = "center";
    ctx.font = '20px '+config.fonts.icon_back_font;
    ctx.fillStyle= "#FFF";
    ctx.fillText(text, x+12, y+22);
    ctx.font = '20px '+config.fonts.icon_font;
    ctx.fillStyle = "#000";
    ctx.fillText(text, x+12, y+22);
  }
}

module.exports = {
  makeBackground: makeBackground,
  makeIcons: makeIcons,
  makeTest: makeTest
};