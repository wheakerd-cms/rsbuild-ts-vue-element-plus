import type {AxiosContentType} from "@/types/axios";
import {getAppName} from "@/utils/helper.ts";

/**
 * request success status code
 * @var number SUCCESS_CODE
 */
export const SUCCESS_CODE: number = 200;

/**
 * request contentType
 */
export const CONTENT_TYPE: AxiosContentType = 'application/json';

export const BASE_URL: string = `http://127.0.0.1:9601/${getAppName(import.meta.env.PUBLIC_ROUTER_MODE)}/`;