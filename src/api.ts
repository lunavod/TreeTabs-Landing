import React from "react";

export interface VivaldiTab extends chrome.tabs.Tab {
  vivExtData?: string;
}

export class EventBase<Cb extends CallableFunction> {
  listeners: Cb[] = [];

  constructor(
    public topic: string,
    private port: chrome.runtime.Port
  ) {
    this.subscribe();
  }

  addListener(cb: Cb) {
    this.listeners.push(cb);
  }

  removeListener(cb: Cb) {
    this.listeners = this.listeners.filter((l) => l !== cb);
  }

  subscribe() {
    this.port.onMessage.addListener((msg) => {
      if (msg.type === this.topic) {
        this.listeners.forEach((l) => l(...msg.data));
      }
    });
  }

  reload(port: chrome.runtime.Port) {
    this.port = port;
    if (this.listeners.length > 0) {
      this.subscribe();
    }
  }
}

export class TabsApi {
  public port: chrome.runtime.Port;
  public onUpdated: EventBase<
    (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: VivaldiTab
    ) => void
  >;
  public onActivated: EventBase<
    (activeInfo: chrome.tabs.TabActiveInfo) => void
  >;
  public onCreated: EventBase<(tab: VivaldiTab) => void>;
  public onRemoved: EventBase<
    (tabId: number, removeInfo: chrome.tabs.TabRemoveInfo) => void
  >;
  public onReplaced: EventBase<
    (addedTabId: number, removedTabId: number) => void
  >;
  public onAttached: EventBase<
    (tabId: number, attachInfo: chrome.tabs.TabAttachInfo) => void
  >;
  public onDetached: EventBase<
    (tabId: number, detachInfo: chrome.tabs.TabDetachInfo) => void
  >;
  public onMoved: EventBase<
    (tabId: number, moveInfo: chrome.tabs.TabMoveInfo) => void
  >;
  public onHighlighted: EventBase<
    (highlightInfo: chrome.tabs.TabHighlightInfo) => void
  >;

  constructor(public extId: string) {
    this.port = chrome.runtime.connect(extId);
    this.port.onDisconnect.addListener(() => {
      this.changeExtensionId(extId);
    });

    this.onUpdated = new EventBase("tabs.onUpdated", this.port);
    this.onActivated = new EventBase("tabs.onActivated", this.port);
    this.onCreated = new EventBase("tabs.onCreated", this.port);
    this.onRemoved = new EventBase("tabs.onRemoved", this.port);
    this.onReplaced = new EventBase("tabs.onReplaced", this.port);
    this.onAttached = new EventBase("tabs.onAttached", this.port);
    this.onDetached = new EventBase("tabs.onDetached", this.port);
    this.onMoved = new EventBase("tabs.onMoved", this.port);
    this.onHighlighted = new EventBase("tabs.onHighlighted", this.port);
  }

  public query(info: chrome.tabs.QueryInfo): Promise<VivaldiTab[]> {
    return new Promise((resolve) => {
      chrome.runtime
        .sendMessage(this.extId, {
          method: "query",
          input: [info],
          type: "chrome.tabs",
        })
        .then(resolve);
    });
  }

  public getThisTab(): Promise<VivaldiTab> {
    return chrome.runtime.sendMessage(this.extId, {
      method: "getSenderTab",
      type: "custom",
    });
  }

  public update(tabId: number, props: chrome.tabs.UpdateProperties) {
    return chrome.runtime.sendMessage(this.extId, {
      method: "update",
      input: [tabId, props],
      type: "chrome.tabs",
    });
  }

  public remove(tabId: number) {
    return chrome.runtime.sendMessage(this.extId, {
      method: "remove",
      input: [tabId],
      type: "chrome.tabs",
    });
  }

  public create(props: chrome.tabs.CreateProperties) {
    return chrome.runtime.sendMessage(this.extId, {
      method: "create",
      input: [props],
      type: "chrome.tabs",
    });
  }

  public checkIncognito() {
    return chrome.runtime.sendMessage(this.extId, {
      method: "checkIncognito",
      type: "custom",
    });
  }

  public changeExtensionId(extId: string) {
    this.extId = extId;
    this.port = chrome.runtime.connect(extId);
    this.port.onDisconnect.addListener(() => {
      this.changeExtensionId(extId);
    });
  }
}

export const ApiContext = React.createContext<TabsApi>(null);
export const useApi = () => React.useContext(ApiContext);
