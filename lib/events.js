import { vibrate } from "./sensors";

export const fullScreen = { x: 0, y: 0, w: 192, h: 490 };
export const watchface = hmUI.createWidget(hmUI.widget.GROUP, { _name: "watchface", ...fullScreen });

function call(url) {
  switch (typeof url) {
    case "function":
      return url();
    case "string":
      return hmApp.startApp({ url, native: true });
    default:
      return hmApp.startApp(url);
  }
}

function changeBrightness(delta) {
  hmSetting.setBrightness(Math.min(Math.max(0, hmSetting.getBrightness() + delta), 100));
}

export function addEventListeners(widgetURLs, barURLs) {
  let canHandleClick = false;

  watchface.addEventListener(hmUI.event.CLICK_DOWN, () => (canHandleClick = true));
  watchface.addEventListener(hmUI.event.MOVE, () => (canHandleClick = false));

  watchface.addEventListener(hmUI.event.CLICK_UP, ({ x, y }) => {
    if (!canHandleClick) return;
    canHandleClick = false;
    vibrate();

    if (48 <= x && x < 144) {
      if (35 <= y && y < 113) {
        call(widgetURLs[0]);
      } else if (376 < y && y < 455) {
        call(widgetURLs[1]);
      }
    } else {
      const isLeft = x < 96;
      if (y < 130) {
        call(barURLs[isLeft ? 0 : 1]);
      } else if (y >= 360) {
        call(barURLs[isLeft ? 2 : 3]);
      } else {
        changeBrightness(isLeft ? -10 : 10);
      }
    }
  });
}
