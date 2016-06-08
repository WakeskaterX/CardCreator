var config = require('../config/card_settings.json');
var common = require('./common.js');
var async = require('async');

var valid_numbers = ['0','1','2','3','4','5','6','7','8','9','X'];

/**
 * Icon Class - draws icons on card with text
 */
function Icon() {
  //Public Functions
  this.drawIcons = function (img, data, callback) {
    async.series([
      function drawElement(next) {
        common.getImage(element_map[data.element], function(err, ele_img) {
          var adj = adjustments[data.element];
          ele_img.copyResampled(img, config.upper_right.x + adj.x, config.upper_right.y + adj.y, 0, 0, config.upper_right.width, config.upper_right.height, ele_img.width, ele_img.height);
          next();
        });
      },
      function drawElementNumber(next) {
        common.getAllImages(data.manacost, function(err, image_results) {
          drawNumbersAtPoint(image_results, img, config.upper_right.x + config.upper_right.width/2, config.upper_right.y);
          next();
        });
      },
      function drawMiniElements(next) {
        if (data.type === 'Sorceror') {
          if (data.miniicons && data.miniicons.split(',').length > 0) {
            drawMiniIcons(img, data.miniicons.split(','), next);
          } else next();
        } else next();
      },
      function drawStance(next) {
        common.getImage(data.stance.toLowerCase(), function(err, stance_img) {
          stance_img.copyResampled(img, config.lower_left.x, config.lower_left.y, 0, 0, config.lower_left.width, config.lower_left.height, stance_img.width, stance_img.height);
          next()
        });
      },
      function drawPower(next) {
        common.getAllImages(data.power, function(err, image_results) {
          drawNumbersAtPoint(image_results, img, config.lower_left.x + config.lower_left.width/2, config.lower_left.y);
          next();
        });
      },
      function drawTime(next) {
        if (data.type !== 'Sorceror') {
          common.getImage('cast_time', function(err, cast_image) {
            cast_image.copyResampled(img, config.lower_right.x, config.lower_right.y, 0, 0, config.lower_right.width, config.lower_right.height, cast_image.width, cast_image.height);
            next();
          });
        } else next();
      },
      function drawCastNumbers(next) {
        if (data.type !== 'Sorceror') {
          common.getAllImages(data.casttime, function(err, image_results) {
            drawNumbersAtPoint(image_results, img, config.lower_right.x + config.lower_right.width/2 + 4, config.lower_right.y);
            next();
          });
        } else next();
      }
    ], function(err) {
      callback(err);
    });
  }
}

function drawNumbersAtPoint(image_results, main_image, center_top, top) {
  image_results.images.forEach(function(draw_img) {
    draw_img.img.copyResampled(main_image, center_top - image_results.width/2 + draw_img.x, top + image_results.height/2, 0, 0, config.fonts.number_icon_size, config.fonts.number_icon_size, draw_img.img.width, draw_img.img.height);
  });
}

function drawMiniIcons(main_image, icon_names, callback) {
  var icon_kerning = -2;
  var spacing = config.mini_icons.width + icon_kerning;
  var total_width = (icon_names.length * spacing) - icon_kerning;
  common.getImage('plus_one', function(err, pl_one) {
    async.forEachOf(icon_names, function(name, index, next) {
      common.getImage(small_element_map[name], function(err, sm_ele) {
        sm_ele.copyResampled(main_image, config.mini_icons.x - total_width/2 + (spacing * index), config.mini_icons.y, 0, 0, config.mini_icons.width, config.mini_icons.height, sm_ele.width, sm_ele.height);
        pl_one.copyResampled(main_image, config.mini_icons.x - total_width/2 + (spacing * index), config.mini_icons.y + 3, 0, 0, config.mini_icons.p1_width, config.mini_icons.p1_height, pl_one.width, pl_one.height);
        next();
      });
    }, callback);
  })
}

var element_map = {
  'Fire': 'fire_large',
  'Water': 'water_large',
  'Wind': 'wind_large',
  'Earth': 'earth_large',
  'Plain': 'mana_large',
  'Lightning': 'lightning_large'
};

var small_element_map = {
  'Fire': 'fire_small',
  'Water': 'water_small',
  'Wind': 'wind_small',
  'Earth': 'earth_small',
  'Plain': 'mana_small',
  'Lightning': 'lightning_small'
};

var adjustments = {
  'Fire': {
    'x': -1,
    'y': -8
  },
  'Water': {
    'x': -2,
    'y': -6
  },
  'Wind': {
    'x': -2,
    'y': 0
  },
  'Earth': {
    'x': 0,
    'y': 0
  },
  'Lightning': {
    'x': 0,
    'y': 0
  },
  'Plain': {
    'x': 0,
    'y': 0
  }
}

module.exports = new Icon();