import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { addTask } from "./utils";
import { saveTask } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { Task } from "./models/Task";
import { ProgressTaskAdds } from "./models/ProgressTaskAdds";
import { taskInWork } from "./utils";
import { taskAddProgress } from "./utils";




export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

const newUser = document.querySelector('.newUser');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

  document.querySelector("#content").innerHTML = fieldHTMLContent;

  const newTask = document.querySelector('.newTask');

  const progressTaskAdd = document.querySelector('.progressTaskAdd');// КНОПКА ДЛЯ ВЫБОРА ГОТОВЫХ ЗАДАЧ
  
 

  progressTaskAdd.addEventListener('click', () => { // Получаем список задач для работы
      
    
    taskAddProgress(login, ProgressTaskAdds)
    
  });
  
  if(JSON.parse(localStorage.getItem("tasks"))){
    taskInWork(login);
  }
  
  
  newTask.addEventListener('click', () => { //добавление задачи

    if(newTask.value == 'addTask'){     //СОХРАНЯЕМ
      newTask.value = 'newTask';
      newTask.innerHTML = 'Добавить задачу'
      addTask(login, Task);
      
    }else{                              //ДОБАВЛЯЕМ
    saveTask();
    newTask.innerHTML = 'Сохранить задачу'
    newTask.value = 'addTask';
    
    }
  
  })
   
});

newUser.addEventListener('click', () => {
  form.classList.add('open');
  popup.classList.add('popup_open');
  
});

const regNewUser = document.querySelector('.regNewUser');

regNewUser.addEventListener('click', () => {
   
  generateTestUser(User);
   
});

