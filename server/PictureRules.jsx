Slingshot.fileRestrictions("PostPicture", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  maxSize: 20 * 1024 * 1024
});


Slingshot.createDirective("PostPicture", Slingshot.S3Storage, {
  bucket: "culturebyte", // change this to your s3's bucket name

  acl: "public-read",

  authorize: function (file, metaContext) {

    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },

  key: function (file, metaContext) {
    // User's image url with ._id attached:
    return metaContext.avatarId + "/" + Date.now() + "-" + file.name;
  }
});
