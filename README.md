![beekeeper screenshot](https://www.dropbox.com/s/bosdjlackt385vz/beekeeper_screenshot.jpg?raw=1)

### Before you start / Setup instructions

1.) **open <kbd>Terminal.app</kbd>** from `/Applications/Utilities/`

2.) **enter the following commands** and press enter after each line

```
 mkdir ~/.beekeeper
 touch ~/.beekeeper/projects
 mkdir ~/.beekeeper/sessions
```

3.) **open the projects file and add some project names** - every project will create it's own timesheet .csv file. whenever you change the name of a project a new .csv file will be created.
deleting items from the project file __will not__ remove the .csv files (timesheets) for a removed project.

```
open -e ~/.beekeeper/projects
```

The line above will open the __projects__ file with <kbd>TextEdit.app</kbd>. Add one project name per line. Make sure there's no empty line at the end of the file! You can use emojis to make better distiction between your projects. Don't forget to save the file when your\'e done!

-

### Start BeeKeeper

A zipped version of the app can be found [here](https://github.com/herrhelms/beekeeper/blob/master/dist/BeeKeeper.zip) in the `./dist` folder of this repo. At the end of this page you can find instructions on how to build it yourself.

Best place to have the <kbd>BeeKeeper.app</kbd> is the `/Applications/` directory of your harddrive. If you like to start the app upon login. Add it to System Preferences -> Users & Groups -> Login Items.

After launching the app take a look at your menu bar in the upper right of your screen. A little black & white bee icon should appear. Once you click on the bee your projects will appear. Tracking time is as easy as clicking on a project name and off you go... Click again if you're finished working on a particular project.

**Happy Timetracking!**

-

#### What about these .csv files?
Timesheet reports for each project will reside in the `~/.beekeeper/sessions` folder.

The format is as follows:
`DATE IN;DATE OUT;SECONDS`

-

#### Can't see no time passing!
That's right! Keep in mind that I wanted this app to be as simple as possible! So for now BeeKeeper *does not show any time spent* on your projects within the app. You should use the .csv files for each project to further accumulate and sum up the time spent on each project for billing purposes or whatever you wish...

-

For your convenience there are links to access your timesheets and to edit the projects file from within the app. **You need to restart the application** whenever you make changes to the projects file.

-

#### Disclaimer / Terms and Conditions

This is a small electron app written by [@herrhelms](http://github.com/herrhelms) under MIT license. You can go ahead and change, modify or extend the code to your own liking.
Needless to say: **Use at your own risk!** The creator of this app is not in any way liable and cannot be held responsible for errors or any consequences arising from the use of this app.

Feedback, Issue reports, Pull requests and donations are welcome!
I'd be very happy to hear from you. [Get in touch](https://twitter.com/herrhelms) on twitter!

-

#### Wanna build the app from source?
 - Clone the repo onto your harddrive
 - `cd` into the repo
 - run `npm install`
 - run `electron-packager . --platform=darwin --icon=Icon --arch=x64 --out=dist --extend-info=extend-build.plist`
 - look into the `./dist` folder to find your BeeKeeper app
