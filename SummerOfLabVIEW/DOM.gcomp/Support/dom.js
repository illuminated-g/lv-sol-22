(function() {
    'use strict';

    let DOMEvent = class {
        constructor(eventType) {
            //Use defineProperty to create readonly properties
            Object.defineProperty(this, "type", {value: eventType});
            
        }
    }

    const validateEventStreamReader = function (eventStreamReader) {
        // NXG 5 does not include the ReadableStreamDefaultReader in the global scope so skip validation
        if (window.ReadableStreamDefaultReader === undefined) {
            return;
        }
        if (eventStreamReader instanceof window.ReadableStreamDefaultReader === false) {
            throw new Error('Input is not a valid event stream reader');
        }
    };

    const create = function(tag, attributesJSON, classesJSON, innerText) {
        var elt = document.createElement(tag);

        var attributes = JSON.parse(attributesJSON);
        for (var i = 0; i < attributes.length; ++i) {
            elt.setAttribute(attributes[i].Name, attributes[i].Value);
        }

        var classes = JSON.parse(classesJSON);
        for (var i = 0; i < classes.length; ++i) {
            elt.classList.add(classes[i]);
        }

        if (innerText.length > 0) {
            elt.innerText = innerText;
            console.log(innerText);
        }

        return elt;
    };

    const insertAdjacentElement = function(target, position, element) {
        target.insertAdjacentElement(position, element);

        return element;
    };

    const createEventStream = function(eventName) {
        const eventStreamReader = (function() {
            const eventStream = new ReadableStream({
                start (controller) {
                    handler = (event) => {
                        let eventInfo = (function() {
                            return {
                                type: event.type,
                                source: event.target,
                                event: event
                            };
                        })();

                        controller.enqueue(eventInfo);
                    };
                },

                cancel() {

                }
            });

            return eventStream.getReader();
        })();

        return eventStreamReader;
    }

    const addEventListener = function (element, name) {
        let changeHandler;
        const eventStream = new ReadableStream({
            start (controller) {
                changeHandler = () => {
                    controller.enqueue(element.value);
                };
                element.addEventListener(name, changeHandler);
            },
            cancel () {
                element.removeEventListener(name, changeHandler);
            }
        });
        const eventStreamReader = eventStream.getReader();
        return eventStreamReader;
    };
    
    const waitForEvent = async function (eventStreamReader) {
        validateEventStreamReader(eventStreamReader);
        const {value, done} = await eventStreamReader.read();
        const result = {
            value: done ? '' : value,
            done
        };
        const resultJSON = JSON.stringify(result);
        return resultJSON;
    };

    const removeEventListener = async function (eventStreamReader) {
        validateEventStreamReader(eventStreamReader);
        await eventStreamReader.cancel();
    };

    const setAttribute = function(element, attribute, value) {
        element.setAttribute(attribute, value);
        return element;
    };

    const addClass = function(element, className) {
        element.classList.add(className);
        return element;
    }

    const removeAttribute = function(element, attribute) {
        element.removeAttribute(attribute);
        return element;
    }

    const removeClass = function(element, className) {
        element.classList.remove(className);
        return element;
    }

    const querySelector = function(query) {
        var elt = document.querySelector(query);
        return elt;
    }

    const elementQuerySelector = function(element, query) {
        var elt = element.querySelector(query);
        return elt;
    }

    const NthChild = function(element, index) {
        return element.children[index];
    }

    const getAttribute = function(element, attribute) {
        return element.getAttribute(attribute);
    }

    window.GWebDOM = {
        create,
        insertAdjacentElement,
        addEventListener,
        waitForEvent,
        removeEventListener,
        setAttribute,
        addClass,
        removeAttribute,
        removeClass,
        querySelector,
        elementQuerySelector
    };
}());