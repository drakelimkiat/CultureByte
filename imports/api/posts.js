import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('posts', function postsPublication() {
        return Posts.find();
    });
}