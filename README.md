# Scandidate

## Steps for running the project

Step 1 : Navigate to Frontend-UI folder.

Step 2 : type the below command to install the dependences
npm install

Step 3 : Set the below environmental variables,

| environment | variables               |
| ----------- | ----------------------- |
| development | DEV_SERVER_URL='value'  |
| UAT         | UAT_SERVER_URL='value'  |
| Production  | PROD_SERVER_URL='value' |

## To generate Development environment build run below command -

`npm run-script dev`

## To generate UAT environment build run below command -

`npm run-script uat`

## To generate Production environment build run below command -

`npm run-script prod`

The dist (build) folder will be created on the root folder

Step 4 : Navigate to Backend folder

Step 5 : type the below command -
npm install

Step 6 : Add the following environmental varibales inside .env file

\*\* node environment -> development or uat or production
NODE_ENV='development'

\*\* node server port
NODE_PORT=2000

\*\* MongoDB URI
MONGODB_DEV_URI="mongodb://localhost:27017/scandidate"

MONGODB_UAT_URI=""

MONGODB_PROD_URI=""

Step 7 : To run the server ,type the below command -
npm start
