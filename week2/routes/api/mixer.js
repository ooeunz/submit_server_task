const express = require('express');
const router = express.Router();

const csv = require('csvtojson');
const json2csv = require('json2csv');
const fs = require('fs');
const stringify = require('csv-stringify');

// path
const memberFilePath = __dirname + '/../../public/csv/member.csv'

// function
const shuffle = (arr) => {
    let delta;
    for (let i = arr.length; i; i -= 1) {
        delta = Math.floor(Math.random() * i);
        [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
    }
    return arr;
}

router.get('/', async (req, res) => {
    try {
        const member =  await csv().fromFile(memberFilePath);

        // csv to json
        if (!member) {
            console.log(`member scv file is empty`);
            res.send(`member scv file is empty`);
        } else {
            // running
            let arr = member.map(n => n. groupIdx);
            
            arr = shuffle(arr);

            for (let i in member) {
                member[i].groupIdx = arr[i];
            }  
            
            // json to csv
            try {
                const resultCsv = json2csv.parse(member);
                // res.send(resultCsv);
                stringify(member, {header: true, columns: ['name','groupIdx']}, (err, output) => {
                    if (err) throw err;
                    else {
                        fs.writeFile(memberFilePath, output, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                
            } catch {
                console.log(`fs.writeFile err : ${err}`);
                res.send(`fs.writeFile err : ${err}`);
            }
            res.send(member);
        }
    } catch {
        console.log(`err with csv : ${err}`);
        res.send(`err with csv : ${err}`);      
    }
});


module.exports = router;