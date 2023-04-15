import React, { memo } from 'react';
import PropTypes from 'prop-types';

const UserCard = ({ fname, lname, email, gender, avatar, domain, available }) => {
    return (
        <div className='border-box rounded bg-light p-2 p-md-5 text-center'>
            <img src={avatar} alt='user_profile' />
            <h1 className='fw-bold fs-4 my-3 text-dark'>{`${fname} ${lname}`}</h1>
            <p className='text-dark custom-fontSize '>Email - <span className='text-break'>{email}</span></p>
            <p className='text-dark custom-fontSize'>{`Gender - ${gender}`}</p>
            <p className='text-dark custom-fontSize'>{`Domain - ${domain}`}</p>
            <p className='text-dark custom-fontSize'>{`Available - ${available}`}</p>
        </div>
    )
}

UserCard.propTypes = {
    fname: PropTypes.string,
    lname: PropTypes.string,
    email: PropTypes.string,
    domain: PropTypes.string,
    gender: PropTypes.string,
    avatar: PropTypes.string,
    available: PropTypes.bool
}

export default memo(UserCard);