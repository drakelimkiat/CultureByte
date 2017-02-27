import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('posts', function postsPublication() {
        return Posts.find();
    });
}

Meteor.methods({
  'posts.insert'(title, body) {
    check(title, String);
    check(body, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Posts.insert({
      title: title,
      body: body,
      createdAt: new Date(),
      author: Meteor.user()._id,
      username: Meteor.user().username
    });
  },
});