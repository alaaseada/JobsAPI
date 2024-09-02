# To generate a random JWT secret key

in the cmd:
node -e "console.log(require('crypto') randomBytes(32).toString('hex'))"
