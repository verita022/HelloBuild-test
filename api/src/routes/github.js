const {Router} = require('express');
const { getCode, getRepos } = require('../controllers/github');


const router = Router();

router.get('/git/user/oauth2/github/callback', getCode) 
router.get('/repositories', getRepos)


module.exports = router;
