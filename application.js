//id: 1226

//get tasks
$(document).ready(function() {
  var getAndDisplayAllTasks = function() {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1226', 	
      dataType: 'json',
      success: function(response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          $('#todo-list').append('<div class="row"><p class="col-xs-8 data-id=' + task.id + '">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        })
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  //add task
  var createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1226',
      contentType: 'application/json',
      datatype: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function(response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function(request, textStatus) {
        console.log(errorMessage);
      }
    })
  };
  
  //remove task
  var deleteTask = function(id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + ':id?api_key=1226',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  };

  //mark task complete
  var markTaskComplete = function(id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1226',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var markTaskActive = function(id) {
    $.ajax({
    type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1226',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  //event listeners
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('click', '.delete', function() {
    deleteTask($(this).data('id'));
  });

  $(document).on('change', '.mark-complete', function() {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    }
  });

  getAndDisplayAllTasks();
});
