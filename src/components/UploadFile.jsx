import React, { PureComponent } from 'react'
import { dataService } from '../services/dataService';
import '../myStyle.css'
var jwt = require('jsonwebtoken');

class UploadFile extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            files: [],
            result: ""
        }
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile() {
        const user = this.props.user
        const files = this.state.files;
        if (files.length > 0) {
            dataService.upload_file(files[0], user, this.state.description)
                .then(json => {
                    this.setState({
                        result: "File Uploaded successfully"
                    });
                    setTimeout(()=> {
                        if (this.props.isAdmin){
                            this.props.refreshList();
                        } else {
                            this.props.refreshList2(user);
                        }
                    }, 250);
                })
                .catch(e => {
                    console.log(e);
                    this.props.refreshList();
                });
        }
    }
    render() {
        return (
            <div>
                    <p> File Upload Result: {this.state.result} </p>
                        <input class='other_buttons' type="file" onChange={e => this.setState({
                            files: e.target.files
                        })}>
                        </input>
                        &nbsp; &nbsp;
                       <a>
                       <input
                            value={this.state.desc}
                            onChange={e => this.setState({
                                description: e.target.value
                            })}
                            placeholder="Description"
                            type="text"
                            name="Description"
                        />
                        &nbsp; &nbsp;
                        <button class='other_buttons' onClick={this.uploadFile}>Upload</button>
                       </a>

            </div>
        )
    }
}

export default UploadFile