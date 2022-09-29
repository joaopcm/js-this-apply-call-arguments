'use strict';

const { watch, promises: { readFile } } = require('node:fs')

class File {
  watch(event, filename) {
    console.log('this', this)

    /**
     * don't use 'arguments' directly, it's a bad practice because we have no
     * control over what arguments are being passed to our function
     */
    console.log('arguments', Array.prototype.slice.call(arguments))

    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// watch(__filename, file.watch) // throws an error because 'this.showContent' is not a function

// alternative not to inherit the 'this' function (but it is an ugly approach)
// watch(__filename, (event, filename) => file.watch(event, filename))

// making the context of the function explicit
// '.bind()' returns a function with the context passed as parameter
// watch(__filename, file.watch.bind(file))

// with '.call()' or '.apply()', we can override functions of the class and pass
// specific parameters outside the instance
// file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])
