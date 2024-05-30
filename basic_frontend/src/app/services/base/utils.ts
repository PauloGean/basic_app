// import {ReflectiveInjector} from '@angular/core';

export class Utils {

  public static getOffset(pageIndex: number, pageSize: number): number {
    return pageSize * pageIndex;
  }
}
