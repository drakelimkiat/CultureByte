import { Meteor } from 'meteor/meteor';
import { Instagram } from 'meteor/helium:instagram';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'updateInstagramData'(userId, token, secret) {
    let credential = Instagram.retrieveCredential(token, secret);
    // "credential" is now an object with the data from Instagram
    let accessToken = credential['serviceData']['accessToken'];
    let username = credential['serviceData']['user']['username'];
    Meteor.users.update({_id: userId}, {$set: {'profile.instagram.username': username, 'profile.instagram.accessToken': accessToken}});
    return username;
  },
});