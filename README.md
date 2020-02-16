# Task-manager

Simple web server for tasks management

## Installation

1. Clone it!
2. Run command `npm install`
3. Create '/config/dev.env' file in root directory
4. Setup env variables (PORT, SENDGRID_API_KEY, TOKEN_SIGNATURE, DB_CONNECTION_STRING)
5. Run command `npm run dev`

## Usage

TODO: Write usage instructions

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Deploy to Heroku

1. Login to heroku `heroku login`
2. Create heroku app `heroku create 'app-name'`
3. Set heroku env variables (SENDGRID_API_KEY, TOKEN_SIGNATURE, DB_CONNECTION_STRING) with `heroku config:set 'KEY=VALUE'` (values with spetial characters like DB_CONNECTION_STRING have to be wrapped into quotes)
4. Run command `git push heroku master`

## History

TODO: Write history

## License

TODO: Write license
