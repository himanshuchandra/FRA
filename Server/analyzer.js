'use strict';

const express = require('express');
const router = express.Router();


const multer = require('multer');
// const Busboy = require('busboy');
const fs = require('fs');
const PythonShell = require('python-shell');



var analyzeImage = function (response) {

    var options = {
        //   mode: 'binary',
        //pythonPath: 'path/to/python',
        //   pythonOptions: ['-u'],
        scriptPath: 'pythonscripts',
        // args: [filename]
    };

    var array = [];

    var pyshell = new PythonShell.run('process.py', options);
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)

        array.push(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err) {
            throw err;
        };

        console.log('Finished analyzing!');
        var dollar1 = array[1].indexOf('$');
        var at1 = array[1].indexOf('@');
        var item = array[1].slice(dollar1 + 1, at1);
        var dollar0 = array[0].indexOf('$');
        var at0 = array[0].indexOf('@');
        var accuracy = array[0].slice(dollar0 + 1, at0);
        accuracy = parseFloat(accuracy);
        var result = {
            item: item,
            accuracy: accuracy
        }
        console.log("Results are:\n", result);

        if(result.item && result.accuracy>0.001){
            getInfo(result, response);
        }
        else{
            response.json({ "message": "none" });
        }
    });

};

var getInfo = function (result, clientRes) {
    console.log("Getting info on - " + result.item);
    var requestify = require('requestify');

    requestify.request('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        body: {
            "query": result.item
        },
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': "09b01498",
            'x-app-key': "0a9d243d7e7229a5dc789a30c37ec932"
        }
    })
        .then(function (response) {
            response.getBody();
            console.log("Nutritional information:\n");
            var data = JSON.parse(response.body);
            data = data.foods[0];
            var info={
                serving_weight_grams: data.serving_weight_grams,
                nf_calories: data.nf_calories,
                nf_total_fat: data.nf_total_fat,
                nf_saturated_fat: data.nf_saturated_fat,
                nf_cholesterol: data.nf_cholesterol
            }
            console.log(info);
            result.info = info;
            clientRes.json({ "message": result });
            // response.body;
        });

}


var picStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./public/User_data");
    },
    filename: function (request, file, callback) {
        callback(null, "target.jpeg");
    }
});



var uploadPic = multer({
    storage: picStorage,
    // limits: { fileSize: 1000000 },
    // fileFilter: function (request, file, cb) {
    //     console.log(file);
    //     if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
    //         console.log(file.mimetype);
    //         request.fileValidationError = true;
    //         return cb(null, false, new Error('Invalid file type'));
    //     }
    //     cb(null, true);
    // }
}).single('file');


var callUpload = function (request, response) {
    request.fileValidationError = false;
    try {
        uploadPic(request, response, function (error) {
            if (error) {
                console.log(error);
                response.json({ message: "fail" });
            } else if (request.fileValidationError === true) {
                response.json({ message: "fail" });
            }
            else {
                // console.log("Image upload successfull!\nAnalyzing image..");
                // response.json({ message: "success" });
                analyzeImage(response);
            }
        })
    }
    catch (error) {
        console.log(error);
    }
};


router.post('/uploadPic', function (request, response) {
    console.log("Uploading image & Analyzing..");
    // var file = request.files;
    // request.file = file;
    // saveFile();
    callUpload(request, response);
});

router.get('/runTest', function (request, response) {
    console.log("running test");

    // var requestify = require('requestify');

    // requestify.request('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    //     method: 'POST',
    //     body: {
    //         "query": "samosa"
    //     },
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-app-id': "09b01498",
    //         'x-app-key': "0a9d243d7e7229a5dc789a30c37ec932"
    //     }
    // })
    //     .then(function (response) {
    //         // Get the response body (JSON parsed or jQuery object for XMLs)
    //         response.getBody();
    //         console.log(response);
    //         // Get the raw response body
    //         response.body;
    //     });

    analyzeImage(response);
});


module.exports = router;