export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  let nameNewUser = document.querySelector('.nameUser').value;
  let passNewUser = document.querySelector('.passUser').value;
  const testUser = new User(nameNewUser, passNewUser);
  User.save(testUser);
};

export const saveTask = function(){
  let readyTask = document.querySelector('.readyTask');
  let input = document.createElement("input");
  input.className = 'textTask'
   readyTask.appendChild(input);
  
  
}

export const addTask = function(login, Task){
  
  let inputText = document.querySelector('.textTask');
  
  let readyTask = document.querySelector('.readyTask');
  let textTask = document.querySelector('.textTask').value;
  
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.textContent = textTask;
  readyTask.appendChild(ul);
  ul.appendChild(li);
  li.id = Task.id;
  const testTask = new Task(login, textTask);
  Task.save(testTask);
  let task = JSON.parse(localStorage.getItem("tasks"));
  task.forEach((a) => {
    li.id = a.id;
  })
  inputText.remove();
}

export const taskInWork = function(login){
    let nameUser = login;
    
    let task = JSON.parse(localStorage.getItem("tasks"));
    
    task.forEach((a) => {
      if(a.status == 'readyTask' && a.login == nameUser){
        let readyTask = document.querySelector('.readyTask');

        let ul = document.createElement("ul");
        let li = document.createElement("li");
        li.textContent = a.textTask;
        readyTask.appendChild(ul);
        ul.appendChild(li);
      }
      if(a.status == 'progressTask' && a.login == nameUser){
        let progressTask = document.querySelector('.progressTask');
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        li.textContent = a.textTask;
        progressTask.appendChild(ul);
        ul.appendChild(li);
      }
      
     
    });
    
}


export const taskAddProgress = function(login, ProgressTaskAdds){     // ВЫБИРАЕМ ЗАДАЧИ ДЛЯ РАБОТЫ из ГОТОВЫх
  
  let nameUser = login;
  let progressTask = document.querySelector('.progressTask');
  let selectTask = document.createElement("select");
  let but = document.querySelector('.progressTaskAdd');
  but.replaceWith(selectTask);
  
  let task = JSON.parse(localStorage.getItem("tasks")); //получаем задания из локала

        task.forEach((a) => {
          if(a.status == 'readyTask' && a.login == nameUser){
          let option = document.createElement('option');
          
                    
          option.textContent = a.textTask;
          
          
          selectTask.appendChild(option);
             
            } 
        });
        selectTask.addEventListener('change', () =>{
          selectTask.replaceWith(but);
          let ul = document.createElement("ul");
          let li = document.createElement("li");
          
          li.textContent = selectTask.value;
          progressTask.appendChild(ul);
          
          ul.appendChild(li);

         let newTaskProgress = li.textContent;
          
          
          let index = task.findIndex(el => el.textTask == newTaskProgress);
          

          
            
          task.splice(index, 1)   
          localStorage.setItem('tasks', JSON.stringify(task)); 

          const progress = new ProgressTaskAdds(login, newTaskProgress);
          ProgressTaskAdds.save(progress);

          selectTask.remove()
          
        })
        
}
