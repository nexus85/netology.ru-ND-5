exports.create = (params, users) => {
    let response = {
        result: null,
        error: null
    };

    if (Object.keys(params).length >= 2) {
        let newUser = {
            "id": generateId(),
            "name": params.name,
            "score": params.score
        };
        users.push(newUser);
        response.result = `${newUser.id} User added`;
    } else {
        response.error = 'Error: not enough info';
    }

    return response;
};

exports.show = (params, users) => {
    let response = {
        result: null,
        error: null
    };
    response.result = users.filter(user => parseInt(user.id) === parseInt(params.id))[0];

    if (typeof response.result === 'undefined') {
        response.result = null;
        response.error = `Error: id not found`;
    }

    return response;
};

exports.update = (params, users) => {
    let response = {
        result: null,
        error: null
    };

    for (let user of users) {
        if (parseInt(user.id) === parseInt(params.id)){
            if (params.name !== undefined) { user.name = params.name }
            if (params.score !== undefined) { user.score = params.score }
            response.result = `Update success`;
            response.error = null;
        } else {
            response.error = `Error: id not found`;
            return response;
        }
    }

    return response;
};

exports.delete = (params, users) => {
    let response = {
        result: null,
        error: null
    };

    for (let user of users) {
        if (parseInt(user.id) === parseInt(params.id)){
            users.splice(indexOf(user), 1);
            response.result = `Delete success`;
            response.error = null;
        } else {
            response.error = `Error: id not found`;
            return response;
        }
    }

    return response;
}

function rand(min, max) {
    return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}
function generateId() {
    return rand(1000, 9999);
}