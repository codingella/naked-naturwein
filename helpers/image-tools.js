import imageUrlBuilder from '@sanity/image-url'
import { client } from '../sanity/lib/sanity.client'

//const client = getClient()
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  let url = builder.image(source)
  return url
}

export const getVideoRatio = (asset) => {
  if (asset.data) {
    const [w, h] = asset.data?.aspect_ratio.split(':')
    return parseInt(w) / parseInt(h)
  }
}

export function getDimensions(image) {
  if (image.asset) {
    const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
    const [, assetId, dimensions, format] = pattern.exec(image?.asset?._ref)
    const [imgWidth, imgHeight] = dimensions
      .split('x')
      .map((v) => parseInt(v, 10))

    if (image?.crop) {
      const { left, right, top, bottom } = image.crop

      // Calculate the cropped dimensions
      const croppedWidth = Math.floor(imgWidth * (1 - left - right))
      const croppedHeight = Math.floor(imgHeight * (1 - top - bottom))

      return {
        imgWidth: croppedWidth,
        imgHeight: croppedHeight,
        orientation: croppedWidth <= croppedHeight ? 'portrait' : 'landscape',
        ratio: croppedWidth / croppedHeight,
      }
    } else {
      // No crop applied
      return {
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        orientation: imgWidth <= imgHeight ? 'portrait' : 'landscape',
        ratio: imgWidth / imgHeight,
      }
    }
  }
}

export const sanityLoader = ({ src, width, quality }) =>
  urlFor(src) // src = Sanity asset ref string
    .width(width) // <-- Next passes the needed width here
    .quality(quality ?? 80)
    .auto('format') // webp/avif where available
    .fit('max')
    .url()

export function getRatio(image) {
  if (image?.asset) {
    const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
    const [, assetId, dimensions, format] = pattern.exec(image?.asset?._ref)
    const [imgWidth, imgHeight] = dimensions
      .split('x')
      .map((v) => parseInt(v, 10))

    let ratio = imgWidth / imgHeight

    if (image?.crop) {
      const { left, right, top, bottom } = image.crop

      // Calculate the cropped dimensions
      const croppedWidth = Math.floor(imgWidth * (1 - left - right))
      const croppedHeight = Math.floor(imgHeight * (1 - top - bottom))

      ratio = croppedWidth / croppedHeight
    }
    return ratio
  }
}

export function objectPositionFromHotspot({
  hotspot,
  iRatio,
  cWidth,
  cHeight,
}) {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

  // normalize container to height = 1 (only the ratio matters)
  const cw = cWidth / cHeight
  const ch = 1

  // normalized image before scale: W=iRatio, H=1
  const W = iRatio
  const H = 1

  // cover scale
  const s = Math.max(cw / W, ch / H)
  const scaledW = W * s
  const scaledH = H * s

  const x = hotspot?.x ?? 0.5
  const y = hotspot?.y ?? 0.5
  const hw = Math.min(Math.max(hotspot?.width ?? 0, 0), 1)
  const hh = Math.min(Math.max(hotspot?.height ?? 0, 0), 1)

  // hotspot center in scaled coords
  const cx = x * scaledW
  const cy = y * scaledH

  // hotspot box in scaled coords
  const leftHS = (x - hw / 2) * scaledW
  const rightHS = (x + hw / 2) * scaledW
  const topHS = (y - hh / 2) * scaledH
  const bottomHS = (y + hh / 2) * scaledH

  // desired viewport offsets to center hotspot
  const leftIdeal = cx - cw / 2
  const topIdeal = cy - ch / 2

  // allowable left/top so the whole hotspot fits (if possible)
  const leftMin = Math.max(0, rightHS - cw)
  const leftMax = Math.min(Math.max(0, scaledW - cw), leftHS)
  const topMin = Math.max(0, bottomHS - ch)
  const topMax = Math.min(Math.max(0, scaledH - ch), topHS)

  // choose left/top
  let left, top
  if (scaledW > cw) {
    // if hotspot narrower than viewport, clamp to keep it fully visible
    if (leftMin <= leftMax) left = clamp(leftIdeal, leftMin, leftMax)
    else left = clamp(leftIdeal, 0, Math.max(0, scaledW - cw))
  } else {
    left = 0 // no horizontal overflow
  }

  if (scaledH > ch) {
    if (topMin <= topMax) top = clamp(topIdeal, topMin, topMax)
    else top = clamp(topIdeal, 0, Math.max(0, scaledH - ch))
  } else {
    top = 0 // no vertical overflow
  }

  // convert to object-position percentages:
  // object-position uses a fraction along the overflow: 0 = align start, 0.5 = center, 1 = end
  const ox = scaledW > cw ? left / (scaledW - cw) : 0.5
  const oy = scaledH > ch ? top / (scaledH - ch) : 0.5

  return `${(ox * 100).toFixed(3)}% ${(oy * 100).toFixed(3)}%`
}
