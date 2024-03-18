declare module '*.svg' {
   const value: any; // eslint-disable-line
   export = value;
}

declare module '*.module.scss' {
   interface IClassNames {
      [className: string]: string;
   }
   const classNames: IClassNames;
   export = classNames;
}

declare module '*.module.scss' {
   const content: {[className: string]: string};
   export = content;
 }  

 declare module '*.module.scss'

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg' {
   import React from 'react';
   const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
   export default SVG;
}
