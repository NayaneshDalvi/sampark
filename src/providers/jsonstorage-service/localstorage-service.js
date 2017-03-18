"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var LocalStorageService = (function () {
    // TODO: Need to handle QUOTA_EXCEEDED_ERR
    function LocalStorageService() {
    }
    LocalStorageService.prototype.read = function (key) {
        // if not in local storage, the string "undefined" is returned (why???)
        var text = localStorage.getItem(key);
        if (text === null || typeof text === "undefined" || text === "undefined") {
            return null;
        }
        else {
            return text;
        }
    };
    LocalStorageService.prototype.readObject = function (key) {
        var text = this.read(key);
        var data;
        try {
            data = JSON.parse(text);
        }
        catch (error) {
            data = null;
        }
        return data;
    };
    LocalStorageService.prototype.write = function (key, text) {
        localStorage.setItem(key, text);
    };
    LocalStorageService.prototype.writeObject = function (key, data) {
        var text = JSON.stringify(data);
        this.write(key, text);
    };
    LocalStorageService.prototype.remove = function (key) {
        localStorage.removeItem(key);
    };
    LocalStorageService.prototype.clear = function () {
        localStorage.clear();
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
