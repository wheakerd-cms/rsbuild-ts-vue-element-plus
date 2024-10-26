import request from "@/app/admin/axios";
import type {loginApiTypes} from "./types";

export const loginApi = (data: loginApiTypes) => {
	return request.post({url: 'index/login', data: data});
};