import api from './API';

const apiName = 'Default';

export const getItems = () => api.get('api/app/todo', { apiName })
  .then(({ data }) => ({ items: data, totalCount: data.length }));

export const getItemById = id => api.get(`api/app/todo/${id}`, { apiName })
  .then(({ data }) => data);

export const createItem = text => api.post(`api/app/todo?text=${text}`, { apiName })
  .then(({ data }) => data);

export const updateItem = (id, text) => api.put(`api/app/todo/${id}?text=${text}`, { apiName })
  .then(({ data }) => data);

export const deleteItem = id => api.delete(`api/app/todo/${id}`, { apiName })
  .then(({ data }) => data);