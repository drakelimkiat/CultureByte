import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('posts', function postsPublication() {
        return Posts.find({}, {
            sort: { createdAt: -1 }
          });
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
        username: Meteor.user().username,
        liked_count: 0
      });
    } catch (exception) {
      return exception;
    }
  },

  'posts.like'(postId, userId) {
    check(postId, String);
    check(userId, String);

    // Make sure the user is logged in before liking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    // Increment liked_count of current post
    Posts.update({_id: postId}, {$inc: {liked_count: 1} });
    // Add current post id to liked_posts array of user
    Meteor.users.update({_id: userId}, {$push: {'profile.liked_posts': postId}});
  },

  'posts.unlike'(postId, userId) {
    check(postId, String);
    check(userId, String);

    // Make sure the user is logged in before unliking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    // Decrement liked_count of current post
    Posts.update({_id: postId}, {$inc: {liked_count: -1} });
    // Remove current post id from liked_posts array of user
    Meteor.users.update({_id: userId}, {$pull: {'profile.liked_posts': postId}});
  },

  'posts.update'(postId, title, body) {
    check(postId, String);
    check(title, String);
    check(body, String);

    // Make sure the user is logged in before unliking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update({_id: postId}, {$set: {title: title, body: body}});
  },
});
