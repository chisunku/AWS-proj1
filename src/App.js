import React, { Fragment } from 'react';
import Login from './components/LogIn';
import HomePage from './components/HomePage';
import uploadFile from './components/UploadFile';



function App(props) {
  if (props.location && props.location.hash) {
    const t_arr = props.location.hash.split("&");
    if (t_arr.length > 0) {
      const t = t_arr[0].replace("#id_token=", "").replace("#access_token=", "")
      sessionStorage.setItem("token", t);
    }
  }

  const sess_token = sessionStorage.getItem("token")
  const check_valid =  sess_token != undefined &&  sess_token.length>0

  return (
        <Fragment>
               {check_valid &&
               <HomePage></HomePage>
              }
              {
               !check_valid &&
                <Login></Login>
              }
        </Fragment>
   
  );
}
export default App;
