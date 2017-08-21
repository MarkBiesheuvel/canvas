export default class Random {
  static float ({min = 0, max = 1}) {
    return (min + Math.random() * (max - min))
  }
  static int (options = {}) {
    return Math.floor(this.float(options))
  }
  static item (array) {
    return array[this.int({max: array.length})]
  }
  static key (object) {
    return object[this.item(Object.keys(object))]
  }
}
