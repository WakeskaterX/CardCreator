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
var set1_cards_A = require('./card_values/set1_cards_A.json');
var set1_cards_B = require('./card_values/set1_cards_B.json');
var all_cards = set1_sorcerors.concat(set1_cards_A).concat(set1_cards_B);

if (!Font) console.log("No Font Added!");

//Stats to show during creation
var total_length = all_cards.length;
var cards_completed = 0;
var current_progress = 0;

console.log("Starting Card Creator");
writeProgress(0);
process.stdout.write("Progress: [");
async.each(all_cards, function(card, callback) {
  var canvas = new Canvas(config.card_width,config.card_height);
  var ctx = canvas.getContext('2d');
  fl.loadFonts(ctx, Font);
  ctx.patternQuality = "bilinear";
  back.drawBackground(ctx, card.card.picture);
  icons.drawIcons(ctx, Image, card.card.icons);
  if (card.card.type === "sorceror") {
    icons.drawMiniIcons(ctx, Image, card.card.mini_icons);
  }
  desc.writeDescription(ctx, card.card.description);
  title.writeTitle(ctx, card.card.title, card.card.rarity);
  var out = fs.createWriteStream(__dirname+"/cards/"+card.file_name+".png");
  var stream = canvas.createPNGStream();

  stream.on('data', function(chunk) {
    out.write(chunk);
  });

  stream.on('end', function(err) {
    cards_completed++;
    current_progress = Math.floor(100 * cards_completed/total_length);
    writeProgress(current_progress);
    callback();
  });
}, function(err) {
  console.log("\nCompleted!");
});

function writeProgress(percent) {
  var columns = process.stdout.columns - 13;
  //Clamp to 0-100
  percent = Math.max(Math.min(100, percent), 0);
  percent = Math.min((percent * columns) / 100);

  var space = '\u2003';
  var block = '\u2588';
  var progress_text = "Progress: [";
  for (var i = 0; i < columns; i++) {
    if (percent > i) {
      progress_text += block;
    } else {
      progress_text += space;
    }
  }
  progress_text+="]";
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress_text);
}