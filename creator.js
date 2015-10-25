var config = require('./config/card_settings.json');

var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;
var async = require('async');
var fs = require('fs');
var path = require('path');
var back = require('./functions/background.js');
var desc = require('./functions/description.js');
var fl = require('./functions/font_loader.js');
var title = require('./functions/title.js');
var icons = require('./functions/icons.js');

var set1_sorcerors = require('./card_values/set1_sorcerors.json');
var set1_cards = require('./card_values/set1_cards.json');
var all_cards = set1_sorcerors.concat(set1_cards);

if (!Font) console.log("No Font Added!");

async.eachSeries(all_cards, function(card, callback) {
  var canvas = new Canvas(config.card_width,config.card_height);
  var ctx = canvas.getContext('2d');
  fl.loadFonts(ctx, Font);
  ctx.patternQuality = "bilinear";
  back.drawBackground(ctx);
  icons.drawIcons(ctx, Image, card.card.icons);
  if (card.card.type === "sorceror") {
    icons.drawMiniIcons(ctx, Image, card.card.mini_icons);
  }
  desc.writeDescription(ctx, card.card.description);
  title.writeTitle(ctx, card.card.title);
  var out = fs.createWriteStream(__dirname+"/cards/"+card.file_name+".png");
  var stream = canvas.createPNGStream();

  stream.on('data', function(chunk) {
    out.write(chunk);
  });

  stream.on('end', function(err) {
    callback();
  })
});


