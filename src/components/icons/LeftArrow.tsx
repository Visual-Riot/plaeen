import React from "react";

const LeftArrow = ({ className }: { className: string }) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="14.641"
  //   height="14.645"
  //   viewBox="0 0 14.641 14.645"
  //   className={className}
  // >
  //   <path
  //     id="Undo"
  //     d="M9.225,2A7.44,7.44,0,0,0,5.052,3.282L3.981,2.215a.732.732,0,0,0-1.25.517v3.66a.732.732,0,0,0,.732.732h3.66a.732.732,0,0,0,.518-1.25L7.187,5.42a4.484,4.484,0,0,1,6.525,3.9,4.5,4.5,0,0,1-8.832,1.1,1.464,1.464,0,1,0-2.833.739A7.426,7.426,0,0,0,16.64,9.32,7.377,7.377,0,0,0,9.225,2Z"
  //     transform="translate(-2 -2)"
  //   />
  // </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="19.43"
    viewBox="0 0 12 19.43"
    className={className}
  >
    <g id="Arrow-23" transform="translate(129.654 51.43) rotate(180)">
      <path
        id="Path_15"
        data-name="Path 15"
        d="M120.961,42.419a1.735,1.735,0,0,0,0-1.412l-3.084-6.923a1.34,1.34,0,0,1,1.982-1.776c1.992,1.547,7.039,6.2,9.324,8.327a1.472,1.472,0,0,1,0,2.156c-2.285,2.125-7.332,6.78-9.324,8.327a1.341,1.341,0,0,1-1.982-1.776Z"
        transform="translate(0)"
      />
    </g>
  </svg>
);

export default LeftArrow;
