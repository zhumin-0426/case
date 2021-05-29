function initCatch(_Promise) {
    _Promise.prototype._catch = function (catchCallBack) {
        return new _Promise(function (resolve, reject) {
            
        })
    }
}