ServiceConfiguration.configurations.upsert({
  service: "instagram"
}, {
  $set: {
    clientId: Meteor.settings.instagram.clientId,
    clientSecret: Meteor.settings.instagram.clientSecret
  }
});
