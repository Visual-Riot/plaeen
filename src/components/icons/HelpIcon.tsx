import React from "react";

interface HelpIconProps {
  className?: string;
  width?: string;
  height?: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({
  className,
  width = "19.426",
  height = "19.426",
}) => (
  <svg
    id="BTN_Help"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19.426 19.426"
    className={className}
  >
    <g id="Group_302" data-name="Group 302">
      <g id="Group_301" data-name="Group 301">
        <path
          id="Path_205"
          data-name="Path 205"
          d="M9.713,0a9.713,9.713,0,1,0,9.713,9.713A9.707,9.707,0,0,0,9.713,0Zm0,18.07A8.358,8.358,0,1,1,18.07,9.713,8.367,8.367,0,0,1,9.713,18.07Z"
          fill="#c292ff"
        />
      </g>
    </g>
    <g id="Group_304" data-name="Group 304" transform="translate(8.454 12.29)">
      <g id="Group_303" data-name="Group 303">
        <path
          id="Path_206"
          data-name="Path 206"
          d="M223.787,323.924a.985.985,0,0,0,0,1.969.984.984,0,0,0,0-1.969Z"
          transform="translate(-222.815 -323.924)"
          fill="#c292ff"
        />
      </g>
    </g>
    <g id="Group_306" data-name="Group 306" transform="translate(7.073 4.836)">
      <g id="Group_305" data-name="Group 305">
        <path
          id="Path_207"
          data-name="Path 207"
          d="M188.94,127.469c-1.726,0-2.519,1.023-2.519,1.713a.733.733,0,0,0,.767.729c.69,0,.409-.984,1.713-.984.639,0,1.151.281,1.151.869,0,.69-.716,1.087-1.138,1.445a2.34,2.34,0,0,0-.857,1.943c0,.665.179.857.7.857.626,0,.754-.281.754-.524a1.606,1.606,0,0,1,.716-1.6,3.273,3.273,0,0,0,1.432-2.34C191.663,128.377,190.576,127.469,188.94,127.469Z"
          transform="translate(-186.421 -127.469)"
          fill="#c292ff"
        />
      </g>
    </g>
  </svg>
);

export default HelpIcon;
