import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        promocode: '',
        showPromo: false,
    });

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);
    
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    function handleShowPromo() {
        setUser(user => ({ ...user, showPromo: !user.showPromo }));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Create an account</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">The field cannot be empty</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">The field cannot be empty</div>
                    }
                </div>
                <div className="form-group">
                    {
                        !user.showPromo ? <span onClick={handleShowPromo}>I have a promocode</span> :
                        <Fragment>
                            <label>Promocode</label>
                            <input type="text" name="promocode" value={user.promocode} onChange={handleChange} className={'form-control'} />
                        </Fragment>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Start for free
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };