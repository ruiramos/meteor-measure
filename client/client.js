
Template.settings.attributes = function () {
  return Attributes.find({"roomId": Session.get('roomId')});
};

Template.room.attributes = Template.settings.attributes;

Template.login.currentUser = function() {
  return Meteor.user();
};

var displayUI = function() {
  $('.create-form').fadeIn(500);
};


// -- Template Events

Template.room.events({
  'click .nav-button': function() {
    Router.go('settings', {_id: this._id});
  }
});

Template.attribute.events({
  'click .minusButton' : function () {
    Attributes.update(this._id, {$inc: {value: -1}});
  },
  'click .plusButton' : function () {
    Attributes.update(this._id, {$inc: {value: 1}});
  }
});

Template.settings.events({
  'click button.addAttribute': function(){
    if ($('.attributeName').val().length > 0) {
      Attributes.insert({
        "roomId": Session.get('roomId'),
        "name": $('.attributeName').val(),
        "value": 0
      });
    }
  },
  'click .nav-button': function() {
    Router.go('room', {_id: Session.get('roomId')});
  }
});

Template.logout.events({
  'click button.logout': function(){
    Meteor.logout();
  }
});

Template.createRoom.events({
  'click button.createRoom': function() {
    displayUI();
  },
  'click button.createSubmit': function() {
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
});

// -- View controllers
MainController = RouteController.extend({
});

RoomController = RouteController.extend({
  data: function() { return Rooms.findOne(this.params._id); },

  run: function() {
    var data = this.data();

    if (data) {
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
    Session.set('roomId', this.params._id);
    this.render();
  }
});
