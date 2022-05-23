(function() {
    'use strict';

    const createFormData = function() {
        return new FormData();
    }

    const append = function(formData, name, value) {
        formData.append(name, value);

        return formData;
    }

    const send = async function(formData, url, method) {
        var response = await fetch(new URL(url, window.location), {
            method: method,
            body: formData
        });

        if (response.ok) {
            return "OK";
        } else {
            return await response.text()
        }
    }

    window.GWebFormData = {
        createFormData,
        append,
        send
    };

}());