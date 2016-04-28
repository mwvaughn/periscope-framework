
export let StateDiscriminator = class StateDiscriminator {
  static discriminate(widgetStates) {
    var result = [];
    for (let ws of widgetStates) {
      if (ws.value.stateType === "searchBoxState") result.push(ws);
    }
    return result;
  }

};