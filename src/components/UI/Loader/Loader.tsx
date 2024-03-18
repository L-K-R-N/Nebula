import './Loader.styles.scss';

interface Props {}

export const Loader: React.FC<Props> = () => {
   return (
      <div>
         <div className="s1">
            <div className="s b sb1"></div>
            <div className="s b sb2"></div>
            <div className="s b sb3"></div>
            <div className="s b sb4"></div>
         </div>

         <div className="s2">
            <div className="s b sb5"></div>
            <div className="s b sb6"></div>
            <div className="s b sb7"></div>
            <div className="s b sb8"></div>
         </div>

         <div className="bigcon">
            <div className="big b"></div>
         </div>
      </div>
   );
};
