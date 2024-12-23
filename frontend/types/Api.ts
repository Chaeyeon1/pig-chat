/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** RoomModel */
export interface RoomModel {
  /**
   * Maxuser
   * @default 8
   */
  MaxUser?: number;
  /** Name */
  Name: string;
  /** Roomid */
  RoomID: string;
  /**
   * Roomstate
   * @default false
   */
  RoomState?: boolean;
  /** Roomhostid */
  RoomHostID: string;
  /**
   * Userlist
   * @default []
   */
  UserList?: UserModel[];
}

/** UserModel */
export interface UserModel {
  /** Name */
  Name: string;
  /** Userid */
  UserID: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type AddUserFirebaseUserPostData = UserModel;

export type AddUserFirebaseUserPostError = HTTPValidationError;

export type AddUserFirebaseUserUserIdGetData = UserModel;

export type AddUserFirebaseUserUserIdGetError = HTTPValidationError;

/** Update Data */
export type UpdateUserFirebaseUserItemIdPutPayload = object;

export type UpdateUserFirebaseUserItemIdPutData = any;

export type UpdateUserFirebaseUserItemIdPutError = HTTPValidationError;

export type GetRoomStatusFirebaseRoomRoomIdGetData = RoomModel;

export type GetRoomStatusFirebaseRoomRoomIdGetError = HTTPValidationError;

/** Response Get All Rooms Firebase Room  Get */
export type GetAllRoomsFirebaseRoomGetData = RoomModel[];

export type StartGameFirebaseRoomRoomIdStartPutData = any;

export type StartGameFirebaseRoomRoomIdStartPutError = HTTPValidationError;

export type EndGameFirebaseRoomRoomIdEndPutData = any;

export type EndGameFirebaseRoomRoomIdEndPutError = HTTPValidationError;

export type LeaveRoomFirebaseRoomRoomIdLeavePutData = any;

export type LeaveRoomFirebaseRoomRoomIdLeavePutError = HTTPValidationError;

export type JoinRoomFirebaseRoomRoomIdJoinPutData = any;

export type JoinRoomFirebaseRoomRoomIdJoinPutError = HTTPValidationError;

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title My API with Response Models
 * @version 1.0.0
 *
 * This API demonstrates how to define response types using response_model.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  firebase = {
    /**
     * @description Add an User to Firestore.
     *
     * @tags User
     * @name AddUserFirebaseUserPost
     * @summary Create an User
     * @request POST:/firebase/User/
     * @response `200` `AddUserFirebaseUserPostData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    addUserFirebaseUserPost: (data: UserModel, params: RequestParams = {}) =>
      this.request<AddUserFirebaseUserPostData, AddUserFirebaseUserPostError>({
        path: `/firebase/User/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve an User from Firestore by ID.
     *
     * @tags User
     * @name AddUserFirebaseUserUserIdGet
     * @summary Get User by UserID
     * @request GET:/firebase/User/{user_id}
     * @response `200` `AddUserFirebaseUserUserIdGetData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    addUserFirebaseUserUserIdGet: (userId: string, params: RequestParams = {}) =>
      this.request<AddUserFirebaseUserUserIdGetData, AddUserFirebaseUserUserIdGetError>({
        path: `/firebase/User/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a document in a Firestore User.
     *
     * @tags User
     * @name UpdateUserFirebaseUserItemIdPut
     * @summary Update User
     * @request PUT:/firebase/User/{item_id}
     * @response `200` `UpdateUserFirebaseUserItemIdPutData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    updateUserFirebaseUserItemIdPut: (
      itemId: string,
      data: UpdateUserFirebaseUserItemIdPutPayload,
      params: RequestParams = {},
    ) =>
      this.request<UpdateUserFirebaseUserItemIdPutData, UpdateUserFirebaseUserItemIdPutError>({
        path: `/firebase/User/${itemId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Room
     * @name GetRoomStatusFirebaseRoomRoomIdGet
     * @summary Get Current Rooms
     * @request GET:/firebase/Room/{room_id}
     * @response `200` `GetRoomStatusFirebaseRoomRoomIdGetData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getRoomStatusFirebaseRoomRoomIdGet: (roomId: string, params: RequestParams = {}) =>
      this.request<GetRoomStatusFirebaseRoomRoomIdGetData, GetRoomStatusFirebaseRoomRoomIdGetError>({
        path: `/firebase/Room/${roomId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all game rooms from Firestore.
     *
     * @tags Room
     * @name GetAllRoomsFirebaseRoomGet
     * @summary Get ALL Rooms
     * @request GET:/firebase/Room/
     * @response `200` `GetAllRoomsFirebaseRoomGetData` Successful Response
     */
    getAllRoomsFirebaseRoomGet: (params: RequestParams = {}) =>
      this.request<GetAllRoomsFirebaseRoomGetData, any>({
        path: `/firebase/Room/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Start the game by setting RoomState to True and clearing chat messages.
     *
     * @tags Room
     * @name StartGameFirebaseRoomRoomIdStartPut
     * @summary Start Game and Reset Chat
     * @request PUT:/firebase/Room/{room_id}/start
     * @response `200` `StartGameFirebaseRoomRoomIdStartPutData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    startGameFirebaseRoomRoomIdStartPut: (roomId: string, params: RequestParams = {}) =>
      this.request<StartGameFirebaseRoomRoomIdStartPutData, StartGameFirebaseRoomRoomIdStartPutError>({
        path: `/firebase/Room/${roomId}/start`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * @description End the game by setting RoomState to False and clearing chat messages.
     *
     * @tags Room
     * @name EndGameFirebaseRoomRoomIdEndPut
     * @summary End Game and Reset Chat
     * @request PUT:/firebase/Room/{room_id}/end
     * @response `200` `EndGameFirebaseRoomRoomIdEndPutData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    endGameFirebaseRoomRoomIdEndPut: (roomId: string, params: RequestParams = {}) =>
      this.request<EndGameFirebaseRoomRoomIdEndPutData, EndGameFirebaseRoomRoomIdEndPutError>({
        path: `/firebase/Room/${roomId}/end`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a user from the UserList of a room and update the Room information.
     *
     * @tags Room
     * @name LeaveRoomFirebaseRoomRoomIdLeavePut
     * @summary Leave a Room
     * @request PUT:/firebase/Room/{room_id}/leave
     * @response `200` `LeaveRoomFirebaseRoomRoomIdLeavePutData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    leaveRoomFirebaseRoomRoomIdLeavePut: (
      roomId: string,
      query: {
        /** User Id */
        user_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LeaveRoomFirebaseRoomRoomIdLeavePutData, LeaveRoomFirebaseRoomRoomIdLeavePutError>({
        path: `/firebase/Room/${roomId}/leave`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a user to the UserList of an existing room.
     *
     * @tags Room
     * @name JoinRoomFirebaseRoomRoomIdJoinPut
     * @summary Join a Room
     * @request PUT:/firebase/Room/{room_id}/join
     * @response `200` `JoinRoomFirebaseRoomRoomIdJoinPutData` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    joinRoomFirebaseRoomRoomIdJoinPut: (
      roomId: string,
      query: {
        /** User Id */
        user_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<JoinRoomFirebaseRoomRoomIdJoinPutData, JoinRoomFirebaseRoomRoomIdJoinPutError>({
        path: `/firebase/Room/${roomId}/join`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
