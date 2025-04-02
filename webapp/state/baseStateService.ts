import AppComponent from "../Component";
import BaseService from "../service/baseService";
import BaseStateSimple from "./baseStateSimple";

export default class BaseStateService<T extends BaseService> extends BaseStateSimple {
  protected service: T;

  constructor(oComponent: AppComponent, service?: T) {
    super(oComponent);
    if (service) this.service = service;
  }
}
