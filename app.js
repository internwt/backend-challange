import express from 'express'
import fs from 'fs';
import bodyParser from 'body-parser';
import Jimp from 'jimp';
const app = express();
import HandleErrors from './middelware/error'
import { userLogin } from './routes/auth/userRoute'
import { signIn } from './helper/validation'
import Authentication from './helper/authentication'
import jsonpatch from 'json-patch'

app.use(bodyParser.json({ limit: "50mb", extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))



//login api
app.post('/login', signIn, HandleErrors(userLogin))
app.post('/patch-data',Authentication, (req, res) => {
    const { data, patch } = req.body;
    if (!data || !patch) {
      res.status(400).send("Invalid Parameters");
    } else {
      try {
        const result = jsonPatch.apply(data, patch);
        res.status(200).json({ message: "Patched result Succesfully", result });
      } catch (err) {
        res.status(400).send(`Something failed due to ${err.message}`);
      }
    }
})
//genrate image thumbnail
app.post("/imageThumb", Authentication,async (req, res, next) => {
    const imageUrl = req.body.url
    if (imageUrl) {
        Jimp.read(imageUrl, (err, image) => {
            if (err) logger.log({ level: "error", message: err });
            image
                .resize(50, 50)
                .quality(60)
                .write("temp.jpg");
            fs.readFile("temp.jpg", (err, data) => {
                res
                    .set("content-type", "image/jpeg")
                    .status(200)
                    .send(data)
                    .end();
            });
        });
    }
})

// image -thumbnail generating  
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})