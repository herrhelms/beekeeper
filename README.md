#BeeKeeper

![beekeeper screenshot](https://www.dropbox.com/s/bosdjlackt385vz/beekeeper_screenshot.jpg?raw=1)


### Installing BeeKeeper

A zipped version of the app can be found [here](https://github.com/herrhelms/beekeeper/blob/master/dist/BeeKeeper.zip) in the `./dist` folder of this repo. At the end of this page you can find instructions on how to build it yourself.

Best place to have the <kbd>BeeKeeper.app</kbd> is the `/Applications/` directory of your harddrive. If you like to auto-start the app upon login add it to `System Preferences -> Users & Groups -> Login Items`.

After launching the app take a look at your menu bar in the upper right of your screen. A little black & white bee icon should appear. Once you click on the bee your projects will appear. Tracking time is as easy as clicking on a project name and off you go... Click again if you're finished working on a particular project.

**Happy Timetracking!**

* * *

#### What's happening behind the scenes?

An invisible folder called `.beekeeper` will be added to your user directory (`~/`). Within this directory a file called `projects` handles a list containing all your projects. A dummy project should be available upon first run. You can open, edit and save the project file to your liking at any time. There's a link within the app to edit your project file.
Alternatively you can use the <kbd>Terminal.app</kbd> which can be found in `/Applications/Utilities` to do so.

```
open -e ~/.beekeeper/projects
```

The line above will open the projects file with <kbd>TextEdit.app</kbd>.

When editing your project file, add one project name per line and *make sure there's no empty line at the end of the file*! **Project names must be unique**. You can *use emojis* to make better distinction between your projects. Don't forget to *save the file when you're done* with your changes!

Every project will create its own timesheet .csv file. If you change the name of your project a new .csv file will be created upon next run. Deleting lines from the project file _will not_ remove any existing .csv files (timesheets) for this project. ~You need to restart the application whenever you make changes to the projects file.~

* * *

#### What about these timesheet files?
Timesheet reports are spreadsheets in .csv format. One exists for each project and will reside in the `~/.beekeeper/sessions` directory. For your convenience there's a link to access all your timesheets from within the app.

The format of the .csv is as follows:
`DATE IN;DATE OUT;SECONDS`

* * *

#### Can't see no time passing?
That's right! Keep in mind that I wanted this app to be as simple as possible! So for now BeeKeeper *does not show any time spent* on your projects within the app. You should use the .csv files for each project to further accumulate and sum up the time spent on each project for billing purposes or whatever you wish...

* * *

#### Disclaimer / Terms and Conditions

This is a small electron app written by [@herrhelms](http://github.com/herrhelms) under MIT license. You can go ahead and change, modify or extend the code to your own liking.
Needless to say: **Use at your own risk!** The creator of this app is not in any way liable and cannot be held responsible for errors or any consequences arising from the use of this app.

Feedback, Issue reports, Pull requests and donations are welcome!
I'd be very happy to hear from you. [Get in touch](https://twitter.com/herrhelms) on twitter!

* * *

#### Wanna build the app from source?
 - Clone the repo onto your harddrive
 - `cd` into the repo
 - run `npm install`
 - run `electron-packager . --platform=darwin --icon=Icon --arch=x64 --out=dist --extend-info=extend-build.plist`
 - look into the `./dist` folder to find your BeeKeeper app

 * * *

#### Roadmap
  - [x] auto-restart app when projects file is saved
  - [ ] warn for/disallow same project names
  - [ ] stop/restart timers on system sleep/wake events (e.g. screensaver)
  - [ ] stop tracking when computer is idle for more then X minutes
  - [ ] create a help and feedback webpage
  - [ ] make the running timer/project more obvious
  - [ ] find a way to show the total time spent on projects
  - [ ] add hourly rates for each project to calculate income within csv
