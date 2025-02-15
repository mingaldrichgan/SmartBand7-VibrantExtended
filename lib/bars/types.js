import { SLEEP } from "../sensors";

export const BAR_TYPES = {
  HUMIDITY: { url: "WeatherScreen", color: { fg: 0x0dd3ff, bg: 0x043f4c } },
  BATTERY: {
    url: "Settings_batteryManagerScreen",
    color: { fg: 0x02fa7a, bg: 0x014b25 },
    symbols: { unit: "percent" },
  },
  BRIGHTNESS: {
    type: { value: 1, en: "Brightness", sc: "亮度", tc: "亮度" },
    url: "Settings_lightAdjustScreen",
    getProgress: hmSetting.getBrightness,
    getText: hmSetting.getBrightness,
    symbols: { unit: "percent" },
  },
  STEP: { url: "activityAppScreen", color: "yellow" },
  DISTANCE: { url: "activityAppScreen", color: "yellow", progressKey: "STEP", symbols: { dot: true } },
  STAND: { url: "activityAppScreen", color: "yellow" },
  CAL: { url: "activityAppScreen", color: { fg: 0xff8a01, bg: 0x4c2900 } },
  PAI_WEEKLY: { url: "pai_app_Screen", color: { fg: 0x5252ff, bg: 0x19194c } },
  STRESS: { url: "StressHomeScreen", color: { fg: 0x00bd9d, bg: 0x00382f } },
  HEART: { url: "heart_app_Screen", color: "red" },
  SPO2: { url: "spo_HomeScreen", color: "red", unit: "percent" },
  SLEEP: {
    type: { value: 2, en: "Sleep Hours", sc: "睡眠小时", tc: "睡眠小時" },
    url: "Sleep_HomeScreen",
    color: "purple",
    getProgress: () => SLEEP.getBasicInfo().score,
    symbols: { dot: true },
  },
  SLEEP_SCORE: {
    type: { value: 3, en: "Sleep Score", sc: "睡眠得分", tc: "睡眠評分" },
    url: "Sleep_HomeScreen",
    color: "purple",
    getProgress: () => SLEEP.getBasicInfo().score,
    getText: () => SLEEP.getBasicInfo().score,
    refreshMs: 1000,
  },
};
