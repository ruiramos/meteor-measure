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
    Attributes.update(this._id, {$inc: {value: -1}});
  },
  'click span.plusButton' : function () {
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