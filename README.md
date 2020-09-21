# Require
- Install Nodejs version from 8.x
# How to use
- After copying this folder
- Go into this folder and open command line
- type 'npm install' to install all the node_modules package it need or use 'build/index.html' to use as production
- redefine value connect to Database as your configuration in 'src/utils/axios.js' and 'src/layouts/Chat.js'
- After create your own S3 bucket, redefine value variable 's3BucketDomain' in 'src/api/upload.js'
# Script
- If you want to continue develop this project, 'npm start' as start projects in 'development' mode
- To use in production use can return 'build/index.html'
- I recommend use 'vercel' for hosting static website
- type 'vercel --login' and do what it requires to confirm you has signed in
- type 'y' or 'n' to accept or decline its proposed options configuration
- wait till 'vercel' return hosting url production.