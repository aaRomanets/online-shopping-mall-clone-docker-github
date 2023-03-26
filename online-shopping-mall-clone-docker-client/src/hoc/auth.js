import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

function authFunction (ComposedClass)
{
    function AuthenticationCheck(props) 
    {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())            
        }, [dispatch, props.history])

        let user = useSelector(state => { return (state.user)});
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

export default authFunction;