if [ -d "$HOME/.beekeeper" ];
then
  # do nothing since everything seems in place
  echo "beekeeper - directory does exist"
  if [ -f "$HOME/.beekeeper/projects" ];
  then
    # do nothing since projects file seems in place
    echo "beekeeper - file does exist"
  else
    # create projects file
    touch "$HOME/.beekeeper/projects"
  fi

  if [ -d "$HOME/.beekeeper/sessions" ];
  then
    # do nothing since sessions folder seems in place
    echo "beekeeper - sessions directory does exist"
  else
    # create sessions directory
    mkdir "$HOME/.beekeeper/sessions"
  fi

  if [ -d "$HOME/.beekeeper/settings" ];
  then
    # do nothing since sessions folder seems in place
    echo "beekeeper - config file does exist"
  else
    # create sessions directory

  fi
else
  # create directories and files
  mkdir "$HOME/.beekeeper" && printf "%s" "My First Project" >> "$HOME/.beekeeper/projects" && printf "%s" "HELP:TRUE;
INTERVAL:1;
FULLMODE:TRUE;" >> "$HOME/.beekeeper/settings" && mkdir "$HOME/.beekeeper/sessions"
fi
