import { Unsubscribable } from "rxjs";

export type TRootState = {[key: string]: any, subscriptions: Unsubscribable[]};
