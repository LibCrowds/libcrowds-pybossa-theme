// libcrowds.js library

(function(libcrowds, $, undefined) {
    var defaultArgs = {last_id: 1, limit:100};

    /** Use default values for arguments. */
    function _verifyArgs(args) {
        args = typeof(args) !== 'undefined' ? args : {};
        $.each(defaultArgs, function(k, v) {
            if (typeof(args[k]) == 'undefined') {
                args[k] = v;
            }
        });
        return args;
    }

    /**
     * GET all domain objects of a given type.
     * @param {string} domainObject - The domain object.
     * @param {obj} args - The parameters.
     * @returns {Deferred}
     */
    libcrowds.getAll = function(domainObject, args) {
        _verifyArgs(args);
        var def  = $.Deferred(),
            res  = [],
            url  = '/api/' + domainObject,
            arg = _verifyArgs(args);

        function next() {
            $.getJSON(url, arg).done(function(data) {
                if (data.length > 0 && typeof(data[0].id) == 'undefined') {
                    def.reject("Error: No id field found for " + domainObject);
                } else if (data.length > 0) {
                    arg.last_id = data[data.length - 1].id;
                    $.extend(res, data);
                    next();
                } else {
                    def.resolve(res);
                }
            }).fail(function(e) {
                def.reject("HTTP error: " + e.status);
            });
        }
        next();
        return def.promise();
    };

    /**
     * Perform a GET query.
     * @param {string} domainObject - The domain object.
     * @param {obj} args - Any parameters.
     * @returns {Deferred}
     */
    libcrowds.get = function(domainObj, args) {
        var def = $.Deferred(),
            url = '/api/' + domainObj,
            arg = _verifyArgs(args);
        $.getJSON(url, arg).done(function(data) {
             def.resolve(data);
        }).fail(function(e) {
            def.reject("HTTP error: " + e.status);
        });
        return def.promise();
    };

} (window.libcrowds = window.libcrowds || {}, jQuery));
