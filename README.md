# BeeKeeper

![beekeeper screenshot](https://www.dropbox.com/s/bosdjlackt385vz/beekeeper_screenshot.jpg?raw=1)


### Installing BeeKeeper

Download the latest version of the app  [here](https://github.com/herrhelms/beekeeper/blob/master/dist/BeeKeeper.zip). You could also download the whole repo and find the zipped version of the app within in the `./dist` folder. At the end of this file you find instructions how to build the app by yourself.

Best place to have the <kbd>BeeKeeper.app</kbd> is the `/Applications/` directory of your harddrive. If you like to auto-start the app upon login add it to `System Preferences -> Users & Groups -> Login Items`.

After launching the app take a look at your menu bar in the upper right of your screen. A little black & white bee icon should appear. Once you click on the bee your projects will appear. Tracking time is as easy as clicking on a project name and off you go... Click again if you're finished working on a particular project.

**Happy Timetracking!**

* * *

#### What's happening behind the scenes?

An invisible folder called `.beekeeper` will be added to your user directory (`~/`). Within this directory a file called `projects` handles a list containing all your projects. A dummy project is available upon first run. There's a link within the app to access and edit your project file. You can open, modify and save your projects at any time.

When editing your project file, add one project name per line and *make sure there's no empty line at the end of the file*! **Project names must be unique**. You can *use emojis* to make better distinction between your projects. Don't forget to *save the file when you're done* with your changes!

Every project will create its own timesheet .csv file which will reside in `~/.beekeeper/sessions`. For your convenience there's a link to access all your timesheets from within the app. If you change the name of your project a new .csv file will be created upon next run. Deleting lines from the project file _will not_ remove any existing .csv files (timesheets) for this project.

The format of the .csv timesheets is as follows:
`DATE IN;DATE OUT;SECONDS`

* * *

#### WTF, I can't see no time passing!
That's right! Keep in mind that I wanted this app to be as simple as possible! For now BeeKeeper *does not show any time spent* within the app. You should use the .csv files for each project to further accumulate and sum up the time spent on each project for billing purposes or whatever you wish ...

* * *

#### Disclaimer / Terms and Conditions

This is a small electron app written by [@herrhelms](http://github.com/herrhelms) under MIT license. You can go ahead and change, modify or extend the code to your own liking.
Needless to say: **Use at your own risk!** The creator of this app is not in any way liable and cannot be held responsible for errors or any consequences arising from the use of this app.

* * *

#### One more thing

Feedback, issue reports, pull requests and donations are very welcome!
I'd be very happy to hear from you. [Get in touch](https://twitter.com/herrhelms) on twitter!

Since there are no hidden analytics within the app I have no clue how many people are using beekeeper. It would actually be really great to hear from you since I have no other way to get in touch with the users of my app. I'd love to get your feedback, comments, ideas and constructive criticism.

If this app helps you to be more productive consider sending a dollar or two via [paypal](https://bit.ly/fund-me) or some satoshis to [1DH5y9cZhS4s4cDpEK5SNnU3u2iiVGjGVw](bitcoin://1DH5y9cZhS4s4cDpEK5SNnU3u2iiVGjGVw).

Thanks!

* * *

#### Wanna build the app from source?

No problem! Just follow the instructions below and you should be all set. If you stumble upon any difficulties please let me know and [report an issue](https://github.com/herrhelms/beekeeper/issues/new).

 - Clone the repo onto your harddrive
 - `cd` into the repo
 - run `npm install`
 - run `electron-packager . --platform=darwin --icon=Icon --arch=x64 --out=dist --extend-info=extend-build.plist`
 - look into the `./dist` folder to find your BeeKeeper app

 * * *

#### Roadmap
  - [x] auto-restart app when projects file is saved
  - [x] stop/restart timers on system sleep/wake events (e.g. screensaver)
  - [x] create a help and feedback webpage (link to this readme)
  - [x] make the running timer/project more obvious
  - [ ] better date format in csv files
  - [ ] track minutes passed instead of seconds passed in csv files
  - [ ] (?) stop tracking when computer is idle for more then X minutes
  - [ ] (?) warn for/disallow same project names
  - [ ] (?) find a way to show the total time spent on projects
  - [ ] (?) add hourly rates for each project to calculate income within csv
