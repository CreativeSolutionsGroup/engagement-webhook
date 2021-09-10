const axios = require('axios');

async function getGoogleSheetJSON(sheetId){
    let rawData = await axios.get(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`);

    let text = rawData.data;
    let json = JSON.parse(text.substr(47).slice(0, -2))
    return json.table;
}

const getUserList = () => {
    return getGoogleSheetJSON("16z9qXFdq9nr56WH323vJ16ty2VFJqKMEWfy6JMnlCXc")
    .then((json) => {
        let rows = json.rows;
        let size = rows.length;
        let values = rows.slice(1, size);

        let permissionsList = [];
        values.forEach((row) => {
            let email = row.c[0].v;
            permissionsList.push(email)
        })
        return permissionsList;
    })
}

async function checkUserList(email){
    let list = await getUserList();
    return email !== undefined && list.includes(email);
}

exports.extractToken = function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

exports.verifyToken = async function(token) {
    if(token === undefined || token === null)return {email: null, valid: false, error: 'Null Token'};
    try{
        const ticket = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token);

        const payload = ticket.data;
        
        if(ticket.status !== 200){
            throw ticket.error_description;
        }
        
        const email = payload['email']

        const allowedToAccess = await checkUserList(email);
        return {
            email: email,
            valid: allowedToAccess
        };
    } catch(error){
        console.log(error);
        return {
            email: null,
            valid: false,
            error: error
        }
    }
}

exports.authUser = async function (token) {
    let verification = await this.verifyToken(token);
    if (verification === undefined || verification.valid === false) {
        return false;
    }

    return true;
}
