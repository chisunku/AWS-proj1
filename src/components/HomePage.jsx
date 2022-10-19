import React, { PureComponent } from 'react';
import { saveAs } from "file-saver";
import { dataService } from '../services/dataService';
import UploadFile from './UploadFile';
import LogOut from './LogOut';
import LogInPage from './LogIn';
import '../myStyle.css';
var jwt = require('jsonwebtoken');

class HomePage extends PureComponent {


    constructor(props) {
        super(props)
        const sessionToken = sessionStorage.getItem("token")
        this.state = {
            admin: false,
            disp_user: [],
            user_data: undefined,
            description: ""
        }
        this.set_description = this.set_description.bind(this)
        this.user_table = this.user_table.bind(this)
    }
    set_description(d) {
        this.setState({
            description: d
        })
    }
    admin_table(user,user_admin) {
	    console.log("inside admin module");
        var boll = false;
        if(user_admin == true)
            boll = true;
            dataService.get_user_data(user,true)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        disp_user: json
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    user_table(user) {
	    console.log("inside user table mtd");
        dataService.get_user_data(user,false)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        disp_user: json
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
	    console.log("after usertable fetch",this.state.disp_user);
    }
    componentDidMount() {
        var t = sessionStorage.getItem("token");
	console.log("token: ",t);
        //console.log(this.state.user_data);
	//try {
         // const payload = this.verifier.verify(t);
        //} catch {
         // console.log("Invalid token");
        //}
        var decoded = jwt.decode(t);
        var decoded = jwt.decode(t, { complete: true });
	const userObj = decoded.payload;
	console.log(userObj);
        this.setState({
            user_data: userObj
        })
	    console.log("outside timeout ",this.state.user_data);
        setTimeout(()=> {
            if(this.state.user_data.email=="2712aabbccdd@gmail.com"){
                this.state.admin = true;
            }
		else{
			this.state.admin=false;
		}

            if (this.state.admin){
		    console.log("in admin", this.state.admin);
                this.admin_table(this.state.user_data.email, true);
            } else {
		    console.log("inside user", this.state.admin);
                this.user_table(this.state.user_data.email, false);
            }
        }, 500);
        dataService.get_user()
    }

    onClickDownLoad(file) {
        window.open("https://dfbiaa0nywvvp.cloudfront.net/" + file);
        saveAs("https://dfbiaa0nywvvp.cloudfront.net/"+file, file );
    }

    onClickDelete(fileName, id) {
    	console.log("in onclick delete mtd");
	    dataService.delete_file(fileName, id)
            .then(json => {
                console.log("from inside the delete fetch",json);
                setTimeout(()=> {
                if (this.state.admin){
                    this.admin_table(this.state.user_data.email, true);
                } else {
                    this.user_table(this.state.user_data.email, false);
                }
            }, 500);

            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { admin } = this.state;
        return (
            <center>
                <div>
                    <p> User: { this.state.user_data && <a href="#login">{this.state.user_data.email}</a> }
                    &nbsp;&nbsp;
                    User Type:  { admin && <a> "ADMIN" </a> }
                                { !admin && <a> "Non Admin"</a> }
                    {this.state.user_data && <LogOut class='topright'></LogOut>}
                    {!this.state.user_data && <LogInPage></LogInPage>}</p>
                    { this.state.user_data &&
                        <UploadFile
                            user={this.state.user_data.email}
                            description={this.state.description}
                            refreshList={e => this.admin_table(this.state.user_data.email,this.state.admin)}
                            refreshList2={e => this.user_table(this.state.user_data.email,this.state.admin)}
                            admin={admin} >
                        </UploadFile>
                    }
                    &nbsp; &nbsp;
                    <div>
                        <table>
                            <tr key={0}>
                                { admin && <th>User</th> }
                                <th>File Name</th>
                                <th>Description</th>
                                <th>File Upload Time</th>
                                <th>File Updated Time</th>
                                {!admin && <th>Download</th>}
                                <th>Delete</th>
                            </tr>
                            { this.state.disp_user.map(ele => {
                                return (
                                    <tr key={ele.id}>
                                        { admin && <td>{ele.userName}</td> }
                                        <td>{ele.fileName}</td>
                                        <td>{ele.description}</td>
                                        <td>{ele.fileCreatedTime}</td>
                                        <td>{ele.fileUpdatedTime}</td>
                                        { !admin &&
                                            <td><a href={"https://dfbiaa0nywvvp.cloudfront.net/" + ele.fileName} target="_blank" download={ele.fileName}>
                                                <button class="download_button" onClick={event => this.onClickDownLoad(ele.fileName)}>
                                                    DownLoad
                                                </button>
                                            </a></td>
                                        }
                                        <td><button class="delete_button" onClick={event => this.onClickDelete(ele.fileName, ele.id)}>
                                            Delete
                                        </button></td>
                                    </tr>
                                );})
                            }
                        </table>
                    </div>
                </div>
            </center>
        )
    }
}

export default HomePage
