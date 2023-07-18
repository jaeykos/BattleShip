"use strict";
class ParentClass {
    constructor() {
        this.prop = true;
    }
}
class ChildClass extends ParentClass {
    logPropr() {
        console.log(this.prop);
    }
}
