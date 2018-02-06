var util = require('../lib/util.js')

module.exports = (app, db) => {
  app.get('/events', (req, res) => {
    db.users.findOne({ where: { username: req.session.user } }).then((user) => {
      db.events.findAll({
        where: { userId: user.dataValues.id }
      }).then((events) => {
        res.render('events', {events: events})
      }).catch((error) => console.log("ERROR AMIGO", error))
    })
  })

  app.post('/events', (req, res) => {
    db.events.create({
      name: req.body.name,
      category: req.body.category,
      place: req.body.place,
      address: req.body.address,
      event_starts: req.body.event_starts,
      event_ends: req.body.event_ends,
      userId: req.session.userId
    })
    .then(user => {
      res.redirect('back');
    })
    .catch(error => {
      console.log("error", error)
    });
  })

  app.post('/events/:id', (req, res) => {
    db.events.findOne({ where: { id: req.params.id } }).then((event) => {
      event.name = req.body.name
      event.category = req.body.category
      event.place = req.body.place
      event.address = req.body.address
      event.event_starts = req.body.event_starts
      event.event_ends = req.body.event_ends
      event.userId = req.session.userId
      event.save().then(() => res.status(200).redirect('/events'))
    }).catch((error) => console.log("error", error))
  })

  app.post('/events/update/:id', (req, res) => {
    console.log("Entra post")
    db.events.findOne({ where: { id: req.params.id }
    }).then((event) => {
      res.status(200).render('update_event', {event: event})
    }).catch((error) => console.log("error", error))
  })

  app.delete('/events/:id', (req, res) => {
    console.log("parametro", req.params.id)
    db.events.findOne({ where: { id: req.params.id } }).then((event) => {
      event.destroy().then(() => res.send(200));
    })
  })
}
