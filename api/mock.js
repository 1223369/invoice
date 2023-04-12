import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';

Mock.mock('/api/home/getData', homeApi.getStatisticalData);

Mock.mock(/user\/getUser/, 'get', userApi.getUserList);
Mock.mock(/user\/addUser/, 'post', userApi.createUser);
Mock.mock(/user\/editUser/, 'post', userApi.updateUser);
Mock.mock(/user\/del/, 'post', userApi.deleteUser);

