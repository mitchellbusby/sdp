# SDP Spring '15 Project

Repo for our project

##Getting Started

Pre Requisites:

- git bash
- node and npm (node package manager)
- gulp (installed globally via node package manager)
- bower (installed globally via node package manager)

Note: The deployment setup has been verified to work in Mac OS X 10.10 and above, and Microsoft Windows 8 and up.

Bootstrap (install dependencies) the project with

```npm install```

Then compile the Javascript files

```gulp build```

Run the server (or host it yourself!)

```gulp run```

## Recommended Development Tools

We recommend you use the following to speed up your developer workflow:

- Text editor such as Jetbrains WebStorm or SublimeText
- Google Chrome with the ng-inspector add on for debugging, or Mozilla Firefox 

## Development Standards

- We use a standard "git flow" procedure to develop and maintain code and bug fixes, with each major feature being developed on a separate branch. Before merging branches, the code must pass all unit tests and pass the Protractor regression testing suite.
- Follow AngularJS and JavaScript best practices


#Deployment

Install dependencies

```npm install```

Build the system

```gulp build```

Host the files yourself.

#Updating

```npm install```

```bower update```

##Testing

###Unit Testing

```npm test```

-- opens up the unit testing suite and starts watching for new tests, and passing them

###End To End Testing (Functional Testing)

Install protractor and its webdriver first (this is really large and will take awhile)

```[sudo] npm run update-webdriver```


Then run the webserver

```gulp run ```

Then run the end to end test launcher

```npm run protractor```

## For more documentation
[Google Drive Folder](https://drive.google.com/drive/folders/0BzxRdBrzgiQMfnNSMFZHZnFBTUlPWUNfUWxVWXJEU3RZWDkwaGVyWlRiNTcxRmxRY0s5aE0)
