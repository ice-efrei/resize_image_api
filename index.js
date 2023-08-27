// TODO: Saferize this code (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
const express = require('express')
const app = express()
const Jimp = require('jimp');
const port = 80

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/resize', (req, res) => {
    console.log(req.query);
    // get image url
    let imageUrl = req.query.url;
    // get width
    let width = Number(req.query.width);
    // get height
    let height = Number(req.query.height);

    // read image
    Jimp.read(imageUrl)
        .then(image => {
            console.log('Image read');
            // resize image
            image.resize(width, height);
            // send image
            image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                res.set('Content-Type', Jimp.MIME_JPEG);
                res.send(buffer);
            });
            console.log('Image resized');
        })
        .catch(err => {
            // send error
            console.log('Error resizing image');
            console.log(err);
            res.status(500).send(err);
        });
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

module.exports = app;