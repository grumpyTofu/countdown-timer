import { createStore, applyMiddleware } from "redux";
import * as Timer from "./Timer";
export default createStore(Timer.reducers, applyMiddleware(Timer.middleware));
