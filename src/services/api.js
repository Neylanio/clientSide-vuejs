// src/services/api.js
import axios from "axios";

const HOST = "https://edimossilva-task-manager.herokuapp.com";
const LOGIN_URL = `${HOST}/auth/login`;
const TASKGROUP_URL = `${HOST}/task_lists`;
const TASK_URL = `${HOST}/tasks`;
const TASKITEM_URL = `${HOST}/task_in_lists`;

//Group
const TASKGROUPCREATE_URL = `${HOST}/task_lists`;
const TASKGROUPDELETE_URL = `${HOST}/task_lists`;

//List
const TASKCREATE_URL = `${HOST}/tasks`;
const TASKUPDATE_URL = `${HOST}/tasks`;
const TASKDELETE_URL = `${HOST}/tasks`;

//Group-List
const TASKGROUPLISTCREATE_URL = `${HOST}/task_in_lists`;
const TASKGROUPLISTDELETE_URL = `${HOST}/task_in_lists`;

export const getRequestConfig = () => {
  const token = localStorage.getItem("token");
  const requestConfig = {
    headers: {
      Authorization: `Basic ${token}`
    }
  };

  return requestConfig;
};

export const doLoginApi = (username, password) => {
  const params = { username, password };

  return axios.post(LOGIN_URL, params);
};

export const getTaskgroupsApi = () => {
  return axios.get(TASKGROUP_URL, getRequestConfig());
};

export const getTaskgroupApi = id => {
  const getTaskgroupApiURL = `${TASKGROUP_URL}/${id}`;

  return axios.get(getTaskgroupApiURL, getRequestConfig());
};

export const updateTaskitemApi = taskitem => {
  const getTaskgroupApiURL = `${TASKITEM_URL}/${taskitem.id}`;
  const params = { checked: taskitem.checked };

  return axios.put(getTaskgroupApiURL, params, getRequestConfig());
};

export const updateNameTaskitemApi = taskitem => {
  const getTaskgroupApiURL = `${TASK_URL}/${taskitem.id}`;
  const params = { name: taskitem.name };

  return axios.put(getTaskgroupApiURL, params, getRequestConfig());
};

//Group
export const createTaskgroupApi = taskgroupitem => {
  const getTaskgroupApiURL = `${TASKGROUPCREATE_URL}`;
  const params = taskgroupitem;

  return axios.post(getTaskgroupApiURL, params, getRequestConfig());
};

export const deleteTaskgroupApi = id => {
  const getTaskgroupApiURL = `${TASKGROUPDELETE_URL}/${id}`;

  return axios.delete(getTaskgroupApiURL, getRequestConfig());
};




//List
export const createTasklistApi = taskitem => {
  const getTaskgroupApiURL = `${TASKCREATE_URL}`;
  const params = { name: taskitem.name, description: taskitem.description };

  return axios.post(getTaskgroupApiURL, params, getRequestConfig());

};

export const updateTasklistApi = taskitem => {
  const getTaskgroupApiURL = `${TASKUPDATE_URL}/${taskitem.id}`;
  const params = taskitem;

  return axios.put(getTaskgroupApiURL, params, getRequestConfig());
};


export const deleteTasklistApi = id => {
  const getTaskgroupApiURL = `${TASKDELETE_URL}/${id}`;

  return axios.delete(getTaskgroupApiURL, getRequestConfig());
};



//Group-List
export const createTaskgrouplistpApi = taskgrouplistitem => {
  const getTaskgroupApiURL = `${TASKGROUPLISTCREATE_URL}`;
  const params = taskgrouplistitem;

  return axios.post(getTaskgroupApiURL, params, getRequestConfig());
};

export const deleteTaskgrouplistApi = id2 => {
  const getTaskgroupApiURL = `${TASKGROUPLISTDELETE_URL}/${id2}`;

  return axios.delete(getTaskgroupApiURL, getRequestConfig());
};

