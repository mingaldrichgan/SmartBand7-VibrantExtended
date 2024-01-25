const STATUS_ON_LEFT = {
  bluetooth: { x: 0, y: 216 },
  dnd: { x: 0, y: 248 },
};

const STATUS_ON_BOTH_SIDES = {
  bluetooth: { x: 0, y: 232 },
  dnd: { x: 166, y: 232 },
};

function getStatusPosition(hasDigits, hasPointer) {
  return hasDigits && hasPointer && getDateWidth() > 46 ? STATUS_ON_LEFT : STATUS_ON_BOTH_SIDES;
}

function renderStatus(hasDigits, hasPointer) {
  let currentPosition = getStatusPosition(hasDigits, hasPointer);
  const bluetooth = [
    hmUI.createWidget(hmUI.widget.IMG, {
      _name: "status.bluetooth.on",
      ...currentPosition.bluetooth,
      src: "status/bluetooth_on.png",
    }),
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      _name: "status.bluetooth.off",
      ...currentPosition.bluetooth,
      src: "status/bluetooth_off.png",
      type: hmUI.system_status.DISCONNECT,
    }),
  ];

  const dnd = [
    hmUI.createWidget(hmUI.widget.IMG, {
      _name: "status.dnd.off",
      ...currentPosition.dnd,
      src: "status/dnd_off.png",
    }),
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      _name: "status.dnd.on",
      ...currentPosition.dnd,
      src: "status/dnd_on.png",
      type: hmUI.system_status.DISTURB,
    }),
  ];

  if (!hasDigits || !hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    if (currentPosition !== (currentPosition = getStatusPosition(hasDigits, hasPointer))) {
      for (let widget of bluetooth) widget.setProperty(hmUI.prop.MORE, currentPosition.bluetooth);
      for (let widget of dnd) widget.setProperty(hmUI.prop.MORE, currentPosition.dnd);
    }
  });
}
