// Universal module definition
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.JsTable = factory();
    }
})(this, function() {
    'use strict';

    // https://github.com/godicheol/js-type
    var getType=function(e){return Object.prototype.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},isBoolean=function(e){switch(getType(e)){case"boolean":return!0;case"number":return 0===e||1===e;case"string":return"0"===e||"1"===e||"false"===e||"true"===e;default:return!1}},toBoolean=function(e){switch(getType(e)){case"boolean":return e;case"number":return 1===e;case"string":return"1"===e||"true"===e;default:throw Error("Invalid argument type")}},isNumber=function(e){switch(getType(e)){case"boolean":return!0;case"number":return!Number.isNaN(e)&&Number.isFinite(e);case"string":return!Number.isNaN(parseFloat(e))&&Number.isFinite(parseFloat(e));case"date":return!Number.isNaN(e.valueOf());default:return!1}},toNumber=function(e){switch(getType(e)){case"boolean":return e?1:0;case"number":return e;case"string":return parseFloat(e);case"date":return e.valueOf();default:throw Error("Invalid argument type")}},isString=function(e){switch(getType(e)){case"boolean":case"string":case"regexp":return!0;case"number":return!Number.isNaN(e)&&Number.isFinite(e);case"date":return!Number.isNaN(e.valueOf());default:return!1}},toString=function(e){switch(getType(e)){case"boolean":return e?"true":"false";case"number":return e.toString(10);case"string":return e;case"regexp":return e.toString();case"date":return e.toISOString();default:throw Error("Invalid argument type")}},isObject=function(e){switch(getType(e)){case"string":return function(e){try{return"object"===getType(JSON.parse(e))}catch(t){return!1}}(e);case"object":return!0;default:return!1}},toObject=function(e){switch(getType(e)){case"string":return JSON.parse(e);case"object":return e;default:throw Error("Invalid argument type")}},isArray=function(e){switch(getType(e)){case"string":return function(e){try{return"array"===getType(JSON.parse(e))}catch(t){return!1}}(e);case"array":return!0;default:return!1}},toArray=function(e){switch(getType(e)){case"string":return JSON.parse(e);case"array":return e;default:throw Error("Invalid argument type")}},isFunction=function(e){return"function"===getType(e)},toFunction=function(e){if("function"===getType(e))return e;throw Error("Invalid argument type")},isNull=function(e){switch(getType(e)){case"string":return"null"===e;case"null":return!0;default:return!1}},toNull=function(e){switch(getType(e)){case"string":return null;case"null":return e;default:throw Error("Invalid argument type")}},isUndefined=function(e){switch(getType(e)){case"string":return"undefined"===e;case"undefined":return!0;default:return!1}},toUndefined=function(e){switch(getType(e)){case"string":return;case"undefined":return e;default:throw Error("Invalid argument type")}},isDate=function(e){switch(getType(e)){case"number":case"string":return!Number.isNaN(new Date(e).valueOf());case"date":return!Number.isNaN(e.valueOf());default:return!1}},toDate=function(e){switch(getType(e)){case"number":case"string":return new Date(e);case"date":return e;default:throw Error("Invalid argument type")}},isRegExp=function(e){switch(getType(e)){case"string":return function(e){if(!/^\/.*\/[dgimsuy]{0,7}$/.test(e))return!1;e=e.split("/").pop();var t,r={};for(t of e.split("")){if(r[t])return!1;r[t]=!0}return!0}(e);case"regexp":return!0;default:return!1}},toRegExp=function(e){switch(getType(e)){case"string":var t,r;return r=(t=e).split("/").pop(),RegExp(t.replace(/^\/|\/[dgimsuy]{0,7}$/g,""),r);case"regexp":return e;default:throw Error("Invalid argument type")}};

    // https://github.com/godicheol/js-id
    var generateObjectId=function(e,t){var r,n,$;return(0|($=Math.floor((n=(r=new Date).getTime()+6e4*r.getTimezoneOffset()+(t||0))/1e3))).toString(16)+function(e){for(var t="",r=0;r<e;r++)t+="x";return t.replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()}(e||0)},parseObjectId=function(e){return{timestamp:new Date(1e3*parseInt(e.substring(0,8),16)),hex:e.substring(8)}};

    // https://github.com/godicheol/js-qry
    var isBooleanStrict=function(r){return"boolean"===getType(r)},isNumberStrict=function(r){return"number"===getType(r)},isStringStrict=function(r){return"string"===getType(r)},isRegExpStrict=function(r){return"regexp"===getType(r)},isObjectStrict=function(r){return"object"===getType(r)},isArrayStrict=function(r){return"array"===getType(r)},isNullStrict=function(r){return"null"===getType(r)},isUndefinedStrict=function(r){return"undefined"===getType(r)},isItemOfArray=function(r){return isBooleanStrict(r)||isNumberStrict(r)||isStringStrict(r)||isNullStrict(r)||isUndefinedStrict(r)},VALIDATORS={$and:function(r,t,e){var n;if(!isArrayStrict(t))return!1;for(n=0;n<t.length;n++)if(!isObjectStrict(t[n]))return!1;return!0},$or:function(r,t,e){var n;if(!isArrayStrict(t))return!1;for(n=0;n<t.length;n++)if(!isObjectStrict(t[n]))return!1;return!0},$nor:function(r,t,e){var n;if(!isArrayStrict(t))return!1;for(n=0;n<t.length;n++)if(!isObjectStrict(t[n]))return!1;return!0},$not:function(r,t,e){return isObjectStrict(t)},$in:function(r,t,e){var n;if(!isArrayStrict(t))return!1;for(n=0;n<t.length;n++)if(!isItemOfArray(t[n]))return!1;return!0},$nin:function(r,t,e){var n;if(!isArrayStrict(t))return!1;for(n=0;n<t.length;n++)if(!isItemOfArray(t[n]))return!1;return!0},$gt:function(r,t,e){if(e){if(!isNumberStrict(t))return!1}else if(!isNumber(t))return!1;return!0},$gte:function(r,t,e){if(e){if(!isNumberStrict(t))return!1}else if(!isNumber(t))return!1;return!0},$lt:function(r,t,e){if(e){if(!isNumberStrict(t))return!1}else if(!isNumber(t))return!1;return!0},$lte:function(r,t,e){if(e){if(!isNumberStrict(t))return!1}else if(!isNumber(t))return!1;return!0},$mod:function(r,t,e){if(!isArrayStrict(t)||2!==t.length)return!1;if(e){if(!isNumberStrict(t[0])||!isNumberStrict(t[1]))return!1}else if(!isNumber(t[0])||!isNumber(t[1]))return!1;return!0},$eq:function(r,t,e){return!0},$ne:function(r,t,e){return!0},$exists:function(r,t,e){if(e){if(!isBooleanStrict(t))return!1}else if(!isBoolean(t))return!1;return!0},$regexp:function(r,t,e){if(e){if(!isRegExpStrict(t))return!1}else if(!isRegExp(t))return!1;return!0},$size:function(r,t,e){if(e){if(!isNumberStrict(t))return!1}else if(!isNumber(t))return!1;return!0}},OPERATORS={$and:function(r,t,e){var n;for(n=0;n<t.length;n++)if(!execQuery(r,t[n],e))return!1;return!0},$or:function(r,t,e){var n;for(n=0;n<t.length;n++)if(execQuery(r,t[n],e))return!0;return!1},$nor:function(r,t,e){var n;for(n=0;n<t.length;n++)if(execQuery(r,t[n],e))return!1;return!0},$not:function(r,t,e){return!execQuery(r,t,e)},$in:function(r,t,e){var n;for(n=0;n<t.length;n++)if(calcQuery(r,t[n],"$eq",e))return!0;return!1},$nin:function(r,t,e){var n;for(n=0;n<t.length;n++)if(calcQuery(r,t[n],"$eq",e))return!1;return!0},$gt:function(r,t,e){if(e){if(!isNumberStrict(r))return!1}else if(!isNumber(r))return!1;return toNumber(r)>toNumber(t)},$gte:function(r,t,e){if(e){if(!isNumberStrict(r))return!1}else if(!isNumber(r))return!1;return toNumber(r)>=toNumber(t)},$lt:function(r,t,e){if(e){if(!isNumberStrict(r))return!1}else if(!isNumber(r))return!1;return toNumber(r)<toNumber(t)},$lte:function(r,t,e){if(e){if(!isNumberStrict(r))return!1}else if(!isNumber(r))return!1;return toNumber(r)<=toNumber(t)},$mod:function(r,t,e){if(e){if(!isNumberStrict(r))return!1}else if(!isNumber(r))return!1;return toNumber(r)%toNumber(t[0])===toNumber(t[1])},$eq:function(r,t,e){var n;if(!e&&(isNumber(r)&&isNumber(t)?(r=toNumber(r),t=toNumber(t)):isBoolean(r)&&isBoolean(t)&&(r=toBoolean(r),t=toBoolean(t))),getType(r)!==getType(t))return!1;if(!isArrayStrict(t))return r===t;if(r.length!==t.length)return!1;for(n=0;n<t.length;n++)if(!calcQuery(r[n],t[n],"$eq",e))return!1;return!0},$ne:function(r,t,e){var n;if(!e&&(isNumber(r)&&isNumber(t)?(r=toNumber(r),t=toNumber(t)):isBoolean(r)&&isBoolean(t)&&(r=toBoolean(r),t=toBoolean(t))),getType(r)!==getType(t))return!0;if(!isArrayStrict(t))return r!==t;if(r.length!==t.length)return!0;for(n=0;n<t.length;n++)if(!calcQuery(r[n],t[n],"$eq",e))return!0;return!1},$exists:function(r,t,e){return null!=r&&toBoolean(t)},$regexp:function(r,t,e){return toRegExp(t).test(r)},$size:function(r,t,e){return!!isArrayStrict(r)&&r.length===toNumber(t)}},chkQuery=function(r,t,e,n){switch(e){case"$and":return VALIDATORS.$and(r,t,n);case"$or":return VALIDATORS.$or(r,t,n);case"$nor":return VALIDATORS.$nor(r,t,n);case"$not":return VALIDATORS.$not(r,t,n);case"$eq":return VALIDATORS.$eq(r,t,n);case"$ne":return VALIDATORS.$ne(r,t,n);case"$in":return VALIDATORS.$in(r,t,n);case"$nin":return VALIDATORS.$nin(r,t,n);case"$gt":return VALIDATORS.$gt(r,t,n);case"$gte":return VALIDATORS.$gte(r,t,n);case"$lt":return VALIDATORS.$lt(r,t,n);case"$lte":return VALIDATORS.$lte(r,t,n);case"$mod":return VALIDATORS.$mod(r,t,n);case"$exists":return VALIDATORS.$exists(r,t,n);case"$regexp":return VALIDATORS.$regexp(r,t,n);case"$size":return VALIDATORS.$size(r,t,n);default:return!0}},calcQuery=function(r,t,e,n){switch(e){case"$and":return OPERATORS.$and(r,t,n);case"$or":return OPERATORS.$or(r,t,n);case"$nor":return OPERATORS.$nor(r,t,n);case"$not":return OPERATORS.$not(r,t,n);case"$eq":return OPERATORS.$eq(r,t,n);case"$ne":return OPERATORS.$ne(r,t,n);case"$in":return OPERATORS.$in(r,t,n);case"$nin":return OPERATORS.$nin(r,t,n);case"$gt":return OPERATORS.$gt(r,t,n);case"$gte":return OPERATORS.$gte(r,t,n);case"$lt":return OPERATORS.$lt(r,t,n);case"$lte":return OPERATORS.$lte(r,t,n);case"$mod":return OPERATORS.$mod(r,t,n);case"$exists":return OPERATORS.$exists(r,t,n);case"$regexp":return OPERATORS.$regexp(r,t,n);case"$size":return OPERATORS.$size(r,t,n);default:if(!isObjectStrict(r))return!1;if(isObjectStrict(t))return execQuery(r[e],t,n);return calcQuery(r[e],t,"$eq",n)}},execQuery=function(r,t,e){if(!isObject(t))return!1;var n,i,u,c=Object.entries(toObject(t));for(n=0;n<c.length;n++){if(i=c[n][0],!chkQuery(r,u=c[n][1],i,e))throw Error("Invalid argument type");if(!calcQuery(r,u,i,e))return!1}return!0};


    // type checkers

    function isValidRecord(record) {
        if (getType(record) !== "object") {
            return false;
        }
        // var types = ["undefined", "null", "boolean", "number", "string"];
        // var values = Object.values(record);
        // for (var value of values) {
        //     if (types.indexOf(getType(value)) < 0) {
        //         return false;
        //     }
        // }
        return true;
    }
    function isValidContainer(element) {
        return getType(element) === "htmldivelement" || (getType(element) === "string" && document.getElementById(element));
    }
    function isValidColumns(columns) {
        if (getType(columns) !== "array") {
            return false;
        }
        for (var col of columns) {
            if (getType(col) !== "object") {
                return false;
            }
            // required
            if (getType(col.name) !== "string") {
                return false;
            }
            // required
            if (getType(col.formatter) !== "function") {
                return false;
            }
        }
        return true;
    }

    // constructor

    function JsTable(element) {
        if (!isValidContainer(element)) {
            throw new Error("Invalid argument type");
        }
        if (getType(element) === "htmldivelement") {
            this.container = element;
        } else {
            this.container = document.getElementById(element);
        }
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.tfoot = document.createElement("tfoot");

        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.table.appendChild(this.tfoot);
        this.container.appendChild(this.table);

        this.columns = []; // column settings
        this.data = []; // JSON data
        this.length = 0; // data.length
    }
    // <div> only
    JsTable.prototype.init = function(columns) {
        if (!isValidColumns(columns)) {
            throw new Error("Invalid argument type");
        }
        if (!this.thead) {
            throw new Error("Table head not found");
        }

        // render table head
        var row = document.createElement("tr");
        for (var col of columns) {
            var cell = document.createElement("th");
            cell.innerHTML = col.name;
            cell.className = col.class || "";
            row.appendChild(cell);
        }

        this.columns = columns;
        this.thead.innerHTML = "";
        this.thead.appendChild(row);
    }
    JsTable.prototype.countRecords = function() {
        this.length = this.data.length;
        return this.length;
    }
    JsTable.prototype.render = function(record) {
        if (!this.tbody) {
            throw new Error("Table body not found");
        }

        var row;
        if (record._element) {
            row = record._element;
        } else {
            row = document.createElement("tr");
            record._element = row;
            this.tbody.appendChild(row);
        }

        // reset
        row.innerHTML = "";

        for (var col of this.columns) {
            var cell = document.createElement("td");
            cell.className = col.class || "";
            var formatter = col.formatter;
            // formatter = formatter.bind(record);
            var elem = formatter(record);
            if (/^html.*element$/i.test(getType(elem))) {
                cell.appendChild(elem);
            } else {
                cell.innerHTML = elem;
            }
            row.appendChild(cell);
        }
    }
    JsTable.prototype.create = function(data) {
        if (!isValidRecord(data)) {
            throw new Error("Invalid argument type", data);
        }
        if (getType(data._id) !== "undefined") {
            throw new Error("data._id must be undefined");
        }
        if (getType(data._element) !== "undefined") {
            throw new Error("data._element must be undefined");
        }
        // push
        var record = Object.assign({ _id: generateObjectId(16) }, data);
        this.data.push(record);
        this.render(record);
        this.countRecords();
        return record;
    }
    JsTable.prototype.read = function(query) {
        return this.data.filter(function(record) {
            return execQuery(record, query, true);
        }).map(function(record) {
            return Object.assign({}, record);
        });
    }
    JsTable.prototype.update = function(query, updates) {
        if (getType(updates._id) !== "undefined") {
            throw new Error("updates._id must be undefined");
        }
        if (getType(updates._element) !== "undefined") {
            throw new Error("updates._element must be undefined");
        }
        var data = this.data.filter(function(record) {
            return execQuery(record, query, true);
        });

        var entries = Object.entries(updates);
        for (var record of data) {
            for (var [key, value] of entries) {
                record[key] = value;
            }
            this.render(record);
        }
    }
    JsTable.prototype.delete = function(query) {
        for (var i = this.data.length - 1; i >= 0; i--) {
            var record = this.data[i];
            if (execQuery(record, query, true)) {
                if (record._element) {
                    record._element.parentNode.removeChild(record._element);
                }
                this.data.splice(i, 1);
            }
        }
        this.countRecords();
    }
    JsTable.prototype.export = function(query) {
        return this.data.filter(function(record) {
            return execQuery(record, query, true);
        }).map(function(record) {
            var obj = Object.assign({}, record);
            delete obj._id;
            delete obj._element;
            return obj;
        });
    }

    return JsTable;
});