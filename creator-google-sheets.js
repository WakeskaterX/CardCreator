var config = require('./config/card_settings.json');
var run_config = require('./config/run_settings.json');

var async = require('async');
var fs = require('fs');
var path = require('path');

var back = require('./functions_gd/background.js');
var title = require('./functions_gd/title.js');
var desc = require('./functions_gd/description.js');
var icons = require('./functions_gd/icons.js');

var GoogleSpreadsheet = require('google-spreadsheet');
var gd = require('node-gd');

var url_key = require('./private.js').google_sheets_key;

var doc = new GoogleSpreadsheet(url_key);
var sheet;
var total_rows, current_row;

async.series([
  function getSheetAndInfo(next) {
    doc.getInfo(function(err, info) {
      console.log("Loaded document: " + info.title + " by " + info.author.email);
      sheet = info.worksheets[0];
      console.log("Sheet 1: " + sheet.title + ": " + sheet.rowCount + " rows x " + sheet.colCount + " columns");
      next();
    });
  },
  function writeRows(next) {
    sheet.getRows({}, function(err, rows) {
      console.log("GOT " + rows.length + " rows");
      total_rows = rows.length;
      async.forEachOfSeries(rows, function(row, index, next_row) {
        var data = convertRow(row);
        var img;
        async.waterfall([
          function create(cb) {
            gd.createTrueColor(config.card_width, config.card_height, cb);
          },
          function drawBackgrounds(image, cb) {
            img = image;
            back.drawBackground(img, data, cb);
          },
          function drawTitle(cb) {
            title.drawTitle(img, data, cb);
          },
          function drawDescription(cb) {
            desc.writeDescription(img, data, cb);
          },
          function drawIcons(cb) {
            icons.drawIcons(img, data, cb);
          },
          function saveImage(cb) {
            var url = __dirname + "/cards/" + generateCardId(data._id, data.name) + ".png";
            img.savePng(url, 0, function(err) {
              var perc = ((index + 1) / total_rows) * 100;
              writeProgress(perc);
              cb(err);
            });
          }
        ], next_row);
      }, next);
    });
  }
], function(err) {
  if (err) console.error(err);
  console.log("\n\nFINISHED!");
  process.exit(1);
});

//Converts a google sheets row
function convertRow(row) {
  return {
    _id: row.id,
    name: row.name,
    type: row.type,
    stance: row.stance,
    element: row.element,
    rarity: row.rarity,
    manacost: row.manacost,
    description: row.description,
    power: row.power,
    casttime: row.casttime,
    imagename: row.imagename,
    miniicons: row.miniicons
  };
}

function writeProgress(percent) {
  var columns = Math.max(process.stdout.columns - 13, 20);
  //Clamp to 0-100
  percent = Math.max(Math.min(100, percent), 0);
  percent = Math.max(percent / 100 * columns);

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

function generateCardId(id, name) {
  return (id + "_" + name).replace(/\W/gi, "");
}