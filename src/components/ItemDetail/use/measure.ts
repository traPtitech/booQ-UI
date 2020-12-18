const useMeasure = (): {
  measureText: (
    text: string,
    fontSize?: number
  ) => { width: number; height: number }
  measureGrid: (
    eleLength: number,
    eachSize: { width: number; height: number },
    maxCol: number,
    gap: number
  ) => { width: number; height: number }
} => {
  const measureText = (text: string, fontSize?: number) => {
    const dom = document.createElement('span')
    dom.innerText = text
    if (fontSize) {
      dom.style.fontSize = `${fontSize}px`
    }
    document.body.appendChild(dom)
    const rect = dom.getClientRects().item(0)
    dom.remove()
    if (!rect) return { width: 0, height: 0 }
    return { width: rect.width, height: rect.height }
  }
  const measureGrid = (
    eleLength: number,
    eachSize: { width: number; height: number },
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
