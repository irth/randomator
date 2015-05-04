if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var Randomator = (function () {
    function Randomator() {
        this.output = "0";
        this.error = 10;
        this.n1 = null;
        this.n2 = null;
        this.reset = false;
        this.currentNumber = 0;
        this.floating = false;
        this.lastOp = null;
        this.randomizeNext = false;
        $(".button").materialripple();
    }
    Randomator.prototype.buttonPressed = function (button) {
        if (this.output == "0" || this.reset) {
            this.output = "";
            this.reset = false;
            this.floating = false;
        }
        this.output += button.toString();
        $('#output-wrapper').animate({ scrollLeft: $("#output").width() }, 200);
    };
    Randomator.prototype.dot = function () {
        if (this.floating)
            return;
        this.output += ".";
        this.floating = true;
        $('#output-wrapper').animate({ scrollLeft: $("#output").width() }, 200);
    };
    Randomator.prototype.resetData = function () {
        this.n1 = null;
        this.n2 = null;
        this.reset = false;
        this.currentNumber = 0;
        this.lastOp = null;
        this.floating = false;
    };
    Randomator.prototype.op = function (operation) {
        if (this.currentNumber == 0) {
            if (operation == "count")
                return;
            this.n1 = parseFloat(this.output);
            this.reset = true;
            this.lastOp = operation;
            this.currentNumber = 1;
        }
        else if (this.currentNumber == 1) {
            this.n2 = parseFloat(this.output);
            var result;
            switch (operation) {
                case "add":
                    result = this.n1 + this.n2;
                    break;
                case "substract":
                    result = this.n1 - this.n2;
                    break;
                case "multiply":
                    result = this.n1 * this.n2;
                    break;
                case "divide":
                    result = this.n1 / this.n2;
                    break;
                case "count":
                    this.randomizeNext = true;
                    this.op(this.lastOp);
                    this.resetData();
                    this.reset = true;
                    return;
                    break;
            }
            if (this.randomizeNext) {
                this.randomizeNext = false;
                var min, max;
                max = this.error / 100 * result;
                min = -max;
                var f;
                f = Math.round((Math.random() * (max - min) + min + 0.1) * 10) / 10;
                result += f;
            }
            this.output = parseFloat(result.toFixed(2)).toString();
            this.currentNumber = 0;
            $('#output-wrapper').animate({ scrollLeft: $("#output").width() }, 200);
        }
    };
    Randomator.prototype.clear = function () {
        this.resetData();
        this.output = "0";
    };
    Randomator = __decorate([
        angular2_1.Component({
            selector: 'randomator'
        }),
        angular2_1.View({
            templateUrl: 'calc.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Randomator);
    return Randomator;
})();
angular2_1.bootstrap(Randomator);
