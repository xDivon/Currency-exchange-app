const router = require('express').Router()
const axios = require('axios')

// define the default route that fetches all of our notes
router.get('/', async function (req, res) {
    // data the conserves our API quota for development
    const placeholderData = [
        {
            "_id": "database1591127768852",
            "note": "Hello",
            "_createdOn": "2020-06-02T19:56:08.852Z",
            "_lastModifiedOn": "2020-06-02T19:56:08.852Z"
        },
        {
            "_id": "database1591134992139",
            "note": "New note",
            "_createdOn": "2020-06-02T21:56:32.139Z",
            "_lastModifiedOn": "2020-06-02T21:56:32.139Z"
        }
    ]
    try {
        // add api call
        res.json({ notes: placeholderData })
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

module.exports = router