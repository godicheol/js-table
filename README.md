## Usage

```html
<div id="container">
```

- Initialize

```js
// set container
// 1.1
var table = new JsTable("container");
// 1.2
var table = new JsTable(document.querySelector("#container"));

// set header
// {
//     name: "string",
//     class: "string",
//     formatter: "function(record_data)" // return DOM Element or String
// }
table.init([
    {
        name: "name",
        class: "js-table-name",
        formatter: function(data) {
            var input = document.createElement("input");
            input.type = "string";
            input.value = data.name;
            input.addEventListener("change", function(e) {
                var newName = e.target.value;
                table.update(data, {
                    name: newName
                });
            });
            return input;
        }
    },
    {
        name: "age",
        formatter: function(data) {
            var input = document.createElement("input");
            input.type = "number";
            input.value = data.age || 0;
            input.addEventListener("change", function(e) {
                var newAge = e.target.value;

                table.update(data, {
                    age: !isNaN(parseInt(newAge)) ? parseInt(newAge) : 0
                });
            });
            return input;
        }
    },
    {
        name: "extra",
        formatter: function(data) {
            return !isNaN(parseInt(data.age)) ? parseInt(data.age) * 10 : 0;
        }
    }
]);
```

- Create record

```js
// data._id, data._element field must be undefined
var data = { name: "John", age: 10 }
table.create(data);
// {
//     name: "John",
//     age: 10,
//     _element: tr
//     _id: "645aba632cbeb96cf46ad190"
// }
```

- Read records

```js
var query = { name: "John" };
table.read(query);
// [{
//     name: "John",
//     age: 10,
//     _element: tr
//     _id: "645aba632cbeb96cf46ad190"
// }]
```

- Update records

```js
// updates._id, updates._element field must be undefined
var query = { _id: "645aba632cbeb96cf46ad190" };
var updates = { age: 33 };
table.update(query, updates);
// {
//     name: "John",
//     age: 33,
//     _element: tr
//     _id: "645aba632cbeb96cf46ad190"
// }
```

- Delete records

```js
var query = { _id: "645aba632cbeb96cf46ad190" };
table.delete(query);
```

- Export records

```js
var query = {}; // select all records
table.export(query);
// [{
//     name: "John",
//     age: 33
// }]
```

- Count records

```js
table.length; // return number
```

- Sort records

```js
table.sort(function(a, b) {
    return a.age - b.age;
});
```