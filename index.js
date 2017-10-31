const electron = require('electron')
const {app, Menu, MenuItem, Tray} = require('electron')
const fs = require('fs')
const shell = require('child_process')
var chokidar = require('chokidar');

let path = null
let apppath = null
let isRunning = []
let interval = null
let setupDone = false
let currentRunning = null
let tray = null
let contextMenu = null

// watch for file changes
var log = console.log.bind(console);

// timer
const startTimer = (name) => {
  currentRunning = name
  interval = setInterval(everySecond, 1000)
  isRunning[name] = true
  prepareTimesheet(name)
}

const everySecond = () => {}

const stopTimer = (name) => {
  clearInterval(interval)
  interval = null
  currentRunning = null
  isRunning[name] = false
  openAndExtentTimesheet(name)
}

const resumeTimer = (name) => {
  currentRunning = name
  interval = setInterval(everySecond, 1000)
  isRunning[name] = true
  prepareTimesheet(name)
}

const pauseTimer = (name) => {
  clearInterval(interval)
  interval = null
  openAndExtentTimesheet(name)
}

// csv timesheets
const prepareTimesheet = (name) => {
  var filepath = path + "sessions/" + name + ".csv"
  attachToOrCreateTimesheet(filepath)
}

const attachToOrCreateTimesheet = (filepath) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (!err && data) {
      let content = data.toString()
      let newline = '\n' + new Date() + ';'
      let newcontent = content + newline
      fs.writeFile(filepath, newcontent, (err) => {
        if (err){
          console.log("An error ocurred creating the file "+ err.message)
        }
      })
    } else {
      let content = new Date() + ';'
      try { fs.writeFileSync(filepath, content, 'utf-8') }
      catch(e) { console.log('Failed to save the file !') }
    }
  })
}

// settings WIP -> for now only the about submenu can be hidden
var readSettings = () => {
  var filepath = path + "settings";
  var returnval;
  return fs.readFile(filepath, 'utf-8', (err, data) => {
    let existingcontent = data.toString().split('\n')
    if (existingcontent[0].split(':')[1] == 'TRUE;') {
      returnval = true
    }
  })
  return returnval;
}

const readAndChangeSettings = () => {
  var filepath = path + "settings";
  fs.readFile(filepath, 'utf-8', (err, data) => {
    let existingcontent = data.toString().split('\n')
    let leftovers = existingcontent
    let newcontent = (["HELP:FALSE;",existingcontent[1],existingcontent[2]]).join('\n');
    try {
      fs.writeFileSync(filepath, newcontent, 'utf-8')
      app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
      app.exit(0)
    }
    catch(e) { console.log('Failed to save the file !') }
  })
}

const openAndExtentTimesheet = (name) => {
  var filepath = path + "sessions/" + name + ".csv";
  fs.readFile(filepath, 'utf-8', (err, data) => {
    let existingcontent = data.toString()
    let lines = existingcontent.split('\n')
    let nowdate = new Date()

    if (lines.length == 1) {
      let lastdate = new Date(existingcontent.replace(';', ''))
      var seconds = (nowdate.getTime() - lastdate.getTime()) / 1000
      let newcontent = existingcontent + nowdate + ';' + Math.round(seconds)
      try { fs.writeFileSync(filepath, newcontent, 'utf-8') }
      catch(e) { console.log('Failed to save the file !') }
    } else if (lines.length > 1) {
      let lastline = lines.slice(-1)
      lines.pop()
      let lastdate = new Date(lastline[0].replace(';', ''))
      var seconds = (nowdate.getTime() - lastdate.getTime()) / 1000
      let newcontent = lines.join('\n')
      newcontent = newcontent + '\n' + lastline[0] + nowdate + ';' + Math.round(seconds)
      try { fs.writeFileSync(filepath, newcontent, 'utf-8') }
      catch(e) { console.log('Failed to save the file !') }
    }
  })
}

const clickMenuItem = (index, mode) => {
  let items = contextMenu.items
  items.map((item) => {
    if (item.commandId != index) {
      if (mode == true) {
        item.enabled = false
      } else {
        item.enabled = true
      }
    }
  })
}

const appendMenuItem = (name) => {
  let item = new MenuItem({label: name, click(menuItem) {
    var mode = null
    if (currentRunning == null && !isRunning[name]) {
      mode = true
      startTimer(name)
      tray.setToolTip(name + ' has started running recently')
      tray.setImage(__dirname + '/BeeOn.png')
    } else if (currentRunning == name && isRunning[name]) {
      mode = false
      stopTimer(name)
      tray.setToolTip(name + ' has stopped running recently')
      tray.setImage(__dirname + '/BeeOff.png')
    }
    clickMenuItem(menuItem.commandId, mode)
  }})
  contextMenu.append(item)
}

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    if (currentRunning != null && isRunning[currentRunning]) {
      pauseTimer(currentRunning)
    }
  })

  electron.powerMonitor.on('resume', () => {
    if (currentRunning != null && isRunning[currentRunning]) {
      resumeTimer(currentRunning)
    }
  })


  shell.spawn(__dirname + '/setup.sh')

  path  = process.env.HOME + '/.beekeeper/'
  tray = new Tray(__dirname + '/BeeOff.png')

  contextMenu = Menu.buildFromTemplate([])

  // watch for file changes (projects)
  let file = path + 'projects';
  let watch = chokidar.watch(file);
  watch.on('change', () => {
    app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
    app.exit(0)
  })

  if (!setupDone) {
    var data = fs.readFileSync(path + 'projects')
    var lines = data.toString().split('\n')
    for (var i = 0; i < lines.length; i++){
      appendMenuItem(lines[i])
      isRunning[lines[i]] = false
      if (i == lines.length - 1) {
        setupDone == true
      }
    }
  }

  let seperator1 = new MenuItem({label: null,  type: 'separator'})
  contextMenu.append(seperator1)

  let edititem = new MenuItem({label: 'Edit Projects', click() {
    var ls = shell.spawn(__dirname + '/edit.sh')
  }})
  contextMenu.append(edititem)

  let sheetitem = new MenuItem({label: 'Access Timesheets', click() {
    var ls = shell.spawn(__dirname + '/open.sh')
  }})
  contextMenu.append(sheetitem)

  var data = fs.readFileSync(path + 'settings')
  var lines = data.toString().split('\n')
  for (var i = 0; i < lines.length; i++){
    if (i == 0) {
      var help = lines[i].split(':')[1].replace(';','')
      if (help === 'TRUE') {
        let seperator2 = new MenuItem({label: null,  type: 'separator'})
        contextMenu.append(seperator2)
        contextMenu.append(new MenuItem(
          {
            label: 'About',
            role: 'help',
            submenu: [
              {
                label: '🎓 Learn More',
                click () { require('electron').shell.openExternal('https://github.com/herrhelms/beekeeper#readme') }
              },
              {
                label: '☕️ Buy me a coffee',
                click () { require('electron').shell.openExternal('https://bit.ly/2iau7DW') }
              },
              {
                label: '🚫 Never show again',
                click() {
                  readAndChangeSettings()
                }
              }
            ]
          }
        ))
      }
    }
  }

  let seperator3 = new MenuItem({label: null,  type: 'separator'})
  contextMenu.append(seperator3)

  let closeitem = new MenuItem({label: 'Quit', accelerator:'CommandOrControl+Q', click() {
    app.quit()
  }})

  contextMenu.append(closeitem)
  tray.setToolTip('Nothing is running at the moment!')
  tray.setContextMenu(contextMenu)
})
