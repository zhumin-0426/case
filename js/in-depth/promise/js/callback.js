function initCallBack(_Promise) {
    _Promise.prototype._resolve = function (resolve) {
        window.addEventListener('message', function () {
            if (_Promise.prototype.state !== "REJECTED") {
                return;
            } else {
                _Promise.prototype.state = "FULFILED";
                _Promise.prototype.value = resolve;
            }

            _Promise.prototype.resolveQueue.forEach(function (fn, idx) {
                var value = _Promise.prototype.value;
                fn(value)
            });
        })
        window.postMessage('')
    }
    _Promise.prototype._reject = function (reject) {
        window.addEventListener('message', function () {
            if (_Promise.prototype.state !== 'PENDING') {
                return;
            } else {
                _Promise.prototype.state = "REJECTED";
                _Promise.prototype.value = reject;
            }

            _Promise.prototype.rejectQueue.forEach(function (fn) {
                var value = _Promise.prototype.value;
                fn(value)
            });
        })
        window.postMessage('')
    }
}