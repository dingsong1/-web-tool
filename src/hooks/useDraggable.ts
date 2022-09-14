import { nanoid } from 'nanoid'

const map: Map<any, Events> = new Map()
export declare interface UseDraggableEventData {
  target: HTMLElement | null
  container: HTMLElement | null
  pageX: number
  pageY: number
}
declare interface Events {
  [handleMoveToContainer: string]: (data: UseDraggableEventData) => void
}

enum EventName {
  handleMoveToContainer = 'handleMoveToContainer'
}
export default function () {
  let dragged: HTMLElement | null = null
  let pageX = 0
  let pageY = 0
  const dragstartEvent = function (event: DragEvent) {
    if (event.target instanceof HTMLElement) {
      dragged = event.target
      // 使其半透明
      event.target.setAttribute('opacity', '0.5')
    }
  }
  const dragendEvent = function (event: DragEvent) {
    // 重置透明度
    if (event.target instanceof HTMLElement) {
      // 使其半透明
      event.target.setAttribute('opacity', '0.5')
      event.target.setAttribute('background', '0.5')
    }
  }
  const dragoverEvent = function (event: DragEvent) {
    // 阻止默认动作

    event.preventDefault()
  }
  const dragenterEvent = function (event: DragEvent) {
    // 当可拖动的元素进入可放置的目标高亮目标节点
    if (event.target instanceof HTMLElement) {
      if (event.target.className === 'canvas-content') {
        event.target.style.background = '#f5f5f5'
      }
    }
  }
  const dragleaveEvent = function (event: DragEvent) {
    // 当拖动元素离开可放置目标节点，重置其背景
    if (
      event.target instanceof HTMLElement &&
      event.target.className == 'canvas-content'
    ) {
      event.target.style.background = ''
    }
  }
  const dropEvent = function (event: DragEvent) {
    // 阻止默认动作（如打开一些元素的链接）
    event.preventDefault()
    // 移动拖动的元素到所选择的放置目标节点
    if (
      event.target instanceof HTMLElement &&
      event.target.className == 'canvas-content'
    ) {
      console.log(event)
      pageX = event.offsetX
      pageY = event.offsetY
      event.target.style.background = ''
      mapEventsCallback(EventName.handleMoveToContainer, event.target)
      // dragged.parentNode.removeChild( dragged );
      // event.target.appendChild( dragged );
    }
  }
  const mapEventsCallback = function (
    eventName: EventName,
    container: HTMLElement
  ) {
    map.forEach((value, key) => {
      const events: Events | undefined = map.get(key)
      if (events) {
        const data: UseDraggableEventData = {
          target: dragged,
          container,
          pageX,
          pageY
        }
        events[eventName](data)
      }
    })
  }
  const mountedDraggableEvents = function () {
    document.addEventListener('dragstart', dragstartEvent, false)
    document.addEventListener('dragend', dragendEvent, false)
    document.addEventListener('dragover', dragoverEvent, false)
    document.addEventListener('dragenter', dragenterEvent, false)

    document.addEventListener('dragleave', dragleaveEvent, false)
    document.addEventListener('drop', dropEvent, false)
  }
  // 销毁
  const destroyDraggableEvents = function () {
    map.forEach((value, key) => {
      map.delete(key)
    })
    document.removeEventListener('dragstart', dragstartEvent, false)
    document.removeEventListener('dragend', dragendEvent, false)
    document.removeEventListener('dragover', dragoverEvent, false)
    document.removeEventListener('dragenter', dragenterEvent, false)

    document.removeEventListener('dragleave', dragleaveEvent, false)
    document.removeEventListener('drop', dropEvent, false)
  }
  const registerEvents = function (events: Events, key: string): void {
    key = key || nanoid()
    if (!map.has(key)) {
      map.set(key, events)
    }
  }

  return { mountedDraggableEvents, destroyDraggableEvents, registerEvents }
}
