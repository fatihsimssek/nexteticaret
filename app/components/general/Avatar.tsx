import { RxAvatar } from "react-icons/rx"

interface AvatarProps{
    image?: string,
    
}

const Avatar:React.FC<AvatarProps>= ({image}) => {
    if (image) {
      return<img className="h-[50px] w-[50px] border rounded-full" src={image} alt=""></img>
    }
    return <div><RxAvatar size='25'/></div>
}

export default Avatar