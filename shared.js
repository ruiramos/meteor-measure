Attributes = new Meteor.Collection("attributes");
Rooms = new Meteor.Collection("rooms");

Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('room', {
    path: '/room/:_id',
    controller: 'RoomController',
    data: function() { return Rooms.findOne(this.params._id); }
  });
});

