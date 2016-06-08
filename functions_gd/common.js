/**
 * Stores all Common Functions used across multiple files
 */
var fs = require('fs');
var path = require('path');
var gd = require('node-gd');
var config = require('../config/card_settings.json');
var async = require('async');

var icon_mapping = {
  'wind_large': 'elements/wind.png',
  'lightning_large': 'elements/lightning.png',
  'water_large': 'elements/water.png',
  'fire_large': 'elements/fire.png',
  'mana_large': 'elements/mana.png',
  'earth_large': 'elements/earth.png',
  'wind_small': 'elements/wind.png',
  'lightning_small': 'elements/lightning.png',
  'water_small': 'elements/water.png',
  'fire_small': 'elements/fire.png',
  'mana_small': 'elements/mana.png',
  'earth_small': 'elements/earth.png',
  'heart': 'icons/icon_life2.png',
  'cast_time': 'icons/icon_cast_time2.png',
  'plus_one': 'icons/misc_plus_one.png',
  'attack': 'icons/type_attack2.png',
  'defense': 'icons/type_defense2.png',
  'healing': 'icons/type_healing2.png',
  'chain': 'icons/type_chain.png',
  'boots': 'icons/boots.png',
  'body': 'icons/shirt.png'
};

var number_mapping = {
  '0': 'numbers/0.png',
  '1': 'numbers/1.png',
  '2': 'numbers/2.png',
  '3': 'numbers/3.png',
  '4': 'numbers/4.png',
  '5': 'numbers/5.png',
  '6': 'numbers/6.png',
  '7': 'numbers/7.png',
  '8': 'numbers/8.png',
  '9': 'numbers/9.png',
  'X': 'numbers/X.png'
}

function getImage(icon_name, callback) {
  var file_name = icon_mapping[icon_name];
  if (file_name) {
    var img;
    var location = path.join(__dirname, '../images/', file_name);
    gd.openPng(location, callback);
  } else callback();
}

function getNumberImage(number_string, callback) {
  var file_name = number_mapping[number_string];
  if (file_name) {
    var location = path.join(__dirname, '../images/', file_name);
    gd.openPng(location, callback);
  } else callback();
}

function getAllImages(num_string, callback) {
  var num_size = config.fonts.number_icon_size;
  var num_kerning = config.fonts.number_icon_kerning;
  var valid_numbers = Object.keys(number_mapping);
  var number_chars = num_string.split('').filter(function(item) { return valid_numbers.indexOf(item) >= 0; });
  var total_chars = number_chars.length;

  var spacing_per_character = num_size + num_kerning;
  var total_width = number_chars.length * spacing_per_character - num_kerning;

  var results = {
    width: total_width,
    height: num_size,
    images: []
  };

  async.forEachOf(number_chars, function(char, index, next) {
    getNumberImage(char, function(err, char_img) {
      results.images.push({
        img: char_img,
        x: index * spacing_per_character,
        y: 0
      })
      next();
    });
  }, function(err) {
    callback(err, results);
  })
}

function getBackgroundImage(image_name, callback) {
  var location = path.join(__dirname, '../images/backgrounds/', image_name);
  gd.openPng(location, callback);
}

//Use Absolute Path
function getPNG(location, callback) {
  gd.openPng(location, callback);
}

module.exports = {
  getImage: getImage,
  getNumberImage: getNumberImage,
  getBackgroundImage: getBackgroundImage,
  getPNG: getPNG,
  getAllImages: getAllImages
}