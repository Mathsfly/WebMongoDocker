#It's the first time that I touch mongodb and docker, so if there are some bugs 
#thank you for your issue report

#Web service supports :

POST /v1/key/{key}/value/{value} : Saving {key} & {value} to mongoDb
GET  /v1/key/{key}  : Return the appropriate value in response about the input {key}
 
POST is call from a form of html page.
GET is call directly by url


#Requires :
The program can be written in any program language with unitary test.
Run web server & mongoDb in 2 Docker containers independently created by docker-compose
 
The program is written in NodeJS, unitary test is to test the database module
(I am not sure unitary test here is to test the module or to test POST,GET method. I made an unitary test for only database module, because i think that we can test directly index.js from browser) 

docker-compose build
docker-compose up : create docker container and run program.


#Return : 
Program with unitary test
Dockerfile & docker-compose file
Any scripts to run program or test (if necessary)

To run program: npm start (for the local, it must be change DATABASE_CONNECTION = 'mongodb://localhost/myDatabase')
To test unitary test: npm test


#This program is require:
- Install Mongodb
- Install Docker
- when npm start in local:
use DATABASE_CONNECTION = 'mongodb://localhost/myDatabase'
run mongodb: ../bin/mongod --dbpath ../dataFolder .
#