const {app, Menu, MenuItem, Tray} = require('electron')
const fs = require('fs')
const shell = require('child_process')

let path = null
let apppath = null
let isRunning = []
let interval = null
let setupDone = false
let currentRunning = null
let tray = null
let contextMenu = null

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

const openAndExtentTimesheet = (name) => {
  var filepath = path + "sessions/" + name + ".csv";// you need to save the filepath when you open the file to update without use the filechooser dialog againg
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
  path  = process.env.HOME + '/.beekeeper/'
  tray = new Tray(__dirname + '/BeeOff.png')

  contextMenu = Menu.buildFromTemplate([])

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

  let seperator2 = new MenuItem({label: null,  type: 'separator'})
  contextMenu.append(seperator2)

  let closeitem = new MenuItem({label: 'Quit', accelerator:'CommandOrControl+Q', click() {
    app.quit()
  }})

  contextMenu.append(closeitem)
  tray.setToolTip('Nothing is running at the moment!')
  tray.setContextMenu(contextMenu)
})
