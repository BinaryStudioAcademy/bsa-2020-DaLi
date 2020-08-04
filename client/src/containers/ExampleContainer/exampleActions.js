const EXAMPLE_ACTION_REQUEST = 'EXAMPLE_ACTION_REQUEST'

const exampleActionRequest = payload => {
    return {
        type: EXAMPLE_ACTION_REQUEST,
        payload
    }
}

export {
    EXAMPLE_ACTION_REQUEST,
    exampleActionRequest
}