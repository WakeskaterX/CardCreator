var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;
var canvas = new Canvas(200,320);
var ctx = canvas.getContext('2d');
var fs = require('fs');
var path = require('path');
var maker = require('./functions/maker.js');
var fl = require('./functions/font_loader.js');

if (!Font) console.log("No Font Added!");

fl.loadFonts(ctx, Font);
maker.makeBackground(ctx);
maker.makeIcons(ctx, Image);
maker.makeTest(ctx);

var out = fs.createWriteStream(__dirname+"/cards/test.png");
var stream = canvas.createPNGStream();

stream.on('data', function(chunk) {
  out.write(chunk);
});


