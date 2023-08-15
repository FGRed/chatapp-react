import React, {useRef} from "react";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router";
import {submitForm} from "../../../service/cuser/CUserService";
import {useDispatch} from "react-redux";
import {showSuccess} from "../../notifications/GeneralNotifications";

const RegisterView = () => {

    const navigate = useNavigate()
    const formRef: any = useRef()
    const dispatch = useDispatch()

    const onCancel = () => {
        navigate("/settings")
        dispatch({type: "SHOW_LOGIN_MODAL"})
    }

    const submit = (evt: any) => {

        const submitFormAsync = async () => {
            const cuser = await submitForm(evt.target)
            if (cuser) {
                showSuccess("User " + cuser.username + " registered successfully.")
                onCancel()
            }
        }
        if (evt.target.checkValidity()) {
            evt.target.classList.remove("was-validated")
            submitFormAsync()
            validate(evt.target)
        }

        evt.preventDefault()
        evt.stopPropagation()

        evt.target.classList.add("was-validated")
    }

    const validate = (form: HTMLFormElement) => {
        const formData = new FormData(form)
    }

    return (
        <Row className="mt-3 p-3">
            <Col>
                <div className="row g-2 mb-2">
                    <div className="col-auto">
                        <h3><i className="bi bi-box-arrow-in-right"/></h3>
                    </div>
                    <div className="col-auto">
                        <h3>Sign in</h3>
                    </div>
                </div>
                <form autoComplete="off" onSubmit={(evt) => {
                    submit(evt)
                }} className="needs-validation">
                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input name="username" autoComplete="off" type="text" className="form-control"
                               id="inputUsername"
                               aria-describedby="usernameHelp validationServerUsernameFeedback" required/>
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            Username can't be empty
                        </div>
                        <div id="usernameHelp" className="form-text">
                            Enter username. Username must be between 3-20 characters.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                        <input name="email" type="email" autoComplete="off" className="form-control" id="inputEmail"
                               aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmailConfirm" className="form-label">Email confirmation</label>
                        <input name="email-confirm" autoComplete="off" type="email" className="form-control" id="inputEmailConfirm"
                               aria-describedby="emailConfirmHelp" required/>
                        <div id="emailConfirmHelp" className="form-text">Re-enter email.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input name="password" autoComplete="off" type="password" className="form-control"
                               id="inputPassword"
                               aria-describedby="passwordHelp" required/>
                        <div id="passwordHelp" className="form-text">Password must contain at least 8 characters, one
                            uppercase letter and one special character.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPasswordConfirm" className="form-label">Confirm password</label>
                        <input name="password-confirm" autoComplete="off" type="password" className="form-control"
                               id="inputPasswordConfirm"
                               aria-describedby="passwordConfirmHelp" required/>
                        <div id="passwordConfirmHelp" className="form-text">Re-enter your password to confirm it.</div>
                    </div>
                    <div className="row g-2">
                        <div className="col-auto ms-auto">
                            <button type="submit" className="btn btn-primary">Create account</button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Col>
        </Row>
    )
}

export default RegisterView