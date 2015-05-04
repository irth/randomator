/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
declare var $;

// Annotation section
@Component({
  selector: 'randomator'
})
@View({
  templateUrl: 'calc.html'
})
// Component controller
class Randomator {
  error: number;
  output: string;
  floating: boolean;
  reset: boolean;
  lastOp: string;
  n1: number;
  n2: number;
  currentNumber: number;
  randomizeNext: boolean;

  constructor() {
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

  buttonPressed(button: number) {
    if(this.output == "0" || this.reset) {
      this.output = ""
      this.reset = false
      this.floating = false
    }
    this.output += button.toString();
    $('#output-wrapper').animate({ scrollLeft: $("#output").width()}, 200);
  }

  dot() {
    if(this.floating) return;
    this.output += ".";
    this.floating = true;
    $('#output-wrapper').animate({ scrollLeft: $("#output").width()}, 200);
  }

  resetData() {
    this.n1 = null;
    this.n2 = null;
    this.reset = false;
    this.currentNumber = 0;
    this.lastOp = null;
    this.floating = false;
  }

  op(operation) {
    if(this.currentNumber == 0) {
      if(operation == "count") return;
      this.n1 = parseFloat(this.output)
      this.reset = true
      this.lastOp = operation
      this.currentNumber = 1
    } else if(this.currentNumber == 1) {
      this.n2 = parseFloat(this.output)
      var result: number;
      switch(operation) {
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
          return
          break;
      }
      if(this.randomizeNext) {
        this.randomizeNext = false;
        var min, max: number;
        max = this.error/100 * result;
        min = -max;
        var f: number;
        f = Math.round((Math.random() * (max - min) + min + 0.1) * 10) / 10;
        result += f
      }
      this.output = parseFloat(result.toFixed(2)).toString();
      this.currentNumber = 0;
      $('#output-wrapper').animate({ scrollLeft: $("#output").width()}, 200);
    }
  }

  clear() {
    this.resetData();
    this.output = "0";
  }
}

bootstrap(Randomator);
