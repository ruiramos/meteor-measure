Template.list.events({
  'click button.submit' : function () {
    // template data, if any, is available in 'this'
    console.log('submit', this);
  }
})

Template.list.attributes = function () {
  return Attributes.find({}, {sort: {name: 1}});
};


Template.attribute.events({
  'click span.minusButton' : function () {
    // template data, if any, is available in 'this'
    console.log(this._id);

    // Attributes.update(this._id, {$inc: {value: -1}});
  },
  'click span.plusButton' : function () {
    // template data, if any, is available in 'this'
    // Attributes.update(this._id, {$inc: {value: 1}});
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
    var newAttribute = {"name": $('.attributeName').val(), "value": 0}
    Rooms.update(this._id, {$push: {attributes: newAttribute}});
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

      if (!_.find(usersArray, function(el){ return el._id === currentUser._id})) {
        usersArray.push(currentUser)
        Rooms.update(data._id, {$set: {users: usersArray}});
      }
    }
    this.render();
  }
});

SettingsController = RouteController.extend({
  data: function() { return Rooms.findOne(this.params._id); },
  run: function() {
    this.render();
  }

});
