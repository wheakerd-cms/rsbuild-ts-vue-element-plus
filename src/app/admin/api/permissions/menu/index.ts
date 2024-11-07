import request from "@/app/admin/axios";
import {IResponse} from "@/app/admin/axios/type.ts";

export const ApiTable = (data: Record<string, any>): Promise<IResponse<{ list: any [], total: number }>> => {
	return request.post({url: 'permissions/menu/table', data: data});
};

export const ApiDelete = (data: Array<number>) => {
	return request.post({url: 'permissions/menu/delete', data: data});
};

export const ApiSave = (data: Record<string, any>) => {
	return request.post({url: 'permissions/menu/save', data: data});
};

export const ApiSelectMenu = () => {
	return request.get({url: 'permissions/menu/select-menu'});
};