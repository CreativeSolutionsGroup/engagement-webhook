# Contributing
All projects maintained by the Creative Solutions Group (CSG) are considered open source software, that is anyone is welcome and encouraged to contribute to its development. The primary work will be done by members of CSG.

To **contribute to a project**, the workflow is as follows:

1. Fork repository
2. Clone the fork

`git clone https://github.com/<your username>/<this repository>.git`

 3. Set upstream branch

`git remote add upstream https://github.com/CreativeSolutionsGroup/<this repository>.git`

Running `git remote -v` should show the **origin** and **upstream** branches with a fetch and branch endpoint

 4. Create feature/bug branch off master

`git checkout master`
`git checkout -b <branch name>`

5. Commit updates

`git add .`
`git commit -m "<commit message>"`

6. Push updates

`git push -u origin <branch name>`

7. Submit PR in GitHub

**NOTE:** You will want to periodically check for changes from the upstream branch. If changes have been made, you will want to update your remote and local master and rebase commits.

`git remote update`
`git push origin upstream`
`git checkout master`
`git pull -u origin master`
`git checkout -`
`git rebase master`
