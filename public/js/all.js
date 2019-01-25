"use strict";

var app = new Vue({
  el: '#app',
  data: {
    newTodos: '',
    newTodoDate: '',
    newTodoTime: '',
    todoList: [{
      id: '0',
      title: '範例代辦事項',
      todoDate: '2019-01-25',
      todoTime: '13:46',
      completed: false
    }, {
      id: '1',
      title: '範例代辦事項',
      todoDate: '2019-01-25',
      todoTime: '13:46',
      completed: true
    }],
    visibility: 'all'
  }
});
$(document).ready(function () {
  $('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
//# sourceMappingURL=all.js.map
