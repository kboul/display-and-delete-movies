import React from 'react';
import { getCurrentUser } from '../services/authService';

const Profile = () => {
    return (
        <React.Fragment>
            <h3>{getCurrentUser().name}</h3>
            <div>This is the profile view</div>
        </React.Fragment>
    );
};

export default Profile;
