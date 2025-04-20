const fs = require('fs');
const Jimp = require('jimp');

const buffer = fs.readFileSync('./path/to/image.jpg');
if (!buffer) {
    console.error('Buffer is null or undefined');
} else {
    Jimp.read(buffer)
        .then(image => {
            // Process the image
        })
        .catch(err => {
            console.error('Error processing the image:', err);
        });
}