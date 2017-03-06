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

    Posts.insert({
      title: title,
      body: body,
      pictureUrl: pictureUrl,
      createdAt: new Date(),
      author: Meteor.user()._id,
      username: Meteor.user().username
    });
  },

  'posts.like'(postId) {
    check(postId, String);

    // Make sure the user is logged in before liking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.update({_id: postId}, {$inc: {liked_count: 1} });
  },

  'posts.unlike'(postId) {
    check(postId, String);

    // Make sure the user is logged in before unliking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.update({_id: postId}, {$inc: {liked_count: -1} });
  },

  'users.like'(postId, userId) {
    check(postId, String);
    check(userId, String);

    // Make sure the user is logged in before appending to liked_posts
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update({_id: userId}, {$push: {'profile.liked_posts': postId}});
  },

  'users.unlike'(postId, userId) {
    check(postId, String);
    check(userId, String);

    // Make sure the user is logged in before removing from liked_posts
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update({_id: userId}, {$pull: {'profile.liked_posts': postId}});
  },

  'posts.usersWhoLiked'(postId) {
    check(postId, String);

    // Make sure the user is logged in before querying users who liked
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    let users = Meteor.users.find({'profile.liked_posts': postId});
    let usernames = users.map(function(user) {
      return user.username + " ";
    });
    return {'usernames': usernames};
  },
});
