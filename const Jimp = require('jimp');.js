const Jimp = require('jimp');
const fs = require('fs');

const filePath = './path/to/image.jpg';

if (fs.existsSync(filePath)) {
    Jimp.read(filePath)
        .then(image => {
            console.log('Image loaded successfully');
            // Process the image
        })
        .catch(err => {
            console.error('Error processing the image:', err);
        });
} else {
    console.error('File does not exist:', filePath);
}