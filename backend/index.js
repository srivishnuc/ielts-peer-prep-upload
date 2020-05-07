const express = require('express')
var formidable = require('formidable')
var fs = require('fs')
var cors = require('cors')




const app = express()
app.use(cors())



app.post('/fileupload', (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (files.pic.size < 1000000) {
            var oldpath = files.pic.path
            var newpath = 'E:/node/ielts-peer-prep-upload/uploaded/' + files.pic.name
            fs.copyFile(oldpath, newpath, (err) => {
                if (err) {
                    res.status(500).send({ status: 'failed', msg: 'File not uploaded' })
                    console.log(err)
                }
                else
                    res.status(200).send({ status: 'success', msg: 'File uploaded' })
            })
        }
        else {
            res.status(500).send({ status: 'failed', msg: 'Upload Image less than 1MB' })
        }


    })
}
)

app.listen(5000, () => {
    console.log(`Server listening on..${process.env.PORT}`);
});


