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

    // Make sure the user is logged in before inserting a post
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

  'posts.like'(post) {
    // Make sure the user is logged in before liking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.update({_id: post}, {$inc: {liked_count: 1} });
  },

  'posts.unlike'(post) {
    // Make sure the user is logged in before unliking a post
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.update({_id: post}, {$inc: {liked_count: -1} });
  },

  'users.like'(post, user) {
    // Make sure the user is logged in before appending to liked_posts
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update({_id: user._id}, {$push: {'profile.liked_posts': post}});
  },

  'users.unlike'(post, user) {
    // Make sure the user is logged in before removing from liked_posts
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update({_id: user._id}, {$pull: {'profile.liked_posts': post}});
  },
});
