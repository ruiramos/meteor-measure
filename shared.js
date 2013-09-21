Attributes = new Meteor.Collection("attributes");
Rooms = new Meteor.Collection("rooms");

Router.map(function() {
  this.route('main', {
    path: '/',
    template: 'main',
    renderTemplates: {
      'homeTopBar': {to: 'topbar'}
    }
  });
  this.route('room', {
    path: '/room/:_id',
    controller: 'RoomController',
    loadingTemplate: 'loading'
  });
  this.route('settings', {
    path: '/room/:_id/settings',
    controller: 'SettingsController',
    loadingTemplate: 'loading'
  });
});

