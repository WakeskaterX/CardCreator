/**
 * Card Sheet Creator
 * Creates 9x9 sheets of cards for printing
 * Goes through the /cards directory and grabs everything converting it into printable sheets
 */
var fs = require('fs');
var async = require('async');
var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;
var config = require('./config/card_settings.json');
var common = require('./functions/common.js');

var settings = {
  spacing: 12,
  border: 40,
  sheet_ratio: 11/8 //Ratio of Height ot Width
}

var sheet_width = config.card_width * 3 + settings.border * 2 + settings.spacing * 2;
var sheet_height = sheet_width * settings.sheet_ratio;

var all_card_names = fs.readdirSync(__dirname+'/cards');

var sheet_index = 0;
var sheets = [];
//Split into arrays of 9 at a time
var sheet = [];
for (var i = 0; i < all_card_names.length; i++) {
  if (sheet_index > 8) {
    sheets.push(sheet);
    sheet = [];
    sheet_index = 0;
  }
  sheet.push(all_card_names[i]);
  sheet_index++;
}

//Draw Each Sheet
async.forEachOf(sheets, function(active_sheet, index, callback) {
  var canvas = new Canvas(sheet_width,sheet_height);
  var ctx = canvas.getContext('2d');
  //Draw Each Card on the Sheet
  for (var k = 0; k < active_sheet.length; k++) {
    var card_name = active_sheet[k];
    var start_x = settings.border + ((k % 3) * config.card_width);
    //Add Spacing to the Start X
    if (k % 3 > 0) {
      start_x += ((k % 3) * settings.spacing);
    }
    var start_y = settings.border + (Math.floor(k/3) * config.card_height);
    //Add Spacing to the Start Y
    if (Math.floor(k/3) > 0) {
      start_y += (Math.floor(k/3) * settings.spacing);
    }
    ctx.drawImage(common.getPNG(__dirname+'/cards/'+card_name), start_x, start_y, config.card_width, config.card_height);
  }
  var out = fs.createWriteStream(__dirname+"/card_print_sheets/sheet"+index+".png");
  var stream = canvas.createPNGStream();

  stream.on('data', function(chunk) {
    out.write(chunk);
  });

  stream.on('end', function(err) {
    callback();
  });
}, function(err) {
  console.log(err);
});


