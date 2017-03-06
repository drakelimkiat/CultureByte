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
  'posts.insert'(title, body, pictureUrl) {
    check(title, String);
    check(body, String);
    check(pictureUrl, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      Posts.insert({
      title: title,
      body: body,
      pictureUrl: pictureUrl,
      createdAt: new Date(),
      author: Meteor.user()._id,
      username: Meteor.user().username
      });
    } catch (exception) {
      return exception;
    }
  },
});
