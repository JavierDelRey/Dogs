interface MierdonProps{
    name:string;

}

export const Mierdon = (props) => {
const {name} = props;
return (
<div className="card">
            <img src="https://i.pinimg.com/474x/cf/4d/33/cf4d33b26f89b54dbf1d9850fb236e4c.jpg" alt="Perro" />
            <div className="flex dog-count">
              <span>0❤️</span>
              <span>99🤢</span>
            </div>
            
</div>
          );
};