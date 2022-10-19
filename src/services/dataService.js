global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

export const dataService = {
    get_user_data,
    upload_file,
    delete_file,
    get_user
}

export const apiConfig = {
    endpointURL: "https://drop.chinmayisunku.ml"
}

function get_user_data(user_name,all) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    }
    return fetch(`${apiConfig.endpointURL}/user_data?username=${user_name}&all=${all}`, requestOption).then(res => {
        return res.json();
    })
}

function upload_file(input_file, user_data, description) {
    const formData = new FormData();
    formData.append('file', input_file);
    formData.append('first_name', user_data);
    formData.append('last_name', user_data);
    formData.append('desc', description);
    formData.append('email', user_data);
	console.log("inside upload_file ",formData," ",input_file," ",user_data," ",description);
    const requestOption = {
        method: 'POST',
        body: formData
    }
    return fetch("https://drop.chinmayisunku.ml"+`/upload`, requestOption).then(res => {
        return res;
    })
}
function delete_file(file_name,id) {
	console.log("in delete_files");
	const formdata = new FormData();
	formdata.append('id', id);
	formdata.append('file',file_name);
	const req = {
		method: 'DELETE',
		body: formdata
	}
	//	return fetch(`${apiConfig.endpointURL}/delete_files?id=${id}&file=${file_name}`, { method: 'DELETE' });
	return fetch("https://drop.chinmayisunku.ml/delete_files",req).then(res => res.text()) // or res.json()
.then(res => console.log("in delete proting:",res));
}

function get_user() {
    var pool_data = {
        UserPoolId: 'us-east-2_0064KOcCQ',
        ClientId: '2ub6k6peilk5te5prhkq2cjm5k',
    };
    var user_pool = new AmazonCognitoIdentity.CognitoUserPool(pool_data);
    var cognito_user = user_pool.getCurrentUser();
	console.log(cognito_user);
    if (cognito_user != null) {
        cognito_user.getSession(function(e, session) {
            if (e) {
                alert(e.message || JSON.stringify(e));
                return;
            }
            cognito_user.getUserAttributes(function(err, attributes) {
                if (e) {
                    console.log(e);
                } else {
                    console.log(attributes);
                }
            });
        });
    }
}
