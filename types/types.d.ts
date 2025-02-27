import { GestureHandlerStateChangeEvent } from "react-native-gesture-handler";

export type EventType = GestureHandlerStateChangeEvent;

export type FeedItemType = {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
};
