# Using Git on the HPCC

## What is Git?

Originally developed by Linus Torvalds in 2005, Git is a famous and the most widely used version control system. It is a actively maintained, open source project that many companies rely on to work on their products.

To read more about get, [check out this article by Atlassian](https://www.atlassian.com/git/tutorials/what-is-git).

## Why use Git?

The architecture of Git allows it to be very flexiable in nature. Unlike other version control systems, like Subversion, Git is a Distributed Version Control System. This means that, instead of keeping a log of all of the changes to a project in one place, every working location (or repositories) of the project has a copy of the log of all of the changes.

To read more about get, [check out this article by Atlassian](https://www.atlassian.com/git/tutorials/what-is-git).

## Git Terms
* Remote: 

> This is the version of something that is hosted on a server (ex. GitHub). It can be connected to local clones so that changes can be synced.

* Repository:

> A repository is the most basic element of GitHub. They're easiest to imagine as a project's folder. A repository contains all of the project files (including documentation), and stores each file's revision history. Repositories can have multiple collaborators and can be either public or private.

* Commit:

> A commit, or "revision", is an individual change to a file (or set of files). It's like when you save a file, except with Git, every time you save it creates a unique ID (a.k.a. the "SHA" or "hash") that allows you to keep record of what changes were made when and by who. Commits usually contain a commit message which is a brief description of what changes were made.

* Branch:

> A branch is a parallel version of a repository. It is contained within the repository, but does not affect the primary or master branch allowing you to work freely without disrupting the "live" version. When you've made the changes you want to make, you can merge your branch back into the master branch to publish your changes.

* Merge:

> Merging takes the changes from one branch (in the same repository or from a fork), and applies them into another. This often happens as a pull request (which can be thought of as a request to merge), or via the command line.

* Pull:

> Pull refers to when you are fetching in changes and merging them. For instance, if someone has edited the remote file you're both working on, you'll want to pull in those changes to your local copy so that it's up to date.

* Push:

> Pushing refers to sending your committed changes to a remote repository, such as a repository hosted on GitHub. For instance, if you change something locally, you'd want to then push those changes so that others may access them.

* Fetch:

> Fetching refers to getting the latest changes from an online repository without merging them in. Once these changes are fetched you can compare them to your local branches (the code residing on your local machine).

* Pull Request:

> Pull requests are proposed changes to a repository submitted by a user and accepted or rejected by a repository's collaborators. Like issues, pull requests each have their own discussion forum.

All terms pulled from [GitHub's glossary](https://help.github.com/articles/github-glossary/).



# Getting Started

## Prerequisites

On your local machine, install git from using the following links:

- [Mac](https://git-scm.com/downloads)
- [Windows](https://gitforwindows.org/) - Be sure to install Git Bash as well, as it will allow you to run the commands below without conversions.

You may be prompted to tell git who you are throughout this tutorial. If this does happen, follow the following steps:

 1. Set your user email. This is an arbitry email and is only used for identification on edits to your repositories.

 - Globally (Affects all repositories)
	 `git config --global user.email "you@example.com"`
 - Locally (Afftects only the repository you are viewing
	 `git config user.email "you@example.com"`

2. Set your user name. This is an arbitry name and is only used for identification on edits to your repositories.

 - Globally (Affects all repositories)
	 `git config --global user.name "Your Name"`
 - Locally (Afftects only the repository you are viewing
	 `git config user.name "Your Name"`

## Part 1: Create a new repository on the HPCC

To introduce working with the Git on the HPCC, we will use the HPCC as the remote for our sample repository.

1. Log into the HPCC from a new terminal (Git Bash on Windows)

	`ssh <caseID>@rider.case.edu`

2. Once logged in, create a new folder called **New Repository** and navigate into it.


	`mkdir "repos/New Repository"`
	`cd "repos/New Repository"`

3. Initialize the new repository.

	`git init --bare`

4. Type `exit` to close the SSH connection.

## Part 2: Clone a repo from the HPCC on your computer.

1. After the installation succededs, open a terminal (Git Bash on Windows) and navigate to a directory you would like to clone the repository to.

2. Next, clone the repository from the HPCC.

`git clone "ssh://<caseID>@rider.case.edu/home/<caseID>/repos/New Repository/"`

**Note**: Because we are getting the repository via SSH, you will be prompted to sign in, just like you would have to when you SSH into the HPCC for general use.

3. Now, you can navigate to the folder you cloned the repository to and you will see a new folder called **New Repository**.

## Part 3: Add files and push as a new branch from your computer to HPCC.

As you make modifications to the repository, you may want to sync your changes with your repository on the HPCC. The steps below will help simultate this situation.

1. Navigate to your repository in a file explorer.

2. Create a new file, **ignore_me.txt**, with the following contents:
```
Ignore Me!
```

3. Navigate to your repository in a terminal (Git Bash on Windows).

4. Create a new file named **README.md** and load some text into it.

	`printf "# Demo using Git with the HPCC" >> README.md`

5. Next, create a new file called **.gitignore** and ignore our new file, **ignore_me.txt**:

    `printf "ignore_me.txt" >> .gitignore`

See [gitignore docs](https://git-scm.com/docs/gitignore) to learn more about ignoring files in Git.

6. Stage the changes

    `git add --all`

**Note:** You may get an error that says *LF will be replaced by CRLF in README.md*. You may ignore this warning.

**Note:** The `--all` flag tells Git that we want to stage all new, modified, and deleted files. See [the docs](https://git-scm.com/docs/git-add) to learn more.

7. Commit the changes:

    `git commit -m "initial commit"`

8. Finally, push the changes to the remote:

    `git push origin master`

At this point, we have created a repository on the HPCC, cloned the repository onto our local computer, made changes to the repository, and updated the HPCC with our changes. If you clone the repository again, you will see that the changes are reflected.

## Part 4: Pull from the HPCC to your computer

If there are multiple people working on the same project, the origin may updated without your local clone knowing. To simultate this, follow these steps:

1. In a directory away from you local clone of the repository, open a terminal, make another clone, and jump inside it:

`git clone "ssh://<caseID>@rider.case.edu/home/<caseID>/repos/New Repository/"`
`cd "New Repository"`

**Note**: Because we are getting the repository via SSH, you will be prompted to sign in, just like you would have to when you SSH into the HPCC for general use.`

2. Open another terminal, and navigate to the original clone you created.

3. Create two new files and paste their respective code:
- hello.c
```c
// Chris Fietkiewicz
# include <stdio.h>
int main() {
	printf("Hello from the C program!\n");
	return 0;
}
```
- hello.slurm
```bash
#!/bin/sh
#SBATCH --nodes=1
#SBATCH --cpus-per-task=4  # 4 cores
#SBATCH --time=0-00:05:00  # 5 minutes
#SBATCH --output=my_output.txt 

cp hello.c $PFSDIR/.
cd $PFSDIR
gcc hello.c -o hello
./hello
```

4. Stage the changes

    `git add --all`

**Note:** You may get an error that says *LF will be replaced by CRLF in README.md*. You may ignore this warning.

**Note:** The `--all` flag tells Git that we want to stage all new, modified, and deleted files. See [the docs](https://git-scm.com/docs/git-add) to learn more.

5. Commit the changes:

    `git commit -m "added new files"`

6. Push the changes to the remote:

    `git push origin master`

7. In the new clone of the repository, type: `ls`

You should see that there is only a README.md file.

8. Now, pull the new changes from the HPCC, our remote:

	`git pull`

9. Finally, if you type `ls`, you will now see our newly added files listed.

## Part 5: Create branch

As introduced in the last part, collaboration is a very big use-case of version control systems such as Git. In Git, it is best practice to create branches in which you work on small sections of work at a time. So far, we have made edits directly to our master branch, or the main branch of the project. Because our project is small, we can do these types of edits without consquence, but as soon as we introduce more collaborators, it is wise to keep a backup of all the work. In most cases, the master branch is the backup and is where are future developments *branch* off of.

In this section, we will create a new branch and make changes to it.

1. Open your original clone of the repository in a terminal.

2. Use the following command to create a new branch named **development**.

	`git branch development`

3. Checkout the **development** branch:

	`git checkout development`

When you type this command, you checkout the **development** branch and all changes you make will only affect this branch.

4. Now, edit the README.md file:

	`printf "\nModification from the development branch." >> README.md`

5. Stage the changes

    `git add --all`

**Note:** You may get an error that says *LF will be replaced by CRLF in README.md*. You may ignore this warning.

**Note:** The `--all` flag tells Git that we want to stage all new, modified, and deleted files. See [the docs](https://git-scm.com/docs/git-add) to learn more.

6. Commit the changes:

    `git commit -m "development branch change"`

7. Push the changes to the remote:

    `git push --set-upstream origin development`

This creates the new branch on our remote and sets it as the tracked branch for our local **development** branch.

8. Next, open your second clone of the repository in a terminal and pull from the remote

	`git pull`

9. Now, if you open README.md, you will see that your change is not shown, however, if you switch to the development branch, you will then see the change. Use the following command to switch branches:

	`git branch development`

**Note:** At this point, you no longer need two clones on your local machine and may delete one

## Part 6: Merge two branches

After you make changes in a branch, you may want the changes to be in the main (**master**) branch. To do this use the following commands:

1. Open a clone of the repository in a terminal.

2. Make sure you are on the **master** branch:

	`git checkout master`

3. Now, merge the development **branch** into **master**:

	`git merge development`

4. Then, push the changes to the remote:

	`git push --delete development`

5. Finally, delete the **development** branch.

	`git branch -d development` - Local
	`git push origin --delete development`

## Conclusion

Great job! You have reached the end of the tutorial and now know the basics of Git while working with the HPCC.