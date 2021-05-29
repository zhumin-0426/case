function initThen(_Promise) {
    _Promise.prototype._then = function (resolveCallBack, rejectCallBack) {
        return new _Promise(function (resolve, reject) {
            function newResolveCallBack(val) {
                if (typeof resolveCallBack == 'function') {
                    var result = resolveCallBack(val);
                    _Promise.prototype.value = result;
                }
            }

            function newRejectCallBack(val) {
                if (typeof rejectCallBack == 'function') {
                    var result = rejectCallBack(val);
                    _Promise.prototype.value = result;
                }
            }

            _Promise.prototype.resolveQueue.push(newResolveCallBack);
            _Promise.prototype.rejectQueue.push(newRejectCallBack);

        })
    }
}