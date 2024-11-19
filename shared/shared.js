// 定义全局事件触发器
export function triggerEvent(eventName) {
  const event = new Event(eventName);
  document.dispatchEvent(event);
}