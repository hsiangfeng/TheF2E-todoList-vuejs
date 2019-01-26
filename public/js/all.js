"use strict";

var app = new Vue({
  el: '#app',
  data: {
    newTodos: '',
    newTodoDate: '',
    newTodoTime: '',
    newTodoComment: '',
    todoList: [],
    cacheTodoId: '',
    cacheTitle: '',
    allLen: '0',
    progressLen: '0',
    completedLen: '0',
    visibility: 'all'
  },
  methods: {
    addTodo: function addTodo() {
      var todos = this.newTodos.trim();
      var todoDate = this.newTodoDate;
      var todoTime = this.newTodoTime;
      var todoComment = this.newTodoComment;
      var timetamp = Math.floor(Date.now());

      if (!todos) {
        return;
      }

      this.todoList.push({
        id: timetamp,
        title: todos,
        comment: todoComment,
        todoDate: todoDate,
        todoTime: todoTime,
        completed: false
      });
      localStorage.setItem('todos', JSON.stringify(this.todoList));
      this.newTodos = '';
      this.newTodoDate = '';
      this.newTodoTime = '';
      this.newTodoComment = '';
    },
    removeTodo: function removeTodo(todo) {
      var newTodo = '';
      var vm = this;

      if (confirm('您確定要刪除該筆資料?')) {
        vm.todoList.forEach(function (item, key) {
          if (item.id == todo.id) {
            newTodo = key;
          }
        });
        this.todoList.splice(newTodo, 1);
        localStorage.setItem('todos', JSON.stringify(this.todoList));
      }
    },
    editTodos: function editTodos(item) {
      this.cacheTodoId = item.id;
      this.cacheTitle = item.title;
    },
    doneEdit: function doneEdit(item) {
      item.title = this.cacheTitle;
      this.cacheTodoId = '';
      this.cacheTitle = '';
      localStorage.setItem('todos', JSON.stringify(this.todoList));
    },
    cancelEdit: function cancelEdit() {
      this.cacheTodoId = '';
      this.cacheTitle = '';
    },
    allRemove: function allRemove() {
      if (confirm('你確定要刪除所有任務?')) {
        this.todoList = [];
        localStorage.setItem('todos', JSON.stringify(this.todoList));
        alert('全部任務已清除。');
      }
    },
    countTodo: function countTodo() {
      var progressTodosLen = [];
      var completedTodosLen = [];
      this.todoList.forEach(function (item) {
        if (!item.completed) {
          progressTodosLen.push(item);
        } else if (item.completed) {
          completedTodosLen.push(item);
        }
      });
      this.allLen = this.todoList.length;
      this.progressLen = progressTodosLen.length;
      this.completedLen = completedTodosLen.length;
    },
    pastTodos: function pastTodos() {
      var _this = this;

      var _data = JSON.parse(localStorage.getItem('todos')) || [];

      _data.forEach(function (item) {
        _this.todoList.push(item);
      });

      console.log(_data);
    }
  },
  computed: {
    filterTodoList: function filterTodoList() {
      var newTodoList = [];

      switch (this.visibility) {
        case "all":
          return this.todoList;

        case "progress":
          this.todoList.forEach(function (item) {
            if (!item.completed) {
              newTodoList.push(item);
            }
          });
          return newTodoList;

        case "completed":
          this.todoList.forEach(function (item) {
            if (item.completed) {
              newTodoList.push(item);
            }
          });
          return newTodoList;
      }
    },
    countTodoList: function countTodoList() {
      var progressTodosLen = [];
      var completedTodosLen = [];
      this.todoList.forEach(function (item) {
        if (!item.completed) {
          progressTodosLen.push(item);
        } else if (item.completed) {
          completedTodosLen.push(item);
        }
      });
      this.allLen = this.todoList.length;
      this.progressLen = progressTodosLen.length;
      this.completedLen = completedTodosLen.length;
    }
  },
  created: function created() {
    this.countTodo();
    this.pastTodos();
  }
});
$(document).ready(function () {
  $('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
//# sourceMappingURL=all.js.map
