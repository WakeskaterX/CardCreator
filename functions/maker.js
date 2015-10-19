var fs = require('fs');
var path = require('path');

function makeBackground(ctx) {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#888";
  ctx.fillRect(10, 40, ctx.canvas.width - 20, 100);
  ctx.fillStyle = "#AAA";
  ctx.fillRect(10, 150, ctx.canvas.width - 20, 130);
}

function makeIcons(ctx, Image) {
  var icon_fire_lg = getImage(Image, 'elements/element_fire_large.png');
  ctx.drawImage(icon_fire_lg, ctx.canvas.width-40, 8, 32, 32);
}

function makeTest(ctx) {
  console.log("Writing Text...");
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.font = '16px Arial';
  ctx.textAlign = "left";
  ctx.fillText("Test Card #1", 20, 30);
}

function getImage(Image, file_name) {
  var location = path.join(__dirname, '../images/',file_name);
  console.log(location);
  var png = fs.readFileSync(location);
  var img = new Image;
  img.src = png;
  return img;
}

module.exports = {
  makeBackground: makeBackground,
  makeIcons: makeIcons,
  makeTest: makeTest
};