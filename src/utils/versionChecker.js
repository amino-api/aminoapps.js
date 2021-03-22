const pkg = require('../../package.json');
const npmReg = 'http://registry.npmjs.org/' + pkg.name;
const fetch = require('node-fetch');
const error = require('./error');

const searchForVersion = async () => {
    try {
        return new Promise(resolve => {
            fetch(npmReg, {}).then(res => res.json()).then(data => {
                // if(data["api:statuscode"] !== 0){
                //     resolve(new Error(chalk.greenBright(`[${system.name}] `) + chalk.red(`${data["api:message"]}`)))
                // }
                const liveVersion = data["dist-tags"].latest;
                const currentVersion = pkg.version;
                if(liveVersion !== currentVersion){
                    console.log(`Update required!\nCurrent Version: ${currentVersion} New Version: ${liveVersion}\nUpdate by executing: npm i ${pkg.name}@${liveVersion}`)
                }
            }).catch((e) => {
                error(e)
            })
        })
    } catch(e) {
        error(e)
    }
}

module.exports = searchForVersion