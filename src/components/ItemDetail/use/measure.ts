export interface Size {
  width: number
  height: number
}

const useMeasure = (): {
  measureText: (text: string, fontSize?: number) => Size
  measureGrid: (
    eleLength: number,
    eachSize: Size,
    maxCol: number,
    gap: number
  ) => Size
} => {
  const measureText = (text: string, fontSize?: number) => {
    const dom = document.createElement('span')
    dom.innerText = text
    if (fontSize) {
      dom.style.fontSize = `${fontSize}px`
    }
    document.body.appendChild(dom)
    const rect = dom.getClientRects()[0]
    dom.remove()
    if (!rect) return { width: 0, height: 0 }
    return { width: rect.width, height: rect.height }
  }
  const measureGrid = (
    eleLength: number,
    eachSize: Size,
    maxCol: number,
    gap: number
  ) => {
    const row = Math.floor(eleLength / maxCol)
    const remain = eleLength - row * maxCol
    return {
      width: getEdgeLength(row === 0 ? remain : maxCol, eachSize.width, gap),
      height: getEdgeLength(row + +!!remain, eachSize.height, gap)
    }
  }
  const getEdgeLength = (length: number, size: number, gap: number) => {
    return size * length + gap * (length - 1)
  }
  return { measureText, measureGrid }
}

export default useMeasure