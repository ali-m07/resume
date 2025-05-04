// deploy.js
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/ali-m07/resume.git',
  user: {
    name: 'Your Name', // Replace with your name
    email: 'your.email@example.com' // Replace with your email
  },
  dotfiles: true,
  message: 'Manual Deploy'
}, function(err) {
  if (err) {
    console.error('Deployment error:', err);
  } else {
    console.log('Deployed successfully!');
  }
});