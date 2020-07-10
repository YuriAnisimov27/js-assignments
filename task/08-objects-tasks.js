'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    Rectangle.prototype.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    result: "",

    element: function(value) {
        let selElement = Object.create(cssSelectorBuilder);
        this.validation(1);
        selElement.selValue = 1;
        selElement.result = this.result + value;
        return selElement;
    },

    id: function(value) {
        let selId = Object.create(cssSelectorBuilder);
        this.validation(2);
        selId.selValue = 2;
        selId.result = `${this.result}#${value}`;
        return selId;
    },

    class: function(value) {
        let selClass = Object.create(cssSelectorBuilder);
        this.validation(3);
        selClass.selValue = 3;
        selClass.result = `${this.result}.${value}`;
        return selClass;
    },

    attr: function(value) {
        let selAttr = Object.create(cssSelectorBuilder);
        this.validation(4);
        selAttr.selValue = 4;
        selAttr.result = `${this.result}[${value}]`;
        return selAttr;
    },

    pseudoClass: function(value) {
        let selPseudoClass = Object.create(cssSelectorBuilder);
        this.validation(5);
        selPseudoClass.selValue = 5;
        selPseudoClass.result = `${this.result}:${value}`;
        return selPseudoClass;
    },

    pseudoElement: function(value) {
        let selPseudoElement = Object.create(cssSelectorBuilder);
        this.validation(6);
        selPseudoElement.selValue = 6;
        selPseudoElement.result = `${this.result}::${value}`;
        return selPseudoElement;
    },

    combine: function(selector1, combinator, selector2) {
        let combineSelector = Object.create(cssSelectorBuilder);
        combineSelector.result = `${selector1.result} ${combinator} ${selector2.result}`;
        return combineSelector;
    },

    stringify: function () {
        return this.result;
    },

    validation: function (selValue) {
        if (this.selValue == selValue && (selValue == 1 || selValue == 2 || selValue == 6)) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector");
        }
        if (this.selValue > selValue) {
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        }
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
