# Dev Service Runner
[![npm version](https://badge.fury.io/js/dev-service-runner.svg)](https://badge.fury.io/js/dev-service-runner)
[![Build Staus](https://travis-ci.org/jerrywdlee/dev-service-runner.svg?branch=master)](https://travis-ci.org/jerrywdlee/dev-service-runner.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/jerrywdlee/dev-service-runner/badge.svg?branch=master)](https://coveralls.io/github/jerrywdlee/dev-service-runner?branch=master)

This is a script runner for running other service once on one's development environment, such as Redis, MongoDB and Elasticsearch

# Usage
## Install
```
npm i -D dev-service-runner
```

## Configs
You may need place a `dev-service.conf.yml` under your project directory, as same level as `package.json`.

```yaml
# example of dev-service.conf.yml

# This element is setting for running redis service
- 
  nameTag: Redis # needed, as the name tag show in console
  color: yellow # optional, the color of name tag
  command: redis-server /usr/local/etc/redis.conf # needed, command to start this service 

# This element is setting for running mongod service
- 
  nameTag: MongoDB # needed, as the name tag show in console
  color: blue # optional, the color of name tag
  command: mongod --dbpath /usr/local/var/mongodb # needed, command to start this service 
```
### About Color settings
We used [Marak/colors.js](https://github.com/Marak/colors.js) as our color setting plugin, so for more settings, please check [this site](https://github.com/Marak/colors.js#colors-and-styles).


## Run
```bash
# If installed at global
run-ds

# Or as installed at local
$(npm bin)/run-ds

# If want run at customized config file
run-ds YOUR-CONFIG.yml
```

## Looks like
![Sample Usage](https://cdn.rawgit.com/jerrywdlee/dev-service-runner/19ccd55a/assets/dev-service-runner_demo.gif "Sample Usage")

## License (MIT)
Copyright 2017~2018 Jerry Lee
