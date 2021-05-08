module.exports = {
  apps : [{
    name: 'pm2-email',
    script: './pm2-email.js',
    exec_mode: 'fork',
    env: {
      PM2EMAILFROM: '',
      PM2EMAILTO: ''
    }
  }]
}
