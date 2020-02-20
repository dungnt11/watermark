const Jimp = require("jimp");
const fs = require('fs');

const ORIGINAL_IMAGE =
  "./img.jpg";

const LOGO = "./icon.svg";

const LOGO_MARGIN_PERCENTAGE = 5;

const FILENAME = "test.jpg";

console.time('hhhh')
const main = async () => {
  const [image, logo] = await Promise.all([
    Jimp.read(fs.readFileSync(ORIGINAL_IMAGE)),
    Jimp.read(fs.readFileSync(LOGO))
  ]);

  logo.resize(image.bitmap.width / 10, Jimp.AUTO);

  const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

  const X = image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height - yMargin;

  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 0.1,
      opacityDest: 1
    }
  ]);
};

main().then(image => {
  image.write(FILENAME);
  console.timeEnd('hhhh')
});
