import request from "@/app/admin/axios";
import type {loginApiTypes} from "./types";

export const ApiLogin = (data: loginApiTypes) => {
	return request.post({url: 'index/login', data: data});
};

export const ApiRoutes = () => {
	return request.get({url: 'index/routes'});
};