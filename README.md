# VRWebViewer

## Execution
- Install node dependencies. 
```console
$ npm install
```
- Install monogodb
```console
$ brew install mongodb
```
- Initialize Database
```console
$ mkdir -p $PROJECT DIR/data/db
```
- Start Database
```console
$ mongod --dbpath $PROJECT DIR/data/db &
```
- Run Server
```console
$ DEBUG=express:* node ./bin/www
```
