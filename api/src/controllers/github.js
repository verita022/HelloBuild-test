const axios = require('axios');
const querystring = require('query-string');
var repositories = [];


async function gitToken(code){
    const githubToken = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=174a0a6c3637e0234c6f&client_secret=0fc107b93751e060d635100605caaecf08c13839&code=${code}`
    )
        .then((response) => { return (response.data) })
        .catch((err) => { throw err })
    
    const decoded = querystring.parse(githubToken)
    const accessToken = decoded.access_token;
        
        
    return axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
        .then((res) => { return res.data })
        .catch((err) => { throw err })

}

async function getCode(req, res){

    const { code } = req.query
    if (code) {
        try {
          const githubData = await gitToken(code);
          repositories.push(githubData) 
          res.redirect('http://localhost:3000/githubrepos')

        } catch (error) {
            res.json({ error }),
            console.log('El codigo no esta llegando como query ' + error)
        }
    } 
    
}

function getRepos(req, res){
    const reposAdress = repositories.map(el => el.repos_url)
    const repoAxios = axios.get(reposAdress.pop())
    .then(response => { 
        return res.send(response.data.map(el => el)) 
    })
    .catch((err) => { throw err })   
         
}

module.exports = {
    getCode,
    getRepos
    
}