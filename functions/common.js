/**
 * Stores all Common Functions used across multiple files
 */
var fs = require('fs');
var path = require('path');

var icon_mapping = {
  'wind_large': 'elements/element_wind_large.png',
  'lightning_large': 'elements/element_lightning_large.png',
  'water_large': 'elements/element_water_large.png',
  'fire_large': 'elements/element_fire_large.png',
  'mana_large': 'elements/element_mana_large.png',
  'earth_large': 'elements/element_earth_large.png',
  'wind_small': 'elements/element_wind_small.png',
  'lightning_small': 'elements/element_lightning_small.png',
  'water_small': 'elements/element_water_small.png',
  'fire_small': 'elements/element_fire_small.png',
  'mana_small': 'elements/element_mana_small.png',
  'earth_small': 'elements/element_earth_small.png',
  'heart': 'icons/icon_life.png',
  'cast_time': 'icons/icon_cast_time.png',
  'plus_one': 'icons/misc_plus_one.png',
  'attack': 'icons/type_attack.png',
  'defense': 'icons/type_defense.png',
  'healing': 'icons/type_healign.png'
}

function getImage(Image, icon_name) {
  var file_name = icon_mapping[icon_name];
  if (file_name) {
    var location = path.join(__dirname, '../images/', file_name);
    var png = fs.readFileSync(location);
    var img = new Image;
    img.src = png;
    return img;
  } else {
    return null;
  }
}

module.exports = {
  getImage: getImage
}