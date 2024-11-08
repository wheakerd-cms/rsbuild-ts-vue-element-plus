import request from "@/app/admin/axios";
import {IResponse} from "@/app/admin/axios/type.ts";

export const ApiRolesList = (data: Record<string, any>): Promise<IResponse<{ list: any [], total: number }>> => {
	return request.get({url: 'permissions/roles/list', data: data});
};

export const ApiDelete = (data: { ids: Array<number> }) => {
	return request.post({url: 'permissions/roles/delete', data: data});
};

export const ApiSave = (data: Record<string, any>) => {
	return request.post({url: 'permissions/roles/save', data: data});
};

export const ApiSelectMenu = () => {
	return request.get({url: 'permissions/roles/select-menu'});
};

export const ApiSelectRoles = () => {
	return request.get({url: 'permissions/roles/select'});
};