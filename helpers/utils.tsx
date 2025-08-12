// src/components/EventPreview.tsx
import React from 'react';


export function breakContentToCharacters(blocks) {
  const result = [];

  for (const block of blocks) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child._type === 'span') {
          const text = child.text;
          const chars = text.split('').map((char) => ({
            char,
            key: crypto.randomUUID(), // unique key for each char
          }));

          result.push({
            type: 'line',
            style: block.style || 'normal',
            chars,
          });
        }
      }
    }
  }

  return result;
}


export const renderGIF = (playbackId) =>
  playbackId && (
    <img
      alt="Video Preview"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      src={`https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=400&time=0`}
    />
  );


  export const toPlainText = (blocks = []) => {
    if (!Array.isArray(blocks)) return blocks;
  
    return blocks
      .map((block) => {
        if (block._type !== "block" || !block.children) {
          return "";
        }
  
        const text = block.children.map((child) => child.text).join("");
  
        // Remove any <br> or <br /> tags (just in case)
        return text.replace(/<br\s*\/?>/gi, "");
      })
      .join("\n\n");
  };

export const plainTextDiv = (blocks = []) => {
  const text = toPlainText(blocks);
  return(
    <div style={{ fontSize: "3px", lineHeight: 1.2 }}>
      {text}
    </div>
  )
};