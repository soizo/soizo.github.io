const svgTemplate = (color, scale, rotate) =>
  `
  <data:image/svg+xml,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" transform="scale(${scale})" viewBox="-4 -2 24 24">
  <g transform="rotate(${rotate})">
  <path fill="${color}}" d="m12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"/>
  </g>
  </svg>
  
`;

let 箭頭點擊歬 = "#ff0000";

let encodedSvg = encodeURIComponent(svgTemplate(color, 0.9, ));

let svgDataUri = `url('data:image/svg+xml;utf8,${encodedSvg}')`;

document.documentElement.style.setProperty("--my-svg-url", svgDataUri);
