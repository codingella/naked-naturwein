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

export function preloadThumbnails(thumbnails, size) {
  thumbnails?.map((thumb, i) => {
    if (thumb.asset !== undefined) {
      const img = new Image()
      img.src = `${urlFor(thumb.asset).width(size).format('webp')}`
    }
  })
}

//client side function to use sanity hotspot crop features, to be used as css object-position value 
//The x and y amount to shift the image to apply hotspot and crop
//cWidth is containerWidth, iRatio is imageRatio
/*
export function calcImagePosition({ hotspot, cWidth, cHeight, iRatio }) {
  if (!hotspot || !cWidth || !cHeight) return

  let positionX = 0.5
  let positionY = 0.5
  let cRatio = cWidth / cHeight
  const { x, y, width, height } = hotspot

  //verticalCrop
  if (cRatio > iRatio) {
    let iHeight = cWidth / iRatio
    //percentage of image height cropped
    let cropAmount = (iHeight - cHeight) / iHeight / 2
    let hotspotTop = y - height / 2
    let hotspotBottom = y + height / 2

    //image is cut on both ends, the image hotspot attempts to be centered
    if (height > 1 - cropAmount * 2) {
      //positionY = (0.5 * cHeight - y * iHeight) / (cHeight - iHeight)
      positionY = (0.5 * cHeight - y * iHeight) / (cHeight - iHeight)
    }
    //image must move down
    else if (hotspotTop < cropAmount) {
      //formular for object position: object-position-y = 50% + (desiredMovement / (iHeight - cHeight)) * iWidth
      positionY =
        0.5 - ((cropAmount - hotspotTop) / (iHeight - cHeight)) * iHeight
    }
    //image must move up
    else if (hotspotBottom > 1 - cropAmount) {
      positionY =
        0.5 +
        ((hotspotBottom - (1 - cropAmount)) / (iHeight - cHeight)) * iHeight
    }
  }

  //horizontalCrop
  if (cRatio < iRatio) {
    let iWidth = cHeight * iRatio
    //percentage of image height cropped
    let cropAmount = (iWidth - cWidth) / iWidth / 2
    let hotspotLeft = x - width / 2
    let hotspotRight = x + width / 2

    //image is cut on both ends, the image hotspot attempts to be centered
    if (width > 1 - cropAmount * 2) {
      positionX = (0.5 * cWidth - x * iWidth) / (cWidth - iWidth)
    }
    //image must move right
    else if (hotspotLeft < cropAmount) {
      positionX =
        0.5 - ((cropAmount - hotspotLeft) / (iWidth - cWidth)) * iWidth
    }
    //image must move left
    else if (hotspotRight > 1 - cropAmount) {
      positionX =
        0.5 + ((hotspotRight - (1 - cropAmount)) / (iWidth - cWidth)) * iWidth
    }
  }
  return `${positionX * 100}% ${positionY * 100}%`
}
*/