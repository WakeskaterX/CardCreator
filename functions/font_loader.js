var path = require('path');

function loadFonts(ctx, Font) {
  var OpenSans = new Font('OpenSans', fontFile('OpenSans/OpenSans-Regular.ttf'));
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Bold.ttf'),'bold');
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Italic.ttf'),'normal','italic');
  OpenSans.addFace(fontFile('OpenSans/OpenSans-Semibold.ttf'), 'semibold');
  ctx.addFont(OpenSans);
  var Coolville = new Font('Coolville', fontFile('Coolville/Coolville.ttf'));
  ctx.addFont(Coolville);
  var EightBitSolid = new Font('8BitSolid', fontFile('8BitLimit/8bitlimr.ttf'));
  ctx.addFont(EightBitSolid);
  var EightBitLimit = new Font('8BitLimit', fontFile('8BitLimit/8bitlimo.ttf'));
  ctx.addFont(EightBitLimit);
};

function fontFile(name) {
  return path.join(__dirname, '../fonts/', name);
}

module.exports = {
  loadFonts: loadFonts
}