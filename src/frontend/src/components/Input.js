import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
    return (
        <div>
            <input type="text" class='default-input' placeholder={props.placeholder}>

            </input>
        </div>
    )
}

Input.defaultProps = {
    placeholder: ""
}

Input.propTypes = {
    placeholder: PropTypes.string
}

export default Input;
