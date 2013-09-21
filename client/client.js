Template.list.events({
  'click button.submit' : function () {
    // template data, if any, is available in 'this'
    console.log('submit', this);
  }
})

Template.list.attributes = function () {
  return Attributes.find({}, {sort: {name: 1}});
};


// Template.attribute.events({
//   'click span.minusButton' : function () {
//     // template data, if any, is available in 'this'
//     Attributes.update(this._id, {$inc: {value: -1}});
//   },
//   'click span.plusButton' : function () {
//     // template data, if any, is available in 'this'
//     Attributes.update(this._id, {$inc: {value: 1}});
//   }
// });

Template.login.currentUser = function(){
  return Meteor.user();
}

Template.logout.events({
  'click button.logout': function(){
    Meteor.logout();
  }
})

var displayUI = function() {
  $('.create-form').show();
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
      users: [currentUser]
    };

    var newRoomId = Rooms.insert(data);
    console.log(newRoomId);
    Router.go('room', {_id: newRoomId});

  }
})

// --
MainController = RouteController.extend({
});

RoomController = RouteController.extend({

  run: function(){
    if(this.data()){
      var usersArray = this.data().users,
          currentUser = Meteor.user();

      if(!_.contains(usersArray, currentUser)){
        usersArray.push(currentUser)
        Rooms.update(this.data()._id, {$set: {users: usersArray}});
      }

      this.render();
    }
    // var groupUsers = this.data();
    // if(this.data())
    //   var users = this.data().users;

    // console.log(groupUsers, Meteor.user());

  }
});
