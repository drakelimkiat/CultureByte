# CultureByte
NCSV_30_Team_Oasis_NVC

## Setting Up
1. `cd` into the directory that you want to install the project file in 
2. `git clone git@github.com:drakelimkiat/CultureByte.git`
3. `cd` into the CultureByte folder
4. Type `meteor` in your Terminal. If you encounter `meteor command not found`, type `curl https://install.meteor.com/ | sh` for Mac/Linux
5. If you encounter an error: `Your application is crashing. Waiting for file change.` do Ctrl+C to terminate the process, then do `meteor npm install --save babel-runtime`.
6. After meteor is successfully installed, just type `meteor`

## Development Workflow
1. `git checkout -b branch-name` to create new branch. Replace 'branch-name' with appropriate description of what the branch is about.
2. Branches should preferably be small changes / features to be added so that master can be updated iteratively and quickly.
3. Once done with branch, submit a Pull Request, type "Closes #issue-number" in description and request a reviewer to look at the changes and determine that code is working / implemented well.
4. Merge master into branch and solve merge conflicts if there are any.
5. Once merge is allowed in Pull Request, merge branch into master or appropriate branch.
6. Delete branch / close related issues if needed.
