import request from "@/app/admin/axios";
import {IResponse} from "@/app/admin/axios/type.ts";

export const ApiTable = (data: Record<string, any>): Promise<IResponse<{ list: any [], total: number }>> => {
	return request.get({url: 'permissions/administrator/list', data: data});
};

export const ApiDelete = (data: { ids: Array<number> }) => {
	return request.post({url: 'permissions/administrator/delete', data: data});
};

export const ApiSave = (data: Record<string, any>) => {
	return request.post({url: 'permissions/administrator/save', data: data});
};