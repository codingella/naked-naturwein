export const scrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID ${elementId} not found.`)
    return
  }
  // Use scrollIntoView to scroll the element into view
  element.scrollIntoView({
    behavior: 'smooth', // Enables smooth scrolling
    block: 'start', // Aligns the top of the element to the top of the viewport
  })
}

export const scrollToTop = (elementId) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID ${elementId} not found.`)
    return
  }
  // Directly control scroll using scrollTop
  element.scrollTop = 0
}
