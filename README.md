# CultureByte
NCSV_30_Team_Oasis_NVC

## Setting Up
1. `cd` into the directory that you want to install the project file in
2. `git clone git@github.com:drakelimkiat/CultureByte.git`
3. `cd` into the CultureByte folder
4. Type `meteor` in your Terminal. If you encounter `meteor command not found`, type `curl https://install.meteor.com/ | sh` for Mac/Linux
5. If you encounter an error: `Your application is crashing. Waiting for file change.` do Ctrl+C to terminate the process, then do `meteor npm install --save babel-runtime`.
6. After meteor is successfully installed, just type `meteor`

## Populating local MongoDB
1. Go to your app directory and type `meteor mongo`
2. Type `db.posts.insert({ name: "Hello world!", createdAt: new Date(), body: "somebody" });`
3. `posts` in `db.posts` is the MongoDB collection name. Refer to `imports/api/posts.js` to see how web app can access collection

## Resetting local MongoDB (deletes everything)
1. Exit any currently running Meteor project
2. Type `meteor reset`

## MongoDB Schema and quick user guide
1. After going to app directory and typing 'meteor mongo', default db would be 'meteor'
2. Type 'db.getCollectonNames()' to view all collection names in the db. 
3. Currently, you should see 3 collection names: "meteor_accounts_loginServiceConfiguration", "posts", "users". 
4. To view the contents of the individual collection, type 'db.<collection_name>.find()'. Add a '.pretty()' at the back to prettify it, i.e. 'db.<collection_name>.find().pretty()'.
5. Current example schema for each entry of 'users': 
{
	"_id" : "123",
	"createdAt" : ISODate("2017-03-06T01:11:17.476Z"),
	"services" : {
		"password" : {
			"bcrypt" : "xxx"
		},
		"resume" : {
			"loginTokens" : [
				{
					"when" : ISODate("2017-03-06T01:11:17.493Z"),
					"hashedToken" : "xxx"
				}
			]
		}
	},
	"username" : "celesteanglm"
}
6. Current example schema for each entry of 'posts':
{
	"_id" : "xxx",
	"title" : "xxx",
	"body" : "xxx",
	"pictureUrl" : "xxx.png",
	"createdAt" : ISODate("2017-03-06T01:11:49.621Z"),
	"author" : "123",
	"username" : "celesteanglm"
}
7. Note that "_id" and "username" would be mapped to both collections, e.g. each time the user with username celesteanglm creates a post, in the entry in 'posts', the "username" field would contain the "username" from the 'users' collection, and the "author" field would contain the "_id" from the 'users' collection.

## Development Workflow
1. `git checkout -b branch-name` to create new branch. Replace 'branch-name' with appropriate description of what the branch is about.
2. Branches should preferably be small changes / features to be added so that master can be updated iteratively and quickly.
3. Once done with branch, submit a Pull Request, type "Closes #issue-number" in description and request a reviewer to look at the changes and determine that code is working / implemented well.
4. Merge master into branch and solve merge conflicts if there are any.
5. Once merge is allowed in Pull Request, merge branch into master or appropriate branch.
6. Delete branch / close related issues if needed.

## Convenient links
NVC Tom Kosnik Dropbox
https://www.dropbox.com/personal/ncsv30%20-%20nvc

NVC Google Drive link
https://drive.google.com/drive/u/0/folders/0B1gxCZLtJyNPeGpQa3o3clFOWWM

Consolidated Factoids and Anecdotes
https://docs.google.com/document/d/1-bROC4qArekguslZ6ot9YqZrhwd1YeZ3ylc0xskIBPc/edit

Meteor & React Tutorial
https://www.meteor.com/tutorials/react/creating-an-app
