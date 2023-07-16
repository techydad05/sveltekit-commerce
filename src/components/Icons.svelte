<script>
  export let strokeColor = '#000';
  export let type;
  export let width = '24px;';
  export let height = '24px;';
</script>

<div>
  {#if type === 'star'}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M12.43 8L10 0L7.57 8H0L6.18 12.41L3.83 20L10 15.31L16.18 20L13.83 12.41L20 8H12.43Z"
      /></svg
    >
  {:else if type === 'cart'}
    <svg width="24" height="26" viewBox="0 0 20 22" fill="none" class="stroke-primary cart-btn"
      ><path
        class="cart-btn"
        d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path d="M1 5H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path
        class="cart-btn"
        d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  {:else if type === 'close'}
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke={strokeColor}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      shape-rendering="geometricPrecision"
      class="hover:text-accent-3 h-6 w-6"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg
    >
  {:else if type === 'minus'}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      ><path
        d="M5 12H19"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  {:else if type === 'plus'}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      ><path
        d="M12 5V19"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M5 12H19"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  {:else if type === 'menu'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-primary h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16m-7 6h7"
      /></svg
    >
  {:else if type === 'search'}
    <svg style={`width:${width};height:${height}`} viewBox="0 0 24 24">
      <path
        class="fill-primary"
        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
      />
    </svg>
  {:else if type === 'arrowLeft'}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor}
      ><path d="M19 12H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path
        d="M12 19L5 12L12 5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  {:else if type === 'arrowRight'}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
      ><path d="M5 12H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path
        d="M12 5L19 12L12 19"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  {:else if type === 'caretRight'}
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke={strokeColor}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      shape-rendering="geometricPrecision"
      class="Collapse_icon__JsuEg"><path d="M9 18l6-6-6-6" /></svg
    >
  {:else if type === 'shopping-cart'}
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="60pt"
      height="50pt"
      viewBox="0 0 682.000000 462.000000"
      preserveAspectRatio="xMidYMid meet"
      class="fill-primary"
    >
      <g
        transform="translate(0.000000,462.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path d="M195 4592 c-78 -38 -131 -92 -166 -169 -38 -81 -38 -134 0 -216 43
-96 82 -128 255 -211 199 -97 319 -178 437 -295 108 -108 173 -200 246 -346
89 -177 151 -363 328 -990 53 -187 132 -453 175 -591 44 -139 80 -257 80 -263
0 -6 -18 -37 -39 -69 -195 -285 -203 -591 -21 -820 82 -105 249 -203 411 -242
134 -32 129 -35 129 63 1 137 28 214 130 359 28 39 50 82 50 94 0 32 -33 50
-105 59 -76 9 -116 26 -143 60 -30 38 -29 92 4 141 30 44 43 56 99 87 l40 22
1605 6 c1463 5 1611 7 1673 22 392 97 671 315 844 657 47 93 593 1726 593
1774 0 73 -80 171 -159 194 -29 9 -703 12 -2674 12 l-2635 0 -49 58 c-58 68
-181 192 -245 245 -97 80 -299 207 -424 266 -185 88 -251 112 -319 117 -51 4
-69 0 -120 -24z m2113 -1479 l-3 -388 -239 0 -239 0 -48 169 c-54 188 -114
375 -165 509 -19 49 -34 91 -34 93 0 2 164 4 365 4 l365 0 -2 -387z m990 0
l-3 -388 -365 0 -365 0 -3 388 -2 387 370 0 370 0 -2 -387z m992 -3 l0 -390
-367 2 -368 3 -3 375 c-1 206 0 381 3 387 3 10 86 13 370 13 l365 0 0 -390z
m990 0 l0 -390 -365 0 -365 0 0 390 0 390 365 0 365 0 0 -390z m1020 384 c0
-3 -57 -179 -126 -390 l-125 -384 -255 0 -254 0 0 390 0 390 380 0 c209 0 380
-3 380 -6z m-3992 -1411 l-3 -388 -77 -3 c-92 -3 -81 -18 -158 203 -46 135
-170 546 -170 567 0 4 92 8 205 8 l205 0 -2 -387z m990 0 l-3 -388 -365 0
-365 0 -3 388 -2 387 370 0 370 0 -2 -387z m992 -3 l0 -390 -367 2 -368 3 -3
375 c-1 206 0 381 3 387 3 10 86 13 370 13 l365 0 0 -390z m990 11 c0 -293 -3
-382 -12 -388 -7 -4 -172 -9 -365 -11 l-353 -4 0 391 0 391 365 0 365 0 0
-379z m680 371 c0 -4 -20 -67 -44 -139 -55 -165 -102 -254 -177 -339 -61 -69
-176 -174 -191 -174 -4 0 -8 149 -8 330 l0 330 210 0 c116 0 210 -4 210 -8z"
        />
        <path
          d="M3069 929 c-25 -25 -20 -43 30 -119 79 -118 121 -252 121 -387 l0
-73 630 0 630 0 0 78 c0 132 49 288 124 392 47 65 51 85 27 109 -21 21 -28 21
-781 21 -753 0 -760 0 -781 -21z"
        />
        <path
          d="M5498 940 c-31 -19 -20 -58 37 -137 30 -41 66 -98 80 -126 34 -71 58
-188 53 -266 l-4 -63 95 4 c108 5 155 23 216 83 149 150 104 398 -90 487 -44
20 -68 23 -210 26 -101 1 -167 -2 -177 -8z"
        />
        <path
          d="M2571 839 c-127 -25 -250 -121 -304 -238 -52 -110 -49 -254 6 -365
59 -121 239 -235 368 -236 56 0 161 31 221 65 55 31 121 96 152 149 68 118 75
267 20 386 -58 123 -176 214 -313 240 -61 11 -88 11 -150 -1z"
        />
        <path
          d="M4951 835 c-261 -57 -403 -354 -283 -594 32 -63 116 -153 170 -180
118 -60 203 -73 300 -45 165 48 278 157 318 309 62 231 -100 476 -341 515 -74
12 -84 12 -164 -5z"
        />
      </g>
    </svg>
  {/if}
</div>
