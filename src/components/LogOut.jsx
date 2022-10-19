import React, { useState } from 'react';

function LogOut(props) {
    const [islogout, setislogout] = useState(
       false
    );
    function logout() {
        sessionStorage.clear();
        setislogout(true)
    }
    return (
        <div class='topright'>
            <a href="https://drop.chinmayisunku.ml/"><button class='other_buttons' onClick={logout}>
                LogOut
            </button></a>
        </div>

    );
}
export default LogOut
