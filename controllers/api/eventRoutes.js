const router = require("express").Router();

// import any models you plan to use for this data's routes here
const {Event} = require("../../models");


router.get('/', async (req, res) => {
  try {
      // Example: Fetch all eventData
      const eventData = await Event.findAll();
      console.log(eventData);
      // res.render('all', { eventData });
      res.status(200).json(eventData); // Pass eventData to the template
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load eventData' });
  }
});


router.post("/", async (req, res) => {
  try {
    const eventData = await Event.create(req.body, {
      title: req.body.title,
      event_time: req.body.event_time,
      location: req.body.location,
      message: req.session.message,
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
