/**
 * Stores all Common Functions used across multiple files
 */
var fs = require('fs');
var path = require('path');

var icon_mapping = {
  'wind_large': 'elements/element_wind_large.png',
  'water_large': 'elements/element_water_large.png',
  'heart': 'icons/icon_life.png'
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