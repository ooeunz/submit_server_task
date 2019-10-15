const express = require('express');
const csv = require('csvtojson');
const router = express.Router();

const memberFilePath = __dirname + '/../../public/csv/member.csv'
const groupFilePath = __dirname + '/../../public/csv/group.csv'

// find group members
router.get('/:groupIdx', async (req, res) => {
    try {
        const member = await csv().fromFile(memberFilePath);
        const group = await csv().fromFile(groupFilePath);

        if (!member || !group) console.log(`file read err : ${err}`);   // debug     

        IDX = req.params.groupIdx;

        let groupNum = group[String(Number(IDX - 1))].name;

        people = member.map(({name, groupIdx}) => {
            console.log(name);
            if (groupIdx === IDX) return name;
        })
        
        res.send(`${groupNum} : ${people}`);
        res.send
    } catch (err) {
        console.log(`err with csv : ${err}`);
    }
});

// find all
router.get('/', async (req, res) => {
    try {
     const member = await csv().fromFile(memberFilePath);

        if (!member) console.log(`file read err : ${err}`); // debug   
        else res.send(member);  // running

    } catch (err) {
        console.log(`file read err : ${err}`);
    }
});

module.exports = router;