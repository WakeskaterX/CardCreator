var path = require('path');

function loadFonts(ctx, Font) {
  var OpenSans = new Font('OpenSans', fontFile('OpenSans/OpenSans-Regular.ttf'));
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Bold.ttf'),'bold');
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Italic.ttf'),'normal','italic');
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Semibold.ttf'), 'semibold');
  ctx.addFont(OpenSans);
};

function fontFile(name) {
  return path.join(__dirname, '../fonts/', name);
}

module.exports = {
  loadFonts: loadFonts
}