import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-bold-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-bold-webfont.woff') format('woff');
            font-weight: 700;
            font-style: normal;
        }
      
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-bolditalic-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-bolditalic-webfont.woff') format('woff');
            font-weight: 700;
            font-style: italic;
        }

        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-semibold-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-semibold-webfont.woff') format('woff');
            font-weight: 600;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-semibolditalic-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-semibolditalic-webfont.woff') format('woff');
            font-weight: 600;
            font-style: italic;
        }

        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-medium-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-medium-webfont.woff') format('woff');
            font-weight: 500;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-mediumitalic-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-mediumitalic-webfont.woff') format('woff');
            font-weight: 500;
            font-style: italic;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-italic-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-italic-webfont.woff') format('woff');
            font-weight: 400;
            font-style: italic;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-regular-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-regular-webfont.woff') format('woff');
            font-weight: 400;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-light-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-light-webfont.woff') format('woff');
            font-weight: 300;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'chakra_petch';
            src: url('./fonts/chakrapetch-lightitalic-webfont.woff2') format('woff2'),
                url('./fonts/chakrapetch-lightitalic-webfont.woff') format('woff');
            font-weight: 300;
            font-style: italic;
        }
      `}
  />
);

export default Fonts;
