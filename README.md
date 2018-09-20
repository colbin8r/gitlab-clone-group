# gitlab-clone-group

A small tool written in JavaScript to clone all the repositories in a GitLab group.

## Install

```sh
$ git clone https://github.com/colbin8r/gitlab-clone-group.git
$ cd gitlab-clone-group
$ npm install
```

## Usage

View all the usage options:

```sh
$ node index.js --help
```

Simple usage:

```sh
$ node index.js --group MyGroupName --token YourGitLabToken
```

Use a custom GitLab server:

```sh
$ node index.js --group MyGroupName --token YourGitLabToken --url http://mygitlabserver.com:12345/
```

Clone via SSH:

```sh
$ node index.js --group MyGroupName --token YourGitLabToken --method ssh
```

Clone into a folder named `myclonedrepos`:

```sh
$ node index.js --group MyGroupName --token YourGitLabToken --folder myclonedrepos
```
