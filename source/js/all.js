let app = new Vue({
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
    addTodo: function () {
      const todos = this.newTodos.trim()
      const todoDate = this.newTodoDate
      const todoTime = this.newTodoTime
      const todoComment = this.newTodoComment
      const timetamp = Math.floor(Date.now())
      if (!todos) { return }
      this.todoList.push({
        id: timetamp,
        title: todos,
        comment: todoComment,
        todoDate: todoDate,
        todoTime: todoTime,
        completed: false
      })
      localStorage.setItem('todos', JSON.stringify(this.todoList))
      this.newTodos = ''
      this.newTodoDate = ''
      this.newTodoTime = ''
      this.newTodoComment = ''
      this.countTodo()
    },
    removeTodo: function (todo) {
      let newTodo = ''
      let vm = this
      if (confirm('您確定要刪除該筆資料?')) {
        vm.todoList.forEach((item, key) => {
          if (item.id === todo.id) {
            newTodo = key
          }
        })
        this.todoList.splice(newTodo, 1)
        localStorage.setItem('todos', JSON.stringify(this.todoList))
      }
    },
    editTodos: function (item) {
      this.cacheTodoId = item.id
      this.cacheTitle = item.title
    },
    doneEdit: function (item) {
      item.title = this.cacheTitle
      this.cacheTodoId = ''
      this.cacheTitle = ''
      localStorage.setItem('todos', JSON.stringify(this.todoList))
    },
    cancelEdit: function () {
      this.cacheTodoId = ''
      this.cacheTitle = ''
    },
    allRemove: function () {
      if (confirm('你確定要刪除所有任務?')) {
        this.todoList = []
        localStorage.setItem('todos', JSON.stringify(this.todoList))
        alert('全部任務已清除。')
      }
    },
    countTodo: function () {
      let progressTodosLen = []
      let completedTodosLen = []
      this.todoList.forEach(item => {
        if (!item.completed) {
          progressTodosLen.push(item)
        } else if (item.completed) {
          completedTodosLen.push(item)
        }
      })
      this.allLen = this.todoList.length
      this.progressLen = progressTodosLen.length
      this.completedLen = completedTodosLen.length
    },
    pastTodos: function () {
      const _data = JSON.parse(localStorage.getItem('todos')) || []
      _data.forEach(item => {
        this.todoList.push(item)
      })
      this.countTodo()
    }
  },
  computed: {
    filterTodoList: function () {
      let newTodoList = []
      switch (this.visibility) {
        case 'all':
          return this.todoList
        case 'progress':
          this.todoList.forEach(item => {
            if (!item.completed) {
              newTodoList.push(item)
            }
          })
          return newTodoList
        case 'completed':
          this.todoList.forEach(item => {
            if (item.completed) {
              newTodoList.push(item)
            }
          })
          return newTodoList
      }
    },
    countTodoList: function () {
      let progressTodosLen = []
      let completedTodosLen = []
      this.todoList.forEach(item => {
        if (!item.completed) {
          progressTodosLen.push(item)
        } else if (item.completed) {
          completedTodosLen.push(item)
        }
      })
      this.allLen = this.todoList.length
      this.progressLen = progressTodosLen.length
      this.completedLen = completedTodosLen.length
    },
    updataTodo: function () {
      console.log('更新資料狀態')
      const todoStatus = this.todoList
      window.localStorage.setItem('todos', JSON.stringify(todoStatus))
    }
  },
  created () {
    this.countTodo()
    this.pastTodos()
  }
})
window.onload = function () {
  $('.loading').fadeOut()
}
