// Template.list.events({
//   'click button.submit' : function () {
//     // template data, if any, is available in 'this'
//     console.log('submit', this);
//   }
// })

// Template.list.attributes = function () {
//   return Attributes.find({}, {sort: {name: 1}});
// };

Template.settings.attributes = function () {
  return Attributes.find({"roomId": Session.get('roomId')});
};
Template.room.attributes = Template.settings.attributes;


Template.attribute.events({
  'click span.minusButton' : function () {
    // template data, if any, is available in 'this'
    Attributes.update(this._id, {$inc: {value: -1}});
  },
  'click span.plusButton' : function () {
    console.log(this);
    // template data, if any, is available in 'this'
    Attributes.update(this._id, {$inc: {value: 1}});
  }
});

Template.login.currentUser = function(){
  return Meteor.user();
}

Template.logout.events({
  'click button.logout': function(){
    Meteor.logout();
  }
})

var displayUI = function() {
  $('.create-form').fadeIn(500);
};

Template.createRoom.events({
  'click button.createRoom': function() {
    displayUI();
  },
  'click button.createSubmit': function(){
    var currentUser = Meteor.user();
    var data = {
      name: $('.roomId').val(),
      owner: currentUser,
      users: [currentUser],
      attributes: []
    };

    var newRoomId = Rooms.insert(data);
    Router.go('room', {_id: newRoomId});
  }
})

Template.settings.events({
  'click button.addAttribute': function(){
    Attributes.insert({"roomId": Session.get('roomId'), "name": $('.attributeName').val(), "value": 0});
  }
})

// --
MainController = RouteController.extend({
});

RoomController = RouteController.extend({
  data: function() { return Rooms.findOne(this.params._id); },

  run: function() {
    var data = this.data();

    if(data){
      var usersArray = data.users,
          currentUser = Meteor.user();

      Session.set('roomId', data._id);

      if (!_.find(usersArray, function(el){ return el._id === currentUser._id})) {
        usersArray.push(currentUser)
        Rooms.update(data._id, {$set: {users: usersArray}});
      }
    }
    this.render();
  }
});

SettingsController = RouteController.extend({
  data: function() { return Attributes.find({"roomId": this.params._id}) },
  run: function() {
    console.log(this.data().fetch());
    Session.set('roomId', this.params._id);
    this.render();
  }

});
