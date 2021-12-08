const {Router} = require('express');
const config = require('../config/default');
const shortId = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {

    const baseUrl = config.baseUrl;

    const {from} = req.body;

    const code = shortId.generate();

    const existing = await Link.findOne({from});

    if (existing) {
      return res.status(200).json({ link: existing});
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code, from, to, owner: req.user.userId
    })

    await link.save();

    res.status(201).json({link});

  } catch (error) {
    res.status(500).json({ message: 'Something going wrong, please try again...' });
  }

});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Something going wrong, please try again...' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Something going wrong, please try again...' });
  }
});

module.exports = router