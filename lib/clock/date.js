import { watchface } from "../events";
import { getDateWidth, TIME } from "../sensors";
import { getImageArray, mapLanguage } from "../utils";

const language = DeviceRuntimeCore.HmUtils.getLanguage();
const hasDay = language.startsWith("en") || language.startsWith("zh");

export function renderDate(hasDigits, hasPointer) {
  let { x, y, month_startX, month_startY } = getDatePosition();
  const font = getImageArray("fonts/date");

  const day =
    hasDay &&
    watchface.createWidget(hmUI.widget.IMG_WEEK, {
      _name: "day",
      x,
      y,
      ...mapLanguage((lang) => [`week_${lang}`, getImageArray(`days/${lang}`, 7)]),
    });

  const date = watchface.createWidget(hmUI.widget.IMG_DATE, {
    _name: "date",
    month_startX,
    month_startY,
    month_zero: 0,
    ...mapLanguage((lang) => [`month_${lang}_array`, font]),
    ...mapLanguage((lang) => [`month_unit_${lang}`, "fonts/date/slash.png"]),
    day_follow: 1,
    day_zero: 0,
    ...mapLanguage((lang) => [`day_${lang}_array`, font]),
  });

  if (hasDigits && hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    let { x, y, month_startX, month_startY } = getDatePosition();
    day?.setProperty(hmUI.prop.MORE, { x, y });
    date.setProperty(hmUI.prop.MORE, { month_startX, month_startY });
  });

  function getDatePosition() {
    if (hasDigits && hasPointer) {
      return { x: 32, y: 230, month_startX: 114, month_startY: 230 };
    }

    const dayWidth = hasDay ? 52 : 0;
    if (hasPointer) {
      return {
        x: Math.round((192 - dayWidth) / 2),
        y: 133,
        month_startX: Math.round((192 - getDateWidth()) / 2),
        month_startY: 327,
      };
    }

    const x = Math.round((192 - getDateWidth() - dayWidth) / 2);
    return { x, y: 230, month_startX: x + dayWidth, month_startY: 230 };
  }
}
