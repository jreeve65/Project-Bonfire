const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { Event } = require("../../models");

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
