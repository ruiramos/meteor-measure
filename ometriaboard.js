
Attributes = new Meteor.Collection("attributes");

if (Meteor.isClient) {

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
      console.log(this);
    },
    'click span.plusButton' : function () {
      // template data, if any, is available in 'this'
      Attributes.update(this._id, {$inc: {value: 1}});
      console.log(this);
    }
  });

  // Template.attribute.name
  // Template.attribute.value


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Attributes.find().count() === 0) {
      var names = ["Beer",
                   "Bug fixed",
                   "Email sent to client",
                   "Feature deployed",
                   "Meeting scheduled",
                   "Salaries payed"];
      for (var i = 0; i < names.length; i++)
        Attributes.insert({name: names[i], value: 0});
    }
  });
}

