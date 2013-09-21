Attributes = new Meteor.Collection("attributes");
Rooms = new Meteor.Collection("rooms");

Router.map(function() {
  this.route('main', {
    path: '/'
  });
  this.route('room', {
    path: '/room/:_id',
    controller: 'RoomController',
    loadingTemplate: 'loading',
    data: function() { return Rooms.findOne(this.params._id); }
  });
});

