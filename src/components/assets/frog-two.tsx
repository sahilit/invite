'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const FrogTwo = () => {
  return (
    <motion.svg
      viewBox="0 0 480 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%'
      }}
      className="filter drop-shadow-2xl"
    >
      <g filter="url(#filter0_bdi_87_2790)">
        <path
          d="M492.912 127.861C490.349 72.6166 444.305 29.7933 390.169 32.3054C359.65 33.7216 333.063 49.2607 316.11 72.3415C291.328 67.9179 265.022 65.9802 237.955 67.2363C210.887 68.4923 184.865 72.6723 160.607 79.5573C141.409 58.154 113.497 45.1438 83.1593 46.5516C29.0239 49.0636 -12.8567 95.9668 -10.2932 151.212C-9.45012 169.379 -3.94406 186.03 4.91035 200.296C-2.10972 217.714 -5.44492 236.076 -4.56748 254.985C-0.051191 352.312 115.872 425.892 254.299 419.468C392.726 413.045 501.338 329.046 496.821 231.719C495.944 212.81 490.922 194.836 482.32 178.143C489.815 163.118 493.755 146.029 492.912 127.861Z"
          fill="url(#paint0_linear_87_2790)"
          shape-rendering="crispEdges"
        />
        <path
          d="M315.855 73.7744L316.747 73.9336L317.284 73.2031C333.992 50.4543 360.183 35.1539 390.237 33.7594C443.541 31.2859 488.931 73.4591 491.458 127.929C492.289 145.84 488.405 162.683 481.017 177.493L480.688 178.154L481.026 178.81C489.538 195.326 494.5 213.097 495.367 231.787C497.597 279.848 471.905 324.764 428.273 358.531C384.645 392.296 323.183 414.815 254.232 418.014C185.281 421.214 121.997 404.483 75.4298 374.904C28.8586 345.323 -0.883301 302.979 -3.1135 254.918C-3.98077 236.228 -0.685453 218.074 6.26037 200.84L6.53627 200.156L6.14705 199.529C-2.58095 185.466 -8.00804 169.055 -8.83918 151.144C-11.3667 96.6744 29.922 50.4791 83.2268 48.0056C113.096 46.6196 140.595 59.4267 159.524 80.5292L160.131 81.2056L161.005 80.9575C185.149 74.1048 211.06 69.9414 238.022 68.6903C264.977 67.4394 291.175 69.3691 315.855 73.7744Z"
          stroke="url(#paint1_linear_87_2790)"
          stroke-width="2.91109"
          shape-rendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_87_2790)">
        <path
          d="M82.4417 202.725C115.55 201.189 141.119 172.554 139.552 138.766C137.984 104.979 109.873 78.8347 76.7641 80.371C43.6554 81.9074 18.0864 110.543 19.6542 144.33C21.2221 178.117 49.333 204.262 82.4417 202.725Z"
          fill="url(#paint2_linear_87_2790)"
        />
        <path
          d="M138.461 138.817C140.002 172.023 114.877 200.127 82.3911 201.635C49.9054 203.142 22.2856 177.485 20.7447 144.279C19.2039 111.073 44.329 82.969 76.8147 81.4615C109.3 79.9541 136.92 105.611 138.461 138.817Z"
          stroke="url(#paint3_linear_87_2790)"
          stroke-width="2.18332"
        />
      </g>
      <motion.path
        transition={{
          duration: 0.15
        }}
        initial={{
          translateY: '-0.75rem',
          scale: 0.75
        }}
        exit={{
          scale: 0.75
        }}
        animate={{
          translateY: 0,
          scale: 1
        }}
        d="M82.1764 188.468C107.462 187.295 126.99 165.426 125.792 139.623C124.595 113.819 103.126 93.8528 77.8404 95.0261C52.5547 96.1995 33.0273 118.068 34.2246 143.872C35.422 169.675 56.8907 189.641 82.1764 188.468Z"
        fill="black"
      />
      <g filter="url(#filter2_d_87_2790)">
        <path
          d="M402.38 187.864C435.488 186.328 461.057 157.692 459.49 123.905C457.922 90.1181 429.811 63.9736 396.702 65.5099C363.593 67.0463 338.024 95.6817 339.592 129.469C341.16 163.256 369.271 189.401 402.38 187.864Z"
          fill="url(#paint4_linear_87_2790)"
        />
        <path
          d="M458.399 123.956C459.94 157.162 434.815 185.266 402.329 186.774C369.843 188.281 342.224 162.624 340.683 129.418C339.142 96.2124 364.267 68.1079 396.753 66.6004C429.238 65.093 456.858 90.75 458.399 123.956Z"
          stroke="url(#paint5_linear_87_2790)"
          stroke-width="2.18332"
        />
      </g>
      <motion.path
        transition={{
          duration: 0.15
        }}
        initial={{
          translateY: '-0.75rem',
          scale: 0.75
        }}
        exit={{
          scale: 0.75
        }}
        animate={{
          translateY: 0,
          scale: 1
        }}
        d="M401.718 172.886C426.614 171.73 445.84 150.199 444.661 124.794C443.482 99.3894 422.345 79.7312 397.449 80.8864C372.553 82.0416 353.327 103.573 354.506 128.978C355.685 154.383 376.822 174.041 401.718 172.886Z"
        fill="black"
      />
      <g filter="url(#filter3_f_87_2790)">
        <path
          d="M39.2645 57.7185C42.0724 55.4091 42.4224 56.6092 45.9878 53.502C47.9716 55.914 39.7185 60.586 45.277 62.8C42.4691 65.1094 37.8033 64.2771 35.8194 61.8651C33.8356 59.4531 36.4566 60.028 39.2645 57.7185Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter4_f_87_2790)">
        <path
          d="M39.2645 57.7185C42.0724 55.4091 42.4224 56.6092 45.9878 53.502C47.9716 55.914 39.7185 60.586 45.277 62.8C42.4691 65.1094 37.8033 64.2771 35.8194 61.8651C33.8356 59.4531 36.4566 60.028 39.2645 57.7185Z"
          fill="white"
        />
      </g>
      <path
        d="M26.9811 49.7169C26.1777 48.0939 24.2069 47.4234 22.618 48.2926C11.7603 54.2322 2.413 62.6157 -4.67478 72.7975C-11.7626 82.9793 -16.3794 94.6558 -18.18 106.9C-18.4435 108.692 -17.1306 110.307 -15.3295 110.497C-13.5285 110.687 -11.922 109.38 -11.652 107.589C-9.97142 96.4439 -5.74833 85.8188 0.707766 76.5444C7.16387 67.27 15.6619 59.6208 25.5303 54.1755C27.1159 53.3006 27.7845 51.34 26.9811 49.7169Z"
        fill="#1E7C40"
      />
      <path
        d="M490.823 76.3764C492.525 75.7569 493.409 73.8721 492.72 72.1971C488.014 60.7506 480.713 50.5357 471.375 42.3682C462.037 34.2008 450.941 28.3244 438.969 25.1844C437.218 24.7249 435.467 25.8517 435.08 27.6208C434.692 29.3899 435.815 31.1308 437.565 31.5966C448.457 34.4961 458.551 39.8652 467.057 47.3047C475.563 54.7443 482.228 64.0341 486.552 74.4427C487.247 76.1152 489.122 76.9959 490.823 76.3764Z"
        fill="#1E7C40"
      />
      <defs>
        <filter
          id="filter0_bdi_87_2790"
          x="-56.2544"
          y="-13.6493"
          width="599.061"
          height="479.358"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="22.9248" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_87_2790"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.09441" />
          <feGaussianBlur stdDeviation="10.1888" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_backgroundBlur_87_2790"
            result="effect2_dropShadow_87_2790"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_87_2790"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="10.1888" />
          <feGaussianBlur stdDeviation="16.3749" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_87_2790"
          />
        </filter>
        <filter
          id="filter1_d_87_2790"
          x="-18.986"
          y="47.5569"
          width="197.178"
          height="199.627"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.82218" />
          <feGaussianBlur stdDeviation="19.286" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_87_2790"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_87_2790"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_87_2790"
          x="300.952"
          y="32.6958"
          width="197.178"
          height="199.627"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.82218" />
          <feGaussianBlur stdDeviation="19.286" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_87_2790"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_87_2790"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_f_87_2790"
          x="19.72"
          y="38.0965"
          width="41.9882"
          height="41.4728"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="7.70275"
            result="effect1_foregroundBlur_87_2790"
          />
        </filter>
        <filter
          id="filter4_f_87_2790"
          x="19.72"
          y="38.0965"
          width="41.9882"
          height="41.4728"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="7.70275"
            result="effect1_foregroundBlur_87_2790"
          />
        </filter>
        <linearGradient
          id="paint0_linear_87_2790"
          x1="246.51"
          y1="15.7546"
          x2="254.299"
          y2="419.468"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#32DA6D" />
          <stop offset="1" stop-color="#209F4D" stop-opacity="0.81" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_87_2790"
          x1="236.664"
          y1="39.4285"
          x2="254.299"
          y2="419.468"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#9B9B9B" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_87_2790"
          x1="76.7641"
          y1="80.371"
          x2="82.4417"
          y2="202.725"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#C4C4C4" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_87_2790"
          x1="76.7641"
          y1="80.371"
          x2="82.4417"
          y2="202.725"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_87_2790"
          x1="396.702"
          y1="65.5099"
          x2="402.38"
          y2="187.864"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#C4C4C4" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_87_2790"
          x1="396.702"
          y1="65.5099"
          x2="402.38"
          y2="187.864"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
