import React from 'react'
import authService from '../../services/authService';

const Profile = () => {    
    return (  
        <React.Fragment>
            <h3>{authService.getCurrentUser().name}</h3>
            <div>This is the profile view</div>
        </React.Fragment>
    );
}
 
export default Profile;