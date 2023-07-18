class ParentClass {
  prop = true
}

class ChildClass extends ParentClass {
  logPropr() {
    console.log(this.prop)
  }
}
