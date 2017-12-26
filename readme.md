# Dev Service Runner

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

## Run
```bash
# If installed at global
run-ds

# Or as installed at local
$(npm bin)/run-ds
```

## Looks like
![Sample Usage](../assets/dev-service-runner_demo.gif "Sample Usage")

## License (MIT)
Copyright 2017~2018 Jerry Lee
