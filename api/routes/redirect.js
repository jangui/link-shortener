const router = require('express').Router();

const Redirect = require('../models/Redirect.model');

router.route('/create').post( async (req, res) => {
    const shortUrl = req.body.shortUrl;
    const redirectUrl = req.body.redirectUrl;

    const redirect = new Redirect({shortUrl: shortUrl, redirectUrl: redirectUrl});

    try {
        const redirectDoc = await redirect.save();
        res.status = 200;
        return res.json({
            msg: `Success! /${shortUrl} redirects to ${redirectUrl}`,
            redirect: redirect,
        });

    } catch(err) {
        res.status = 500;
        return res.json({msg: `Error: ${err}`});

    }
});

router.route('/').post( async (req, res) => {
    let skip = parseInt(req.body.skip);
    let limit = parseInt(req.body.limit);
    if (!(skip)) { skip = 0 };
    if (!(limit)) { limit = 20 };

    try {
        let redirects = Redirect.find().skip(skip).limit(limit);

        return res.status(200).json({
            msg: `Successfully got redirects ${skip} - ${skip+limit}`,
            redirects: redirects,
        });
    } catch(err) {
        return res.status(500).json({
            msg: `Error: ${error}`
        });
    }
});

router.route('/:id').get( async (req, res) => {
    const redirectID = req.params.id;

    try {
        const redirect = Redirect.find({_id: redirectID});

        return res.status(200).json({
            msg: `Successfully got redirect ${redirect.shortUrl}`,
            redirect: redirect,
        });
    } catch(err) {
        return res.status(500).json({
            msg: `Error: ${error}`
        });
    }
});

router.route('/update/:id').post( async (req, res) => {
    const shortUrl = req.body.shortUrl;
    const redirectUrl = req.body.redirectUrl;
    if (!(shortUrl && redirectUrl)) {
        return res.status(409).json({
            msg: `Error: not enough data to update`,
        });
    }

    try {
        const redirect = await Redirect.findOneAndUpdate(
            {
                _id: id
            },
            {
                shortUrl: shortUrl,
                redirectUrl: redirectUrl
            },
        );
        return res.status(200).json({
            msg: `Success! ${shortUrl} now redirects to ${redirectUrl}`,
        });

    } catch(err) {
        return res.status(500).json({
            msg: `Error: ${err}`,
        });
    }
});

router.route('/delete/:id').post( async (req, res) => {
    const redirectID = req.params.id;

    try {
        const success = await Redirect.findOneAndDelete({_id: redirectID});
        res.status = 200;
        return res.json({
            msg: `Success! /${shortUrl} no longer redirects to ${redirectUrl}`,
        });

    } catch(err) {
        res.status = 500;
        return res.json({msg: `Error: ${err}`});

    }
});

module.exports = router;

